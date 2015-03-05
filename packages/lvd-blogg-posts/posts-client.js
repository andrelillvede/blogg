/*

post = {
	title:
	date:
	images:
	text:
	imageColumns:
	imageSize
}

*/

Meteor.subscribe('lvd-blogg-posts/posts', 2);

Posts = {
	addPost: function(post){
		post.date = post.date || Date.now();
		post.imageColumns = post.imageColumns || 3;
		post.imageSize = post.imageSize || 640;
		post.gallery = post.gallery || 'all';

		Meteor.call('lvd-blogg-posts/addPost', post);
	},
	removePost: function(postId){
		//Meteor.call('lvd-blogg-posts/removePost', postId)
	},
	updatePost: function(postId, post){
		//Meteor.call('lvd-blogg-posts/updatePost', postId, post)
	},
	updatePostText: function(postId, text){
		//updatePost(postId, {text: text});
		//Meteor.call('lvd-blogg-posts/updatePost', postId, {text: text})
	},
	setSubscribeLimit: function(limit){
		Meteor.subscribe('lvd-blogg-posts/posts', limit);
	},
	entries: PostsCollection
};
