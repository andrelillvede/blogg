Router.route('/', function () {
  
  var settings = Meteor.settings.public;
  if(settings.auth){
    console.log(Meteor.userId())
    if(!Meteor.userId()){
      this.render('login');
      return
    };
  }

  this.render('posts', {
    data: function () {
      return Posts.find();
    }
  });
});

Router.route('/post/:id', function () {
  this.render('posts', {
  	data: function () {
      return Posts.find({id: this.params.id});
    }
  });
});


Router.route('/image/:post/:filename/:imageSize', {where: 'server'})
  .get(function () {
    
    var file = Fs.readFile(is.getImage(this.params.post, this.params.filename, this.params.imageSize));

    var headers = {
      'Content-type': 'image/png',
    };

    this.response.writeHead(200, headers);
    return this.response.end(file);
  })