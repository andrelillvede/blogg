uploads = new Mongo.Collection(null);

Storage = {
	upload: function(file, imgObj) {
		var uploader = new Slingshot.Upload("postImages", {postId: imgObj.postId});
		var uploadId = uploads.insert(imgObj);

		uploader.send(file, function(err, downloadUrl){
			if(err)
				console.log(err)

			uploads.update(uploadId, {$set: {status: 'done'}})
		});

		Tracker.autorun(function(){
			uploads.update(uploadId, {$set: {progress: uploader.progress(), url: uploader.url(true)}})
		})
		
		return uploadId;
	},
	getCacheImage: function(id, width, height, cb) {
		Meteor.call('lvd-blogg-storage/getCacheImage', id, width, height, function(err, res) {
			return cb(err, res);
		});
	},
	delete: function(filename, cb) {
		Meteor.call('lvd-blogg-storage/deleteObject', filename, function(err, res) {
			return cb(err, res);
		});
	},

	fileExists: function(filename, cb) {
		Meteor.call('lvd-blogg-storage/objectExists', filename, function(err, res) {
			return cb(err, res);
		});
	},
	uploads: uploads
};
