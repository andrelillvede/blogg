if(!Meteor.users.findOne({username: 'test'}))
	Accounts.createUser({username: 'test', password: 'test'});