

Storage = {
	uploadImage: function(file, callback){
		var uploader = new Slingshot.Upload("uploads");
		uploader.send(file, callback);
		return uploader;
	},
	getCacheImage: function(id, width, height, cb){
		Meteor.call('lvd-blogg-storage/getCacheImage', id, width, height, function(err, res){
			return cb(err, res);
		});
	},
	deleteObject: function(filename, cb){
		Meteor.call('lvd-blogg-storage/deleteObject', filename, function(err, res){
			return cb(err, res);
		});
	},

	objectExists: function(filename, cb){
		Meteor.call('lvd-blogg-storage/objectExists', filename, function(err, res){
			return cb(err, res);
		});
	}
};
