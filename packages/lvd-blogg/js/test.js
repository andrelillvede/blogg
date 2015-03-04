
Template.posts.helpers({
	posts: function(){
		var posts = Posts({limit: 1000});
		posts.addPost({
			title: "added",
			date: Date.now(),
			text: "text",
			imageColumns: 3,
			imageSize: 500
		})
		return posts.entries.find();
	}
});
