Template.body.events({
	'click #add-post': function() {
		Posts.addPost({
			title: '' + Math.floor((Math.random() * 100) + 1),
			author: 'andre',
			text: ''
		});
	}
});

Template.registerHelper('settings', function() {
	return Meteor.settings.public;
});

Template.posts.helpers({
	posts: function() {
		return Posts.entries.find();
	}
});

Template.post.helpers({
	images: function() {
		return Images.getPostImages(this._id);
	},
	uploads: function(){
		return Storage.uploads.find({postId: this._id})
	}
});

Template.upload.helpers({
	uploaded: function() {
		return this.progress === 1;
	},
	uploadLeft: function() {
		return 100 - this.progress*100;
	}
});

Template.uploader.events({
	"click button.upload": function(e, tmpl) {
		var files = tmpl.$("input.file_bag")[0].files;
		Storage.upload(files[0], {postId: this._id, name: files[0].name});
	}
});
