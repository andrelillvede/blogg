Router.route('/image/:postId/:imageSize/:name', {where: 'server'})
	.get(function() {
		var headers = {
			'Cache-Control': 'public, max-age=31536000',
		};
		this.response.writeHead(200, headers);

		var imageObj = {name: this.params.name, postId: this.params.postId};
		Meteor.call('lvd-blogg-storage/createCacheImage', imageObj, this.params.imageSize, this.params.imageSize);
		
		var imgStream = Meteor.call('lvd-blogg-storage/getCacheImageStream', imageObj, this.params.imageSize, this.params.imageSize)
  		imgStream.pipe(this.response);
	});