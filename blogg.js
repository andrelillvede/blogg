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
    Fs.watch(Blog.path, function(e, fname){
        console.log(e);
        console.log(fname)
    })

    if(!Fs.stat(Blog.path).isDirectory())
        throw new Error('env BLOG_PATH must point to an existing dir');
    console.info('Using BLOG_PATH', Blog.path);
    
    Blog.postsPath = Blog.path + 'posts';
    console.info('Path to posts', Blog.postsPath);

    Blog.posts = new Meteor.Collection(null);
    getPosts();

    

    function getPosts(){
    	var posts = Fs.readdir(Blog.postsPath);

    	posts.forEach(function(post){
    		var path = Blog.postsPath + '/' + post;
    		if(Fs.stat(path).isDirectory()){
    			var mongoPost = {};

                mongoPost.settings = JSON.parse(Fs.readFile(path + '/settings.json', 'utf8'));
                mongoPost.text = Fs.readFile(path + '/text.md', 'utf8');
                mongoPost.images = Fs.readdir(path + '/images');

                console.log(mongoPost);
                Blog.posts.insert(mongoPost);


    			//läs settings.json
    			//läs text.md
    			//läs bildmapp

    		}
    	})

    	return posts
    }

  });

  Meteor.publish('posts', function(){
    var self = this;
    var handle = Blog.posts.find({}).observeChanges({
      added: function (id, fields) {
          self.added("posts", id, fields);
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
