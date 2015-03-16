ImageCollection = new Mongo.Collection('lvd-blogg-images/images');

Meteor.publish('lvd-blogg-images/images', function(){
	return ImageCollection.find({});
});

Meteor.methods({
	'lvd-blogg-images/addImage': function(imageObj){
		console.log('addImage:', imageObj)
		// check(imageObj, {
		// 	postId: String,
		// 	filename: String,
		// 	date: Date,
		// 	originalLink: String
		// });

		return ImageCollection.insert(imageObj);
	},
	'lvd-blogg-images/updateImage': function(imageId, imageObj){
		// check(imageObj, {
		// 	postId: String,
		// 	filename: String,
		// 	date: Date,
		// 	originalLink: String,
		// 	progress: Number
		// });
		console.log('updateImage: ', imageObj)
		ImageCollection.update(imageId, {$set: imageObj});
	}
});
