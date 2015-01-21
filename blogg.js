if (Meteor.isClient) {
	Posts = new Meteor.Collection('posts');
	Meteor.subscribe('posts');
	var settings = Meteor.settings.public;

	Template.header.rendered = function(){
		document.title = settings.title;
	}

	Template.header.helpers({
		settings: function(){
			return settings;
		}
	})


	Template.posts.rendered = function(){
		$('header h1').fitText();
	}

	Template.post.helpers({
		prettyDate: function(date){
			return moment(date, "YYMMDD").format('LL')
		}
	})

	Template.login.events({

    'submit #login-form' : function(e, t){
      e.preventDefault();
      var name = t.find('#login-name').value
        , password = t.find('#login-password').value;

        Meteor.loginWithPassword(name, password, function(err){
        if (err)
        	console.log(err)
        else
         	return
      });
         return false; 
      }
  });
}

if (Meteor.isServer) {
 	Meteor.startup(function () {
 		if(!Meteor.users.findOne({username: Meteor.settings.username}))
 			Accounts.createUser({username: Meteor.settings.username, password: Meteor.settings.password});

		Blog = {};

 		Blog.path = process.env['BLOG_PATH'];
 		Blog.cacheFolder = Blog.path + 'cache';

 		Blog.settings = JSON.parse(Fs.readFile(Blog.path + '/settings.json', 'utf8'));

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
			
				var posts = Fs.readdir(Blog.postsPath);

				posts.forEach(function(post){
					var path = Blog.postsPath + '/' + post;
					if(Fs.stat(path).isDirectory()){
						var o = {} 
						o.id = post;
						o.text = Fs.readFile(path + '/text.md', 'utf8');
						o.images = Fs.readdir(path + '/images').filter(function(el){
							return el.indexOf('.jpg') > -1 || el.indexOf('.png')  > -1 || el.indexOf('.tiff') > -1
						});

						console.log('o.images', o.images)

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

		Meteor.methods({
			'getBlogSettings': function(){
				return Blog.settings;
			}
		})

		is = new ImageServe(Blog.path, Blog.cacheFolder);

	});

 }
