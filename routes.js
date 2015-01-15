Router.route('/', function () {
  this.render('posts');
});

Router.route('/:post/:filename/:imageSize', {where: 'server'})
  .get(function () {
    
    var file = Fs.readFile(is.getImage(this.params.post, this.params.filename, this.params.imageSize));

    var headers = {
      'Content-type': 'image/png',
    };

    this.response.writeHead(200, headers);
    return this.response.end(file);
  })