Package.describe({
  name: 'lightbox',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.use('jquery', 'client');
  api.addFiles('imagelightbox.min.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('imageserve');
  api.addFiles('imageserve-tests.js');
});