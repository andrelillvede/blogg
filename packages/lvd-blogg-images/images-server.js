Slingshot.createDirective("uploads", Slingshot.S3Storage, {
  bucket: "lillvede",
  acl: "public-read",
  authorize: function () {
    //Deny uploads if user is not logged in.
    // if (!this.userId) {
    //   var message = "Please login before posting files";
    //   throw new Meteor.Error("Login Required", message);
    // }

    return true;
  },
  key: function (file) {
	return 'barn/' + file.name;
  }
});

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
