if(Meteor.isServer){
	Meteor.publish('posts', function(limit){
		var self = this;
		var handle = Blog.posts.find({}, { limit: limit, sort: {date: 1}}).observeChanges({
			addedBefore: function (id, fields) {
				self.added('posts', id, fields);
			},
			changed: function(id, fields){
				self.changed('posts', id, fields)
			},
			removed: function (id){
				self.removed('posts', id);
			}
		});
		self.ready();

		self.onStop(function () {
			handle.stop();
		});

	})
}