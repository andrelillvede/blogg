var Future = Meteor.npmRequire('fibers/future');
var spawn = Meteor.npmRequire('child_process').spawn;

ImageServe = function(){
	var q = async.queue(imageWorker, 2)
	var Future = Meteor.npmRequire('fibers/future');
    var spawn = Meteor.npmRequire('child_process').spawn;
    
	function imageWorker(task, callback){
		var originalPath = '/tmp/' + task.name;
		var im = spawn('convert', [originalPath, '-resize', task.size + 'x' + task.size + '>', "-unsharp", "2x0.5+0.7+0", "-quality", "98", task.cachePath]);

		im.on('close', function(code) {
			if(code == 0) {
				callback() 
			} else {
				console.error('preview error', code);
				callback('exited with code:'+code)
			}
		})

	}

	function hasher(value) {
		return Random.createWithSeeds(EJSON.stringify(value, {canonical:true})).id();
	}
	

	this.getImage = function(post, name, size){
		var hash = hasher(post + '-' + name + '-' + size);
		var cacheFolder = '/tmp/cache/'
		var cachePath = cacheFolder + hash;

		if(Fs.exists(cachePath))
			return cachePath

		var fut = new Future();
		q.push({
			post: post,
			name: name,
			size: size,
			cachePath: cachePath
		}, function(err){
			if(err){
				console.log('imagemagick could not create image:', err);
				return fut.return('dummy image')
			}
			console.log('created cache image')
			return fut.return(cachePath);
		})    

		return fut.wait()
	}
}



