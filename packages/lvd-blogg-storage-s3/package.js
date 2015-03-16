Package.describe({
  name: 'lvd-blogg-storage-s3',
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
  api.use(['edgee:slingshot@0.4.1', 'peerlibrary:aws-sdk'], ['client', 'server'])
  api.addFiles('storage-s3-common.js', ['client', 'server']);
  api.addFiles('storage-s3-client.js', 'client');
  api.addFiles('storage-s3-server.js', 'server');

  api.export('Storage');
});
