Package.describe({
	name: 'lvd-lightbox',
	summary: ' /* Fill me in! */ ',
	version: '1.0.0',
	git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
	api.use('jquery', 'client');

	api.addFiles('jquery.events.touch.js', 'client');
	api.addFiles('lightcase.js', 'client');
	api.addFiles('css/font-lightcase.css', 'client');
	api.addFiles('css/lightcase-max-640.css', 'client');
	api.addFiles('css/lightcase-min-641.css', 'client');
	api.addFiles('css/lightcase.css', 'client');
});