import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

/// ROUTING
/// guide - http://iron-meteor.github.io/iron-router/
Router.configure({
	layoutTemplate: 'ApplicationLayout'//the default template we're going to use, is called ApplicationLayout, which will be a super template, into which we can insert other templates. So we will have one global layout, and we can swap out the components
});

Router.route('/:page?', function () {
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
		
	var msgs;
	//Should we validate it?
	
		var tag = $("#searchinput").val();
		//msgs = Messages.find({"tags: " + tag});
		
			return msgs;
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
			var text = $("#commentbox").val();
			var tags = $("#tagsbox").val();

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
				var html = $("<span class=\"badge\">"+author+" - "+time+"</span>"+"<span class=\"label label-primary\"> TAGS: "+tags+"</span>"+"<li>"+text+"</li>");
				html.prependTo('#comments');
				$("#commentbox").val("");
			}

		return false; // we avoid the default operation of the event handler (here is a "reload the page" when we press 'save' in the form)	
		}
	}
});

 //Pagination
 Template.messages.onCreated(function() {
  var template = this;

  template.autorun(function(){
  	var skipCount = (currentPage() - 1) * Meteor.settings.public.recordsPerPage;
    template.subscribe('customers', skipCount);
  });
});
 Template.messages.helpers({
  customers: function() {
    return Messages.find();
  },
  prevPage: function() {
    var previousPage = currentPage === 1 ? 1 : currentPage - 1;
    return Router.routes.messages.path({page: previousPage});
  },
  nextPage: function() {
    var nextPage = hasMorePages() ? currentPage() + 1 : currentPage();
    return Router.routes.messages.path({page: nextPage});
  },
  prevPageClass: function() {
    return currentPage() <= 1 ? "disabled" : "";
  },
  nextPageClass: function() {
    return hasMorePages() ? "" : "disabled";
  }
});

Template.messages.events({
	'click #btnAddMessage': function(e) {
    e.preventDefault();

    Router.go('addMessage');
  }
});

 var hasMorePages = function() {
  var totalCustomers = Counts.get('customerCount');
  return currentPage() * parseInt(Meteor.settings.public.recordsPerPage) < totalCustomers;
}

var currentPage = function() {
  return parseInt(Router.current().params.page) || 1; 
}