Package.describe({
	name: 'lightbox',
	summary: ' /* Fill me in! */ ',
	version: '1.0.0',
	git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
	api.use('jquery', 'client');

	api.addFiles('fresco_unmin.js', 'client');
	api.addFiles('fresco.css', 'client');

	api.addFiles('skins/loading.gif', 'client');
	api.addFiles('skins/loading-small.gif', 'client');
	api.addFiles('skins/loading-medium.gif', 'client');
	api.addFiles('skins/blank.gif', 'client');

	api.addFiles('skins/fresco/sprite.png', 'client');
	api.addFiles('skins/fresco/sprite@x2.png', 'client');

	api.addFiles('skins/IE6/sprite.png', 'client');

});

Package.onTest(function(api) {
	api.use('tinytest');
	api.use('imageserve');
	api.addFiles('imageserve-tests.js');
});
