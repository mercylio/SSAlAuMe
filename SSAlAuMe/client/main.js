import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

var author = "";

 Template.header.onCreated(function onSSAlaAuMECreated() {
   // Should be the logged in user
  	 author = "Anonymous";
 });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });


var main = function() {

	$('form').submit(function(event){
		var $input = $(event.target).find('input');
		var comment = $input.val();

		if (comment != ""){
			var timestamp = new Date($.now()).toLocaleString();
			var tags = $('#tags').val();
			var html = $("<span class= \"badge\">"+ author + " - " + timestamp + "</span>"+ "<li>" + comment + "</li>"
				+ "<span class=\"label label-primary\">"+ tags +"</span> <p> </p>");
			html.prependTo('#comments');
			$input.val("");//clear after insertion
		}
		
		return false;
	});

}

$(document).ready(main);