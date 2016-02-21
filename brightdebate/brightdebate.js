//  Mongo collections
GlobalData = new Mongo.Collection("global-data");

// Initialize DB
Meteor.startup(function()
{
	if (typeof GlobalData.findOne() === 'undefined')
	{
		GlobalData.insert({name: 'feedback-email', value: 'ThomasPacker@gmail.com'});
	}
});



if (Meteor.isClient) 
{
	// counter starts at 0
	Session.setDefault('counter', 0);

	Template.hello.helpers
	({
		counter: function () 
		{
			return Session.get('counter');
		}
	});

	Template.hello.events
	({
		'click button': function () 
		{
			// increment the counter when button is clicked
			Session.set('counter', Session.get('counter') + 1);
		}
	});
	
	
	Template.footer.helpers
	({
		feedbackEmail: function() 
		{
			console.log(GlobalData.findOne({name: 'feedback-email'}).value);
			return GlobalData.findOne({name: 'feedback-email'}).value;
		}	
	});
}



if (Meteor.isServer) 
{
	Meteor.startup(function () 
	{
		// code to run on server at startup
	});
}
