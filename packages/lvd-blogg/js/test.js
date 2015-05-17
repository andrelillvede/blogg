Template.body.events({
	'click .add-post': function() {
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


// Template.body.onRendered(function(){
// 	$('header h1').fitText();
// })

Template.body.onRendered(function(){
	$('a[data-rel^=lightcase]').lightcase({
		shrinkFactor:1

	});
})

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
	uploadProgress: function() {
		return Math.floor(this.progress*100);
	}
});

Template.uploader.events({
	"change input[type=file]": function(e, tmpl) {
		var self = this;
		var fileControl = tmpl.$("input.file_bag")[0];
		var files = fileControl.files;

		for (var i = 0; i < files.length; i++) {
			Storage.upload(files[i], {postId: self._id, name: files[i].name});
		}


		$(fileControl).val('')
	}
});
