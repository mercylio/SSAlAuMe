Messages = new Mongo.Collection("messages");

/* 
Every collection includes an  _id  property, whose value is unique in the collection, 
which Meteor will set when you first create the document.

 new Mongo.Collection("");
returns an object with methods to   insert   documents in the collection,   update   their properties, 
and   remove   them, and to find the documents in the collection that match arbitrary criteria. 
The way these methods work is compatible with the popular Mongo database API. 
The same database API works on both the client and the server.
*/


// create a new message
if (Messages.find().count() == 0){
	var defaultAuthor = "Anonymus";
	var date = new Date();
	var createdAt = date.toString();
	var defaultTags = ["TAG1","TAG2","TAG3"];
	var defaultText = "Default Text - hello world!"
	Messages.insert({author: defaultAuthor, time: createdAt, tags: defaultTags, text: defaultText});
}

/* 
OUR Messages structure should look like this:
https://docs.mongodb.com/manual/core/crud-introduction/
{
	author: "VALUE", //String
	timestamp: VALUE, //TimeStamp data value, supported in MongoDB https://docs.mongodb.com/manual/reference/bson-types/
	tags: ["VALUE1", "VALUE2", "VALUE N"],  //set some max value?
	text: "VALUE" //String
}

//find() parses back a "cursor" (a special object containing the 'documents' of the collection & other metadata), which can be used to access more documents
//findOne directly gives you back a document
//find().fetch()[arrayNr].keysearchedfor  using fetch() on the "cursor" gives back all the documents as an array, which is more like findOne()

e.g.
//Messages.find().fetch()[0].text;

*/


console.log("Found "+Messages.find().count()+" messages into the Database");
console.log("The messages' content is: "+Messages.findOne().author);
console.log("The messages' content is: "+Messages.findOne().time);
console.log("The messages' content is: "+Messages.findOne().tags);
console.log("The messages' content is: "+Messages.findOne().text);
console.log("new stufffff");
console.log("The messages' content is: "+Messages.find().fetch()[0].text);


/*
for(i=0;i<Messages.find().count();i++){
	var myMessages = Messages.find().fetch(i);
	console.log("Message nr: "+Messages.find(i).text);
}*/

