

Template.posts.helpers({
	posts: function(){
		Posts.addPost({
			title: "added3",
			author: "andre",
			text: "text"
		});


		return Posts.entries.find();
	}
});

Template.s3_tester.events({
    "click button.upload": function(){
        var files = $("input.file_bag")[0].files;

		Images.addImage(files, {});
    }
});
