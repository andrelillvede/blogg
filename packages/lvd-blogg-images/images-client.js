/* global Images:true Storage:true*/

var images = new Mongo.Collection('lvd-blogg-images/images');

Meteor.subscribe('lvd-blogg-images/images');

Storage.uploads.find().observe({
	changed: function(newDoc, oldDoc){
		if(newDoc.status === 'done' && newDoc.url !== oldDoc.url){
			Images.addImage({
				name: newDoc.name,
				postId: newDoc.postId,
				url: newDoc.url
			})
			Storage.uploads.remove(newDoc._id)
		}
	}
})

Images = {
	addImage: function(imageObj) {
		
		Meteor.call('lvd-blogg-images/addImage', imageObj, function(err, imageId) {
			if(err) {
				console.log('error when adding image to db', err);
				return;
			}
		})	

	},
	getPostImages: function(postId) {
		return images.find({postId: postId});
	},
	fileExistsInStorage: Storage.objectExists,
	deleteFileFromStorage: Storage.deleteObject,
	getCacheImage: function(imageId, width, height) {
		var imageObj = images.findOne(imageId);

		Meteor.call('lvd-blogg-storage/createCacheImage', imageObj, width, height, function(err, cacheUrl) {
			if(imageObj.cacheUrl !== cacheUrl)
				Meteor.call('lvd-blogg-images/updateImage', imageId, {cacheUrl: cacheUrl});
		});

		return imageObj.cacheUrl;
	}
};
