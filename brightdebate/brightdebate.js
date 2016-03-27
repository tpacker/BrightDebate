//  Global 

//  Mongo collections
GlobalData = new Mongo.Collection("global-data");
Tags = new Mongo.Collection("tags");
Links = new Mongo.Collection("links");
Propositions = new Mongo.Collection("propositions");



// Initialize DB
Meteor.startup(function()
{
	if (typeof GlobalData.findOne() === 'undefined')
	{
		GlobalData.insert({name: 'feedback-email', value: 'ThomasPacker@gmail.com'});
	}
});



//  Client side
if (Meteor.isClient) 
{
	// counter starts at 0
	Session.setDefault('counter', 0);
	
	
	Template.clickCounter.helpers
	({
		counter: function () 
		{
			return Session.get('counter');
		}
	});

	Template.clickCounter.events
	({
		'click button': function () 
		{
			// increment the counter when button is clicked
			Session.set('counter', Session.get('counter') + 1);
		}
	});
	
	
	Template.body.helpers
	({
		tags: function()
		{
			return Tags.find({}, {sort: {createdAt: -1}});
		},
		links: function()
		{
			return Links.find({}, {sort: {createdAt: -1}});
		},
		propositions: function()
		{
			return Propositions.find({}, {sort: {createdAt: -1}});
		}
	});
	
	Template.body.events
	({
		"submit .new-tag": function(event)
		{
			// Prevent default browser form submit
			event.preventDefault();
			
			// Get value from form element
			var text = event.target.text.value;
			
			// Insert a task into the collection
			Tags.insert
			({
				text: text,
				createdAt: new Date(),
				owner: Meteor.userId(),
				username: Meteor.user().username
			});
			
			// Clear form
			event.target.text.value = "";
		},
		"submit .new-link": function(event)
		{
			// Prevent default browser form submit
			event.preventDefault();
			
			// Get value from form element
			var title = event.target.title.value;
			var url = event.target.url.value;
			
			// Insert a task into the collection
			Links.insert
			({
				title: title,
				url: url,
				createdAt: new Date(), 
				owner: Meteor.userId(),
				username: Meteor.user().username
			});
			
			// Clear form
			event.target.title.value = "";
			event.target.url.value = "";
		},
		"submit .new-proposition": function(event)
		{
			// Prevent default browser form submit
			event.preventDefault();
			
			// Get value from form element
			var text = event.target.text.value;
			
			// Insert a task into the collection
			Propositions.insert
			({
				text: text,
				createdAt: new Date(), 
				owner: Meteor.userId(),
				username: Meteor.user().username
			});

			// Clear form
			event.target.text.value = "";
		}
	});
	
	
	Template.tag.events
	({
		"click .delete": function() 
		{
			Tags.remove(this._id);
		}
	});	
	
	
	Template.link.events
	({
		"click .delete": function() 
		{
			Links.remove(this._id);
		}
	});	
	
	
	Template.proposition.events
	({
		"click .toggle-checked": function() 
		{
			// Set the checked property to the opposite of its current value
			Propositions.update(this._id, 
			{
				$set: {checked: !this.checked}
			});
		},
		
		"click .delete": function() 
		{
			Propositions.remove(this._id);
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
	
	
	Accounts.ui.config
	({
		passwordSignupFields: "USERNAME_ONLY"
	});
}



//  Server
if (Meteor.isServer) 
{
	Meteor.startup(function () 
	{
		// code to run on server at startup
	});
}
