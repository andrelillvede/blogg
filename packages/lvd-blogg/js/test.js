Template.body.events({
	'click #add-post': function(){
		Posts.addPost({
			title: '' + Math.floor((Math.random() * 100) + 1),
			author: 'andre',
			text: ''
		});
	}
})

Template.posts.helpers({
	posts: function(){
		return Posts.entries.find();
	},
	images: function(){
		return Images.getPostImages(this._id);
	}
});

Template.image.helpers({
	uploaded: function(){
		return this.progress === 100;
	},
	uploadLeft: function(){
		return 100 - this.progress;
	}
});

Template.uploader.events({
    "click button.upload": function(e, tmpl){
        var files = $("input.file_bag")[0].files;
		Images.addImage(files[0], {postId: this._id, name:files[0].name});
    }
});
