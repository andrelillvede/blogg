var AWS = Npm.require('aws-sdk');
AWS.config.update({
	accessKeyId: Meteor.settings.AWSAccessKeyId,
	secretAccessKey: Meteor.settings.AWSSecretAccessKey,
	region: Meteor.settings.AWSRegion
});
var s3 = new AWS.S3();
var lambda = new AWS.Lambda();



Slingshot.createDirective("postImages", Slingshot.S3Storage, {
	bucket: Meteor.settings.bucket,
	acl: "public-read",
	authorize: function() {
		//Deny uploads if user is not logged in.
		// if (!this.userId) {
		//   var message = "Please login before posting files";
		//   throw new Meteor.Error("Login Required", message);
		// }

		return true;
	},
	key: function(file, metaContext) {
		return metaContext.postId + '/' + file.name;
	}
});
Storage = {};
Storage.cacheKey = function cacheKey(imageObj, width, height){
	var imageExt = imageObj.name.split('/').pop().split('.')[1];
	var cacheSeed = imageObj.postId + '-' + imageObj.name + '-' + width + 'x' + height;
	var cacheKey = Random.createWithSeeds(EJSON.stringify(cacheSeed, {canonical: true})).id();

	return cacheKey + '.' + imageExt
}

Storage.getCacheImageStream = function(imageObj, width, height){
	var imgStream = s3.getObject({
	      Bucket: Meteor.settings.cacheBucket,
	      Key: Storage.cacheKey(imageObj, width, height)
	    }).createReadStream();

	return imgStream
}

Storage.createCacheImage = function(imageObj, width, height){
	Future = Npm.require('fibers/future');

	var srcBucket = Meteor.settings.bucket;
	var cacheBucket = Meteor.settings.cacheBucket;
	
	var headObjectSync = Meteor.wrapAsync(s3.headObject, s3)
	var invokeSync = Meteor.wrapAsync(lambda.invoke, lambda)
	var cacheKey = Storage.cacheKey(imageObj, width, height)

	try{
		var resExists = headObjectSync({Bucket: cacheBucket, Key: cacheKey});
		return false
	}catch(e){
		var params = {
			FunctionName: 'bcktResize', /* required */
			Payload: JSON.stringify({
				options: {
					srcBucket: srcBucket,
					cacheBucket: cacheBucket,
					srcKey: imageObj.postId + '/' + imageObj.name,
					cacheKey: cacheKey,
					width: width,
					height: height
				}
			})
		};

		var resLambda = invokeSync(params);

	}

	return true;
}

Meteor.methods({
	'lvd-blogg-storage/objectExists': function(path) {
		// var params = {
		// 	Bucket: Meteor.settings.bucket, /* required */
		// 	Key: path /* required */
		// };

		// try {
		// 	var res = s3.headObjectSync(params);
		// } catch (e) {
		// 	console.log('exception when getting headObjectSync', e); // pass exception object to error handler
		// }
		// console.log(res);
		// if(res)
		// 	return true;

		// return false;
	},
	'lvd-blogg-storage/deleteObject': function(path) {
		// var params = {
		// 	Bucket: Meteor.settings.bucket, /* required */
		// 	Key: path /* required */
		// };

		// try {
		// 	var res = s3.deleteObjectSync(params);
		// } catch (e) {
		// 		console.log('exception when deleting object', e); // pass exception object to error handler
		// }
		// console.log(res);
		// if(res)
		// 	return true;

		// return false;
	}
});
