Package.describe({
	name: 'lvd-blogg-images',
	version: '0.0.1',
	// Brief, one-line summary of the package.
	summary: '',
	// URL to the Git repository containing the source code for this package.
	git: '',
	// By default, Meteor will default to using README.md for documentation.
	// To avoid submitting documentation, set this field to null.
	documentation: 'README.md'
});

Package.onUse(function(api) {
	api.versionsFrom('1.0.3.1');
	api.use(['mongo', 'lvd-blogg-storage-s3', 'iron:router@1.0.7'], ['client', 'server']);
	api.addFiles(['images-common.js', 'images-routes.js'], ['client', 'server']);
	api.addFiles(['images-client.js'], 'client');
	api.addFiles(['images-server.js'], 'server');

	api.export('Images');
});
