if(Meteor.isServer){
	Meteor.publish('posts', function(){
		var self = this;
		var handle = Blog.posts.find({}).observeChanges({
			added: function (id, fields) {
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