Router.route('/', function () {
  GAnalytics.pageview("/");
  var settings = Meteor.settings.public;
  if(settings.auth){
    if(!Meteor.userId()){
      this.render('login');
      return
    };
  }

  this.render('posts', {
    data: function () {
      return Posts.find({});
    }
  });
});

Router.route('/post/:id', function () {
  GAnalytics.pageview("/post/" + this.params.id);
  this.render('posts', {
  	data: function () {
      return Posts.find({id: this.params.id});
    }
  });
});


Router.route('/image/:post/:imageSize/:filename', {where: 'server'})
  .get(function () {
    
    var etag = Meteor.npmRequire('etag');
    var file = Fs.readFile(is.getImage(this.params.post, this.params.filename, this.params.imageSize));

    var headers = {
      'Content-type': 'image/png',
      'Cache-Control': 'public, max-age=86400',
      'ETag': etag(file)
    };

    this.response.writeHead(200, headers);
    return this.response.end(file);
  })