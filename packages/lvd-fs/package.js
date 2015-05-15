Package.describe({
	summary: "Fiber aware fs functions, and some extras"
});

Npm.depends({
	'fs-extra': '0.8.1'
});

Package.on_use(function(api, where) {
	api.add_files('fs.js', 'server');

	api.export('Fs');
});
