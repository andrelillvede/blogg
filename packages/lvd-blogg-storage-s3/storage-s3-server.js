AWS.config.update({
	accessKeyId: Meteor.settings.AWSAccessKeyId,
	secretAccessKey: Meteor.settings.AWSSecretAccessKey,
	region: Meteor.settings.AWSRegion
});

Slingshot.createDirective("uploads", Slingshot.S3Storage, {
	bucket: Meteor.settings.bucket,
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
		return file.name;
	}
});

var s3 = new AWS.S3()
var lambda = new AWS.Lambda()

Meteor.methods({
	'lvd-blogg-storage/objectExists': function(path){
		var params = {
			Bucket: Meteor.settings.bucket, /* required */
			Key: path /* required */
		};

		try {
			var res = s3.headObjectSync(params);
		} catch (e) {
			console.log('exception when getting headObjectSync', e); // pass exception object to error handler
		}
		console.log(res)
		if(res)
			return true;

		return false;
	},
	'lvd-blogg-storage/deleteObject': function(path){
		var params = {
			Bucket: Meteor.settings.bucket, /* required */
			Key: path /* required */
		};

		try {
			var res = s3.deleteObjectSync(params);
		} catch (e) {
			console.log('exception when deleting object', e); // pass exception object to error handler
		}
		console.log(res)
		if(res)
			return true;

		return false;
	},
	'lvd-blogg-storage/createCacheImage': function(imageObj, width, height){

		var srcBucket = Meteor.settings.bucket;
		var cacheBucket = Meteor.settings.cacheBucket;
		var imageExt = imageObj.name.split('/').pop().split('.')[1];

		var cacheSeed = imageObj.postId + '-' + imageObj.name + '-' + width + 'x' + height; 
		var cacheKey = Random.createWithSeeds(EJSON.stringify(cacheSeed, {canonical: true})).id();
		var cacheName = cacheKey + '.' + imageExt;

		s3.headObject({Bucket: Meteor.settings.cacheBucket, Key: cacheName}, function(err, data){

			if (err && err.code === 'NotFound') {
				var params = {
					FunctionName: 'bcktResize', /* required */
					InvokeArgs: JSON.stringify({
						options: {
							srcBucket: srcBucket,
							cacheBucket: cacheBucket,
							srcKey: imageObj.name,
							cacheKey: cacheKey,
							width: width,
							height: height
						}
					})
				};
				lambda.invokeAsync(params, function(err, data) {
					if (err) console.log(err, err.stack); // an error occurred
					else     console.log(data);           // successful response
				});
			}
		});

		var cacheUrl = 'https://s3-eu-west-1.amazonaws.com/' + cacheBucket + '/' + cacheName;

		return cacheUrl;

	}
});