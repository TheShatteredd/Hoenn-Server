exports.bot = function (b) {
    var bot = ''
    if (typeof b != "undefined") bot = b;
    else bot = {};
var path = require('path');
var utils = require(path.join(__dirname, '../', '/utilities.js')).Utilities;
var settings = require('./settings.js').settings;
    var botStuff = {

	settings: settings,
	
	basedbot: settings.bbot.name,
	
	wisebot: settings.wisebot,
	
	suppbot: settings.suppbot,
	
	modbot: settings.modbot.name,
	
        name: settings.name,

        jokes: settings.jokes,

        motdOn: settings.motdOn,

        spamphase: settings.spamphase,

        getRandjoke: function () {
            var fs = require('fs');
            var data = fs.readFileSync('./src/chatbot/jokes.txt', 'utf8');
            var line = data.split('\n');
            var joke = String(utils.random(line, line.length));
            if (joke.length < 1) {
                joke = line[0];
            }
            return joke;
        },

        spamcheck: require('./spamsystem.js').canTalk,

        say: function (name, message, r, reply) {
            return r.add('|c|' + name + '|' + message);
        },

        commandchar: settings.commandchar,

        Int: undefined,

        spammers: new Array('gavigator', 'professorgavin', 'suk', 'ilikewangs', 'nharmoniag', 'gavgar', 'gym leader dukeeee', 'soles', 'soles shadow'),
        cmds: {
            update: function (target, room, user) {
                try {
                    CommandParser.uncacheTree('./src/chatbot/bot.js');
                    bot = require('./bot.js').bot(bot);
                    CommandParser.uncacheTree('./src/chatbot/spamsystem.js');
                    bot.spamcheck = require('./spamsystem.js').canTalk;
                    return this.sendReply('Chatbot has been updated.');
                } catch (e) {
                    return this.sendReply('Something failed while trying to update the bot: \n' + e.stack);
                }


            },
            
            ask: function (target, room, user) {
	        if(!room.botsupported) return this.sendReply('This room does not support the chat bot, for more information type ?credits');
                var unanswerable = ['god']; //if anymore unanswered questions just add them
                if (!target) {
                    return this.sendReply('What would you like to know?')
                }
                if (target.indexOf('god') > -1) {
                    return this.sendReply('That question is unanswerable.');
                } else if (target === 'whois idk' || target === 'who is idk') {
                    if (user.can('broadcast')) {
			bot.say(user.getIdentity(), '?ask ' + target, room);
                        bot.say(bot.wisebot, 'My creator please do not disrepsect him.', room);
                    } else {
                        this.sendReply('Answer: My creator please do not disrepsect him.');
                    }
                } else {
                    var r = 'That is not a question.';
                    var yn = ['yes', 'no','maybe'];

                    if (target.indexOf('where') > -1) {
                        r = 'places';
                    }

                    if (target.indexOf('what') > -1) {
                        r = 'somthing';
                    }

                    if (target.indexOf('who') > -1) {
                        r = 'a person';
                    }

                    if (target.indexOf('when') > -1) {
                        r = 'who knows';
                    }

                    if (target.indexOf('why') > -1) {
                        r = 'reasons';
                    }

                    if (target.indexOf('how') > -1) {
                        r = 'magik';
                    }
                    if (target.indexOf('do') > -1 || target.indexOf('did') > -1 || target.indexOf('was this') > -1 || target.indexOf('was that') > -1 || target.indexOf('is') > -1 && target.indexOf('who') < -1 && target.indexOf('what') < -1 && target.indexOf('where') < -1 && target.indexOf('who') > -1 && target.indexOf('when') > -1 && target.indexOf('why') > -1) {
                        r = yn[Math.floor(Math.random() * 2)];
                    }
                    if (user.can('broadcast')) {
			bot.say(user.getIdentity(), '?ask ' + target, room);
                        bot.say(bot.wisebot, r, room);
                    } else {
                        this.sendReply('Answer: ' + r);
                    }
                }
            },
            lol: function (target, room, user) {
                if (!room.botsupported) return this.sendReply('This room does not support the chat bot, for more information type ?credits.');
                if (!target) {
                    this.sendReply('What user would you like to say this.');
                    return false;
                } else {
                    if (this.can('broadcast')) {
                        bot.say(target, 'lol', room);
                        this.logModCommand(user.name + ' used ?lol on ' + target + '.');
                    } else {
                        return false;
                    }
                }
            },
            merp: function (target, room, user) {
                if (!room.botsupported) return this.sendReply('This room does not support the chat bot, for more information type ?credits.');
                if (!target) {
                    this.sendReply('What user would you like to say this.');
                    return false;
                } else {
                    if (this.can('broadcast')) {
                        bot.say(target, '/me merps', room);
                        this.logModCommand(user.name + ' used ' + bot.commandchar + 'merp on ' + target + '.');
                    } else {
                        return false;
                    }
                }
            },
			pick: 'choose',
            choose: function (target, room, user, cmd) {
                if (!target) return this.sendReply('/pickrandom [option 1], [option 2], ... - Randomly chooses one of the given options.');
                var targets;
                        if (target.indexOf(',') === -1) {
                            targets = target.split(' ');
                        } else {
                            targets = target.split(',');
                        }
                        var result = Math.floor(Math.random() * targets.length);
				if (user.can('broadcast')) {
					bot.say(user.getIdentity(), '?choose ' + target, room);
                        bot.say(bot.wisebot, targets[result].trim(), room);
                    } else {
                        return this.sendReplyBox(targets[result].trim());
                    }
                },
                o3o: function (target, room, user) {
                    if (!room.botsupported) return this.sendReply('This room does not support the chat bot, for more information type ?credits.');
                    if (!target) {
                        this.sendReply('What user would you like to say this.');
                        return false;
                    } else {
                        if (this.can('broadcast')) {
                            bot.say(target, 'o3o', room);
                            this.logModCommand(user.name + ' used ?o3o on ' + target + '.');
                        } else {
                            return false;
                        }
                    }
                },

                derp: function (target, room, user) {
                    if (!room.botsupported) return this.sendReply('This room does not support the chat bot, for more information type ?credits.');
                    if (!target) {
                        this.sendReply('What user would you like to say this.');
                        return false;
                    } else {
                        if (this.can('broadcast')) {
                            bot.say(target, '/me derps in a pool :P', room);
                            this.logModCommand(user.name + ' used ?derp on ' + target + '.');
                        } else {
                            return false;
                        }
                    }
                },
                motd: function (target, room, user) {
                    if (this.can('mute')) {
                        if (!target) {
                            if (bot.MOTD.length > 0) {
                                return bot.say(bot.name, bot.MOTD, room);
                            }
                        } else {
                            bot.say(bot.name, 'The new Message Of the Day is: ' + target, room);
                            bot.MOTD = target;
                            bot.MOTDon = true;
                            bot.Int = setInterval(function () {
                                return bot.say(bot.name, bot.MOTD, room);
                            }, 60000);
                        }
                    } else {
                        return false;
                    }
                },

                motdoff: function (target, room, user) {
                    if (this.can('mute')) {
                        if (bot.Int) {
                            return this.add('The MOTD function is now off');
                            bot.MOTD = undefined;
                            clearInterval(bot.Int);
                        } else {
                            return this.sendReply('There is no MOTD on.');
                        }
                    } else {
                        return false;
                    }
                },


                say: function (target, room, user) {
                    if (!room.botsupported) return this.sendReply('This room does not support the chat bot, for more information type ?credits.');
                    if (this.can('broadcast')) {
                        if (!target) return this.sendReply('Please specify a message.');
                        this.logModCommand(user.name + ' used ' + bot.commandchar + 'say to say ' + target + '.');
                        return bot.say(bot.name, target, room)

                    } else {
                        return false;
                    }
                },
                joke: function (target, room, user) {
                    if (!room.botsupported) return this.sendReply('This room does not support the chat bot, for more information type ?credits.');
                    if (this.can('broadcast')) {
                        if (!bot.jokes === true) {
                            return this.sendReply('Jokes are currently off');
                        } else {
                            bot.say(bot.basedbot.name, '?joke', room);
                            return bot.say(bot.name, bot.getRandjoke(), room);
                        }
                    } else {
                        return false;
                    }
                },
            }
        };
        Object.merge(bot, botStuff);
        return bot;
    };
