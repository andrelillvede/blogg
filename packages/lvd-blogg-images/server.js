ImageCollection = new Mongo.Collection('lvd-blogg-images/images');

Meteor.publish('lvd-blogg-images/images', function(limit){
	return ImageCollection.find({});
});

Meteor.methods({
	'lvd-blogg-images/addImage': function(post){
		// check(post, {
		// 	title: String,
		// 	date: Date,
		// 	images: [String],
		// 	text: String
		// });

		ImageCollection.insert(image);
	}
});
