Package.describe({
  name: 'lvd-blogg',
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

  api.imply('lvd-blogg-posts');
  api.use(['iron:router@1.0.7', 'accounts-base', 'accounts-password'], ['client', 'server']);
  api.use(['templating', 'less'], 'client');

  api.addFiles(['html/test.html'], 'client');
  api.addFiles(['js/test.js'], 'client');
});
