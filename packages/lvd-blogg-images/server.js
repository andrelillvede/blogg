ImageCollection = new Mongo.Collection('lvd-blogg-images/images');

Meteor.publish('lvd-blogg-images/images', function(){
	return ImageCollection.find({});
});

Meteor.methods({
	'lvd-blogg-images/addImage': function(imageObj){
		check(imageObj, {
			postId: String,
			filename: String,
			date: Date,
			originalLink: String
		});

		ImageCollection.insert(image);
	}
});
