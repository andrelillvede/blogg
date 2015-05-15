
Fs = {};

var fse = Npm.require('fs-extra');
var Future = Npm.require('fibers/future');

// functions to wrap
var toWrap = [
	'close',
	'mkdir',
	'open',
	'read',
	'readdir',
	'readFile',
	'remove',
	'stat',
	'write',
	'writeFile'
];

toWrap.forEach(function(fnName) {
	var fn = fse[fnName];
	Fs[fnName] = function() {
		var future = new Future;
		Array.prototype.push.call(arguments, future.resolver());
		fn.apply(fse, arguments);
		return future.wait();
	};
});

Fs.exists = function(path) {
	var future = new Future;
	fse.exists(path, function(res) {
		future.return(res);
	});
	return future.wait();
};

Fs.watch = function(filename, listener) {
	return fse.watch(filename, Meteor.bindEnvironment(listener, 'Fs.watch callback'));
};

Fs.createWriteStream = fse.createWriteStream.bind(fse);
Fs.createReadStream = fse.createReadStream.bind(fse);
