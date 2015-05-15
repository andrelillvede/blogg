Router.route('/', function() {
	//GAnalytics.pageview("/");
	var settings = Meteor.settings.public;
	if(settings.auth) {
		if(!Meteor.userId()) {
			this.render('login');
			return;
		}
	}

	this.render('posts', {
		data: function() {
			return Posts.entries.find({});
		}
	});
});

Router.route('/post/:id', function() {
	//GAnalytics.pageview("/post/" + this.params.id);
	this.render('posts', {
		data: function() {
			return Posts.find({id: this.params.id});
		}
	});
});
