//Linking routes to a series of "data" sources. 
var friendData = require('../data/friends.js');
var path = require('path');

module.exports = function(app){

    //GET Requests
	app.get('/api/theList', function(req, res){
		res.json(friendData);
	});

	// POST Requests
	app.post('/api/theList', function(req, res){
		var lowestDifferenceInt = 50;
		var chosenMatch;
		friendData.forEach(function(storedUserObject){
			var difference = 0;
			for(i=0;i<storedUserObject.friendNumbers.length;i++){
				difference+=Math.abs(storedUserObject.friendNumbers[i] - req.body.friendNumbers[i]);
			} if(difference<lowestDifferenceInt){
				lowestDifferenceInt = difference;
				chosenMatch = storedUserObject;
			}
        });
        
		res.json(chosenMatch);
		friendData.push(req.body);
	});

	app.post('/api/clear', function(req, res){
		// Empty the arrays
		friendData = [];
		console.log(friendData);
	});
}