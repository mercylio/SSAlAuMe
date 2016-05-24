Messages = new Mongo.Collection("messages");

/* 
Every collection includes an  _id  property, whose value is unique in the collection, 
which Meteor will set when you first create the document.

new Mongo.Collection("");
returns an object with methods to  'insert'  documents in the collection,  'update'  their properties, 
and  remove  them, and to find the documents in the collection that match arbitrary criteria. 
The way these methods work is compatible with the popular Mongo database API. 
The same database API works on both the client and the server.

Documentation about MongoDB CRUD operations & stucture of the "Collections": https://docs.mongodb.com/manual/core/crud-introduction/
Our Messages Collection's structure should be like this:
{
	author: "VALUE", //String
	timestamp: VALUE, //TimeStamp data value, supported in MongoDB https://docs.mongodb.com/manual/reference/bson-types/
	tags: ["VALUE1", "VALUE2", "VALUE N"],  //set some max value?
	text: "VALUE" //String
}

Little tips & tricks on retrieval of files inside Mongo Collections:

//find() parses back a "cursor" (a special object containing the 'documents' of the collection & other metadata), which can be used to access more documents
//findOne directly gives you back a document
//find().fetch()[arrayNr].keysearchedfor  using fetch() on the "cursor" gives back all the documents as an array, which is more like findOne()
//e.g.
//Messages.find().fetch()[0].text;
*/


// if Collection is empty, create a new message. To clean the DB remember: meteor reset (on the terminal)
if (Messages.find().count() == 0){
	var defaultAuthor = "Anonymus";
	var date = new Date();
	var createdAt = date.toString();
	var defaultTags = ["TAG1","TAG2","TAG3"];
	var defaultText = "Hello world! Let's get some posts on this message board!"
	Messages.insert({author: defaultAuthor, time: createdAt, tags: defaultTags, text: defaultText});
}

//check on the terminal the messages of our DB
console.log("Found "+Messages.find().count()+" messages into the Database");
for(i=0;i<Messages.find().count();i++){
	console.log("Message text is: "+Messages.find().fetch()[i].text);
	console.log("Created by: "+Messages.find().fetch()[i].author);
	console.log("At time: "+Messages.find().fetch()[i].time);
	console.log("With tags: "+Messages.find().fetch()[i].tags);
}

//security for messages - must be logged in before posting
/*
Messages.allow({
	insert:function(userId, doc){
		if (Meteor.user()){ //if user logged in
			if (userId != doc.createdBy){
				return false;
			}
			else{ //the user has the correct Id
				return true;
			}
		}
		else { //if user is not logged in
			return false;
		}
	}
})
*/