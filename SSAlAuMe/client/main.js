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
		this.render('inputMessages', {to: "inputMessages"});
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
	messages (){
		var msgs = Messages.find();
		//var msgs = Tst.find();
		return msgs;
	}
});


//Message insertion
Template.inputMessages.events({
	'submit form':function(event){
		

		//we test whether the user is logged in or not. If not, we won't allow insertion.
		if(Meteor.user()){
			var time = new Date();
			var author = Meteor.user().username;
			var text = $(comment).val();
			var tags = $(tags).val();

			if ((text != "") && (tags != "")){
				
				/*
				//Insert into DB
				Messages.insert({
				author: author, 
				time: time, 
				tags: tags,//ATTENTION! MUST BE AN ARRAY - separate its elements 
				text: text
				});
				*/

				//some jQuery to append the message into the current view (if it is not >10-20 msgs)
				var html = $("<span class=\"badge\">"+author+" - "+time+"</span>"+"<li>"+text+"</li>"+"<span class=\"label label-primary\"> TAGS: "+tags+"</span>");
				html.prependTo('#comments');
				$(comment).val("");
			}

		return false; // we avoid the default operation of the event handler (here is a "reload the page" when we press 'save' in the form)	
		}
	}
});
