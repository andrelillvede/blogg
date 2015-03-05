/*

imageObj = {
	postId:
	filename:
	date:
	originalLink:
}

*/

var images = new Mongo.Collection('lvd-blogg-images/images');
Meteor.subscribe('lvd-blogg-images/images');

Images = {
	addImage: function(files, imageObj){
		var uploader = new Slingshot.Upload("uploads");

		uploader.send(files[0], function (error, downloadUrl) {
			if(error)
				console.log(error)

			console.log(downloadUrl)
		});
		// Meteor.call('lvd-blogg-images/addImage', postId, imageObj, function(err, res){
		// 	if(err){
		// 		console.log('error when adding image', err)
		// 		return;
		// 	}

		// 	//uploadToS3(Meteor.call)
		// })

		// //add to images collection
		// 	}
	},
	getPostImages: function(postId){
		return images.find({postId: postId});
	}
};
