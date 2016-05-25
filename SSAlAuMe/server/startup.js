/*Little tips & tricks on retrieval of files inside Mongo Collections:

//find() parses back a "cursor" (a special object containing the 'documents' of the collection & other metadata), which can be used to access more documents
//findOne directly gives you back a document
//find().fetch()[arrayNr].keysearchedfor  using fetch() on the "cursor" gives back all the documents as an array, which is more like findOne()
//e.g.
//Messages.find().fetch()[0].text;
*/
Meteor.startup(function(){
	// if Collection is empty, create a new message. To clean the DB remember: meteor reset (on the terminal)
	if (Messages.find().count() == 0){
		var defaultAuthor = "Anonymus";
		var date = new Date();
		var createdAt = date.toString();
		var defaultTags = ["TAG1","TAG2","TAG3"];
		var defaultText = "Hello world! Let's get some posts on this message board!"
		Messages.insert({author: defaultAuthor, time: createdAt, tags: defaultTags, text: defaultText});
		//check on the terminal the messages of our DB
		console.log("Found "+Messages.find().count()+" messages into the Database");
		for(i=0;i<Messages.find().count();i++){
			console.log("Message text is: "+Messages.find().fetch()[i].text);
			console.log("Created by: "+Messages.find().fetch()[i].author);
			console.log("At time: "+Messages.find().fetch()[i].time);
			console.log("With tags: "+Messages.find().fetch()[i].tags);
	}

	//another Collection of messages - for testing purposes
	if(Tst.find().count() == 0){
		Tst.insert({author: "Anonymus1",tags: "Pizza, Pasta, Spaghetti", text: "Hellooooo! It's me"});
		Tst.insert({author: "Anonymus2",tags: "Pizza, Spaghetti", text: "Ahooo! What do you want?"});
		Tst.insert({author: "Anonymus3",tags: "Pizza, Pasta, Spaghetti", text: "I've been wondering..."});
		Tst.insert({author: "Anonymus1",tags: "Pasta, Spaghetti", text: "Dude... what?!?!"});

		console.log("Found "+Tst.find().count()+" messages into the Database");

		for(i=0;i<Tst.find().count();i++){
			console.log("Message text is: "+Tst.find().fetch()[i].text);
			console.log("Created by: "+Tst.find().fetch()[i].author);
			console.log("With tags: "+Tst.find().fetch()[i].tags);
		}
	}
}
});