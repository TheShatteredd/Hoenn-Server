var bot = require('./bot.js').bot();
var joinAllRooms = require('./settings').settings.bbot.autoJoinAll;
var joinRooms = require('./settings').settings.bbot.rooms;
var path = require('path');
  
var worker = new (require(path.join(__dirname, './', 'fake-process.js')).FakeProcess)();
	Users.socketConnect(worker.server ,undefined, '1', '76.19.156.188');

	// Getting the fake user from the Users list
	for (var i in Users.users) { 
		if(Users.users[i].connections[0].ip === '76.19.156.188') {

			var Bot = Users.users[i];

			// Modifying user's properties
			Bot.name = bot.basedbot.substr(1,bot.basedbot.length);
			Bot.named = true;
			Bot.renamePending = Bot.name;
			Bot.authenticated = true;
			Bot.userid = toUserid(Bot.name);
			Bot.group = bot.basedbot.substr(0,1);

			// Rooms that bot will join and adding bot user to Users list and
			// removing the fake user created to easily fill in the gaps of all the user's property
			if (joinAllRooms === true) {
				for (var all in Rooms.rooms) {
					if (all != 'global' && all != 'spamroom') {
						Bot.roomCount[all] = 1;
					}
				}
				Users.users[Bot.userid] = Bot;
				for (var allRoom in Rooms.rooms) {
					if (allRoom != 'global' && allRoom != 'spamroom') {
						Rooms.rooms[allRoom].users[Users.users[Bot.name]] = Users.users[Bot.userid]; 
					}
				}
			} else {
				for (var index in joinRooms) {
					if (index != 'global' && index != 'spamroom') {
						Bot.roomCount[joinRooms[index]] = 1;
					}
				}
				Users.users[Bot.userid] = Bot;
				for (var jIndex=0; joinRooms.length>jIndex; jIndex++) {
					if (joinRooms[jIndex] != 'global' && joinRooms[jIndex] != 'spamroom') {
						
					}
				}           
			}
			delete Users.users[i];
	    }   
	}  
