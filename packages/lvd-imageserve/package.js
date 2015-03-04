Package.describe({
  name: 'imageserve',
  summary: ' /* Fill me in! */ ',
  version: '1.0.0',
  git: ' /* Fill me in! */ '
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.2.1');
  api.addFiles('imageserve.js', 'server');
  api.export('ImageServe', 'server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('imageserve');
  api.addFiles('imageserve-tests.js');
});
