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
		var uploader = new Slingshot.Upload("uploads");
		Meteor.call('lvd-blogg-images/addImage', imageObj, function(err, imageId){
			if(err){
				console.log('error when adding image to db', err);
				return;
			}

			uploader.send(file, function (err, downloadUrl) {
				images.find(imageId)
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
		console.log(images.find().fetch())
		// //add to images collection
		// 	}
	},
	getPostImages: function(postId){
		return images.find({postId: postId});
	}
};
