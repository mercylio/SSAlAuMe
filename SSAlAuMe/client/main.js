import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


/*
 Template.header.onCreated(function onSSAlaAuMECreated() {
   // Should be the logged in user
  	 author = "Anonymous";
 });
 */

/// accounts configuration
Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
});



//improve coding
var main = function() {

	$('form').submit(function(event){
		var $input = $(event.target).find('input');
		var comment = $input.val();

		if (comment != ""){
			var timestamp = new Date($.now()).toLocaleString();
			var tags = $('#tags').val();
			var html = $("<span class= \"badge\">"+ Meteor.user().username + " - " + timestamp + "</span>"+ "<li>" + comment + "</li>"
				+ "<span class=\"label label-primary\">"+ tags +"</span> <p> </p>");
			html.prependTo('#comments');
			$input.val("");//clear after insertion

			//insert the message into the DB
			
			/*
			Messages.insert({
				comment,	
				tags,
				timestamp,
				Meteor.user().username
			});
			console.log(Messages.find());
			*/
		}
		
		return false;
	});

}

$(document).ready(main);