/*

imageObj = {
	postId:
	date:
	filename:
	url:
}

*/


var images = new Mongo.Collection('lvd-blogg-images/images');
Meteor.subscribe('lvd-blogg-images/images');

Images = {
	addImage: function(file, imageObj){
		Meteor.call('lvd-blogg-images/addImage', imageObj, function(err, imageId){
			if(err){
				console.log('error when adding image to db', err);
				return;
			}
			var uploader = Storage.uploadImage(file, function (err, downloadUrl) {
				if(err){
					console.log('error sending file to s3', err);
					return;
				}

				Meteor.call('lvd-blogg-images/updateImage', imageId, {url: encodeURI(downloadUrl), progress: 100});
			});

			var statusInterval = Meteor.setInterval(function(){
				if(uploader.status() !== 'done'){
					var progress = uploader.progress() === 'NaN' ? 0 : uploader.progress() * 100;
					Meteor.call('lvd-blogg-images/updateImage', imageId, {progress: progress, url: uploader.url(true)});
				}else{
					Meteor.clearInterval(statusInterval);
				}
			}, 100);

		});
	},
	getPostImages: function(postId){
		return images.find({postId: postId});
	},
	fileExistsInStorage: Storage.objectExists,
	deleteFileFromStorage: Storage.deleteObject,
	getCacheImage: function(imageId, width, height){
		var imageObj = images.findOne(imageId);
		if(!imageObj.cacheUrl){
			console.log(width)
			Meteor.call('lvd-blogg-storage/createCacheImage', imageObj, width, height, function(err, cacheUrl){
				Meteor.call('lvd-blogg-images/updateImage', imageId, {cacheUrl: cacheUrl});
			});
		}

		return imageObj.cacheUrl;
	}
};
