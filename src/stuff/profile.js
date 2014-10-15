function formatAMPM (date) {
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0'+minutes : minutes;
		var strTime = hours + ':' + minutes + ' ' + ampm;
		return strTime;
	}

var Profile = {
	avatar: function (user, height) {
	    return '<img src="http://play.pokemonshowdown.com/sprites/trainers/' + user.avatar + '.png' + '" align="left" height="' + height + '">';
	},

	customAvatar: function (user, height) {
	    return '<img src="http://71.92.60.231:5000/avatars/' + user.avatar + '" align="left" height="' + height + '"><br/>';
	},

	name: function (user) {
	    return '<b><font size="2" color="' + Source.Color.hashColor(user.name) + '">' + user.name + '</font></b>';
	},

	unregisteredName: function (user) {
	    return '<b><font size="2" color="' + Source.Color.hashColor(user.name) + '">' + user.name + ' </b></font><font color="2">(Unregistered)</font>';
	},

	rank: function (user) {
	var data = fs.readFileSync('src/data/tourWins.csv','utf8');
		var row = (''+data).split("\n");

		var list = [];

		for (var i = row.length; i > -1; i--) {
			if (!row[i]) continue;
			var parts = row[i].split(",");
			list.push([toUserid(parts[0]),Number(parts[1])]);
		}
		list.sort(function(a,b){
    		return a[1] - b[1];
		});
		var arr = list.filter( function( el ) {
   			 return !!~el.indexOf(toUserid(user));
		});
		if (list.indexOf(arr[0]) === -1) {
			return 'Not Ranked';
		} else {
			return 'Rank <b>' + (list.length-list.indexOf(arr[0])) + '</b> out of ' + list.length;
		}
	},

	elo: function (user) {
		Source.Source.stdinNumber('elo.csv', user, 'elo');
		if (user.elo === 0|| isNaN(user.elo)) {
			user.elo = 1000;
		}
		return ' | Elo Ranking: ' + Math.round(user.elo) + '<br/>';
	},

	views: function (user) {
	    Source.Source.stdinNumber('views.csv', user, 'views');
	    var space = '&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;';
	    return space + '- Views: ' + user.views;
	},

	money: function (user) {
	    Source.Source.stdinNumber('userwealth.csv', user, 'money');
	    return '<i>Money:</i> ' + '<img src="http://cdn.bulbagarden.net/upload/8/8c/Pok%C3%A9monDollar.png" title="PokeDollar">' + user.money;
	},

	tourWins: function (user) {
		Source.Source.stdinNumber('tourWins.csv', user, 'tourWins');
		return  ' | <i>Tournament Wins</i>: ' + user.tourWins + '<br/>';
	},

	status: function (user) {
	    Source.Source.stdinString('status.csv', user, 'status');
	    if (user.status === '') {
	        user.status = 'This user hasn\'t set their status yet.';
	    }
	    return 'Status: "' + user.status + '"';
	},

	statusTime: function (user) {
	    Source.Source.stdinString('statusTime.csv', user, 'statusTime');
	    return ' <font color="gray">' + user.statusTime + '</font>';
	},
	lastOnline: function(user) {
	Source.Source.stdinString('lastOnline', user, 'lastOnline');
	if(user.lastOnline === '') user.lastOnline = 'Never'
	var currentdate = new Date(); 
	var datetime = "Last Online: " + (currentdate.getMonth()+1) + "/"+currentdate.getDate() + "/" + currentdate.getFullYear() + " @ "  + formatAMPM(currentdate);
	return datetime;	
	}
};

var cmds = {
	profile: function (target, room, user, connection) {
	    if (!this.canBroadcast()) return;

	    var targetUser = this.targetUserOrSelf(target);

	    if (!targetUser) return this.sendReply('User ' + this.targetUsername + ' not found.');

	    var height = 75;

	    Source.Source.stdoutNumber('views.csv', targetUser, 'views', 1);

	    var display = Profile.avatar(targetUser, height) + Profile.name(targetUser) + Profile.views(targetUser) + '<hr>' + Profile.rank(targetUser) + Profile.elo(targetUser) + Profile.money(targetUser) + Profile.tourWins(targetUser) + Profile.status(targetUser) + Profile.statusTime(targetUser) + '<br />' +Profile.lastOnline(user);
	    if (!targetUser.authenticated && targetUser.isAway === false)
	        display = Profile.avatar(targetUser, height) + Profile.unregisteredName(targetUser) + Profile.views(targetUser) + '<hr>' + Profile.rank(targetUser) + Profile.elo(targetUser) + Profile.money(targetUser) + Profile.tourWins(targetUser) + Profile.status(targetUser) + Profile.statusTime(targetUser) + '<br />' + Profile.lastOnline(user);
	        return this.sendReplyBox(display);
	    
	        display = Profile.customAvatar(targetUser, height) + Profile.name(targetUser) + Profile.views(targetUser) + '<hr>' + Profile.rank(targetUser) + Profile.elo(targetUser) + Profile.money(targetUser) + Profile.tourWins(targetUser) + Profile.status(targetUser) + Profile.statusTime(targetUser) +'<br />' + Profile.lastOnline(user);
	        return this.sendReplyBox(display);
	    
	        return this.sendReplyBox(display);
	    }
	},

};
	
	setstatus: 'status',
	status: function(target, room, user){
		if (!target) return this.sendReply('|raw|Set your status for profile. Usage: /status <i>status information</i>');
		if (target.length > 30) return this.sendReply('Status is too long.');
		if (target.indexOf(',') >= 1) return this.sendReply('Unforunately, your status cannot contain a comma.');
		var escapeHTML = sanitize(target, true);
		Source.Source.stdoutString('status.csv', user, 'status', escapeHTML);

		var currentdate = new Date(); 
		var datetime = "Last Updated: " + (currentdate.getMonth()+1) + "/"+currentdate.getDate() + "/" + currentdate.getFullYear() + " @ "  + formatAMPM(currentdate);
		Source.Source.stdoutString('statusTime.csv', user, 'statusTime', datetime);

		this.sendReply('Your status is now: "' + target + '"');
		if('+%@&~'.indexOf(user.group) >= 0) {
			room.add('|raw|<b> * <font color="' + Source.Color.hashColor(user.name) + '">' + user.name + '</font> set their status to: </b>"' + escapeHTML + '"');
		}
	},
};

Object.merge(CommandParser.commands, cmds);
exports.cmds = cmds;
