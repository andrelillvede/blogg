/*

imageObj = {
	postId:
	filename:
	date:
	originalLink:
}

*/

Images = function(options){
	var images = new Mongo.Collection('lvd-blogg-images/images');
	Meteor.subscribe('lvd-blogg-images/images');

	var addImage = function(postId, imageObj){
		//uploadToS3
		//add to images collection
		//Meteor.call('lvd-blogg-images/addImage', postId, imageObj)
	};

	var getPostImages = function(postId){
		return images.find({postId: postId});
	};

	var getCachedImage = function(postId, imageId, width, height){
		/*
			create hash
			check if in s3 hashlocation
			create if not
			return adress to cached image
		*/
	};

	return {
		addImage: addImage,
		getPostImages: getPostImages,
		getCachedImage: getCachedImage
	};
};
