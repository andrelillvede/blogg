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


Posts = function(options){
	var entries = new Mongo.Collection('lvd-blogg-posts/posts');
	var initialLimit = Match.test(options.limit, Number) ? options.limit : 2;

	Meteor.subscribe('lvd-blogg-posts/posts', initialLimit);

	var addPost = function(post){
		Meteor.call('lvd-blogg-posts/addPost', post);
	};

	var removePost = function(postId){
		//Meteor.call('lvd-blogg-posts/removePost', postId)
	};

	var updatePost = function(postId, post){
		//Meteor.call('lvd-blogg-posts/updatePost', postId, post)
	};

	var updatePostText = function(postId, text){
		//updatePost(postId, {text: text});
		//Meteor.call('lvd-blogg-posts/updatePost', postId, {text: text})
	};

	var setSubscribeLimit = function(limit){
		Meteor.subscribe('lvd-blogg-posts/posts', limit);
	};

	return {
		addPost: addPost,
		removePost: removePost,
		updatePost: updatePost,
		updatePostText: updatePostText,
		entries: entries,
		setSubscribeLimit: setSubscribeLimit
	};
};
