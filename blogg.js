 if (Meteor.isClient) {
    Posts = new Meteor.Collection('posts');
    Meteor.subscribe('posts');

    Template.posts.helpers({
      posts: function(){
        return Posts.find();
      }
    })
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    Blog = {};

    Blog.path = process.env['BLOG_PATH'];

    if(!Fs.stat(Blog.path).isDirectory())
        throw new Error('env BLOG_PATH must point to an existing dir');
    console.info('Using BLOG_PATH', Blog.path);
    
    Blog.postsPath = Blog.path + 'posts';
    console.info('Path to posts', Blog.postsPath);

    Blog.posts = new Meteor.Collection(null);
    var processing = false;
    getPosts();

    function getPosts(){
        if(!processing){
            processing = true;
            //Blog.posts.remove({})
            var posts = Fs.readdir(Blog.postsPath);

            posts.forEach(function(post){
                var path = Blog.postsPath + '/' + post;
                if(Fs.stat(path).isDirectory()){
                    var o = {} 
                    o.id = post;
                    o.text = Fs.readFile(path + '/text.md', 'utf8');
                    o.images = Fs.readdir(path + '/images');
                    
                    settings = JSON.parse(Fs.readFile(path + '/settings.json', 'utf8'));
                    for (var key in settings) {
                        o[key] = settings[key];
                    };

                    Blog.posts.upsert({id: o.id}, {$set: o});

                }
            })
        }
        processing = false
    }

    Fs.watch(Blog.postsPath, function(e, fname){

      switch (true) {
        case (fname.indexOf('text.md') != -1):
        case (fname.indexOf('settings.json') != -1):
        case (fname.indexOf('images') != -1):
            console.log('update to allowed files noticed', e, fname)
            getPosts() 
            break;
        case (fname.indexOf('.DS_Store') !=-1):
            console.log('update to disallowed files noticed', e, fname)
            break;
        case (fname.indexOf('/') < 0):
            console.log('update to post folder noticed', e, fname)
            Blog.posts.remove({})
            getPosts();
            break;
        default:
          break;
       }

    })

  });

  Meteor.publish('posts', function(){
    var self = this;
    var handle = Blog.posts.find({}).observeChanges({
      added: function (id, fields) {
        self.added('posts', id, fields);
      },
      changed: function(id, fields){
        self.changed('posts', id, fields)
      },
      removed: function (id){
        self.removed('posts', id);
      }
    });
    self.ready();
    // Stop observing the cursor when client unsubs.
    // Stopping a subscription automatically takes
    // care of sending the client any removed messages.
    self.onStop(function () {
      handle.stop();
    });

  })


}
