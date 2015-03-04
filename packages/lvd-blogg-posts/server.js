PostsCollection = new Mongo.Collection('lvd-blogg-posts/posts');

PostsCollection.insert({title: "title", date: Date.now(), text: "text"})

Meteor.publish('lvd-blogg-posts/posts', function(limit){
	return PostsCollection.find({}, { limit: limit, sort: {date: -1} });
});

Meteor.methods({
	'lvd-blogg-posts/addPost': function(post){
		check(post, {
			title: String,
			date: Number,
			text: String,
			imageColumns: Number,
			imageSize: Number
		});

		PostsCollection.insert(post);
	},
	'lvd-blogg-posts/removePost': function(postId){
		check(postId, String);

		PostsCollection.remove(postId);
	},
	'lvd-blogg-posts/updatePost': function(postId, post){
		check(postId, String);
		check(post, {
			title: Match.Optional(String),
			date: Match.Optional(Date),
			text: Match.Optional(String)
		});

		PostsCollection.update(postId, {$set: post});
	}
});
