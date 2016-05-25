import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

/// ROUTING
/// guide - http://iron-meteor.github.io/iron-router/
Router.configure({
	layoutTemplate: 'ApplicationLayout'//the default template we're going to use, is called ApplicationLayout, which will be a super template, into which we can insert other templates. So we will have one global layout, and we can swap out the components
});

Router.route('/', function () {
	if(Meteor.user()){//if logged in user
		this.render('navbar', {to: "navbar"});
		this.render('msgContainer', {to: "msgContainer"});
		this.render('messages', {to: "messages"});
		this.render('input-messages', {to: "inputMessages"});
	}
	else {//if anonymous
		this.render('navbar', {to: "navbar"});
		this.render('msgContainer', {to: "msgContainer"});
		this.render('messages', {to: "messages"});
		this.render('notAllowedToPost', {to: "inputMessages"});//not allowed
	}
});


/// accounts configuration
Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
});


Template.messages.helpers({
	
	foo (){
		var msgs = "";
		for(i=0;i<Tst.find().count();i++){
			msgs = msgs + Tst.find().fetch()[i].text +"<br>"+ Tst.find().fetch()[i].author +"<br>"+Tst.find().fetch()[i].tags+"<br>";
		}
		return msgs;
	}
/*INCOMPLETE
	for(i=0;i<Messages.find().count();i++){
	console.log("Message text is: "+Messages.find().fetch()[i].text);
	console.log("Created by: "+Messages.find().fetch()[i].author);
	console.log("At time: "+Messages.find().fetch()[i].time);
	console.log("With tags: "+Messages.find().fetch()[i].tags);
	*/
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