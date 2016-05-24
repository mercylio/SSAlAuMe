import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

/// ROUTING
/// guide - http://iron-meteor.github.io/iron-router/
Router.configure({
	layoutTemplate: 'ApplicationLayout'//the default template we're going to use, is called ApplicationLayout, which will be a super template, into which we can insert other templates. So we will have one global layout, and we can swap out the components
});

Router.route('/', function () {
	if(Meteor.user()){
		this.render('navbar', {to: "navbar"});
		this.render('messages', {to: "messages"});
		this.render('input-messages', {to: "input-messages"});
	}
	else {
		this.render('navbar', {to: "navbar"});
		this.render('messages', {to: "messages"});
		this.render('not-allowed-to-post', {to: "input-messages"});
	}
});


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



///// USE a Template helper to load the messages

//Message insertion



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