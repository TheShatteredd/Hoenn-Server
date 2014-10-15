exports.cmds = {
    convert: function (target, room, user) {
        var targets = target.split(',');
        if (targets.length > 2) {
            this.sendReply('Please use all parts of the command. If you don\'t know how to use the command then type /moneyintro');
            return false;
        }
    },
        startmoney: function (target, room, user) {
            if (this.can('derp')) {
                if (money.isOn == true) {
                    this.sendReply('Money is already on.');
                    return false
                }
                if (money.isOn == false) {
                    money.isOn = true;
                    money.settings.isOn = true;
                    room.addRaw('<b>Money has been started, hopefully all the bugs have been fixed. If you have any bug reports please pm bandi or one of our tech support<b>')
                } else {
                    return false
                }
            }
        },
        givebp: function (target, room, user) {
            if (money.isOn == false) {
                this.sendReply('Money isn\'t on yet, we are fixing bugs');
                return false
            } else {
                var targets = target.split(',');
                if (!targets[0] || !targets[1]) {
                    this.sendReply('The proper parameters are /' + cmd + ' user, amount');
                }
                else {
				    money.read(user);
                    target = toId(targets[0]);
                    var targetUser = Users.get(target);
                    if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
                    var givebp = parseInt(targets[1]);
                    if (isNaN(givebp)) return this.sendReply('Invalid sum of battle points.');
                    if (givebp > user.bp) return this.sendReply('You cannot give more than your own battle points.');
                    else {
                        targetUser.bp += givebp;
                        user.bp -= givebp;
                        money.save(user);
                        this.sendReply(targetUser.name + ' has received ' + givebp + ' battle points from you.');
                    }
                }
            }
        },
        givecoins: function (target, room, user) {
            if (money.isOn == false) {
                this.sendReply('Money isn\'t on yet, we are fixing bugs');
                return false
            } else {
                var targets = target.split(',');
                if (!targets[0] || !targets[1]) {
                    this.sendReply('The proper parameters are /' + cmd + ' user, amount');
                } else {
				    money.read(user);
                    target = toId(targets[0]);
                    var targetUser = Users.get(target);
                    if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
                    var givecoins = parseInt(targets[1]);
                    if (isNaN(givecoins)) return this.sendReply('Invalid sum of coins.');
                    if (givecoins > user.coins) return this.sendReply('You cannot give more than your own coins.');
                    else {
                        targetUser.coins += givecoins;
                        user.coins -= givecoins;
                        money.save(user);
                        this.sendReply(targetUser.name + ' has received ' + givecoins + ' coins from you.');
                    }
                }
            }
        },
        gived: function (target, room, user) {
            if (money.isOn == false) {
                this.sendReply('Money isn\'t on yet, we are fixing bugs');
                return false
            } else {
                money.read(user);
                    var targets = target.split(',');
                    if (!targets[0] || !targets[1]) {
                        this.sendReply('The proper parameters are /' + cmd + ' user, amount')
                    } else {
                        target = toId(targets[0]);
                        var targetUser = Users.get(target);
                        if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
                        var givemoney = parseInt(targets[1]);
                        if (isNaN(givemoney)) return this.sendReply('Invalid sum of dollars.');
                        if (givemoney < 1) return this.sendReply('Invalid sum of dollars.');
                        if (givemoney > user.dollars) return this.sendReply('You cannot give more than your own BP.');
                        else {
                            targetUser.dollars += givemoney;
                            user.dollars -= givemoney;
                            money.save(user)
                            this.sendReply(targetUser.name + ' has received ' + givemoney + ' dollars from you.');
                        }
                    }
                }
            },

            givet: function (target, room, user) {
                if (money.isOn == false) {
                    this.sendReply('Money isn\'t on yet, we are fixing bugs');
                    return false
                } else {
                    var targets = target.split(',');
                    money.read(user);
                    if (!targets[0] || !targets[1]) {
                        this.sendReply('The proper parameters are /' + cmd + ' user, amount')
                    }
                    target = toId(targets[0]);
                    var targetUser = Users.get(target);
                    if (!targetUser) return this.sendReply('The user ' + target + ' was not found.');
                    var givetkt = parseInt(targets[1]);
                    if (isNaN(givetkt)) return this.sendReply('Invalid number of tickets.');
                    if (givetkt < 1) return this.sendReply('Invalid number of tickets.');
                    if (givetkt > user.tkts) return this.sendReply('You cannot give more than your own tickets.');
                    targetUser.tkts += givetkt;
                    user.tkts -= givetkt;
                    money.save(user)
                    this.sendReply(targetUser.name + ' has received ' + givetkt + ' ticket(s) from you.');
                }
            },

            //money commands for admins
            awdd: function (target, room, user) {
                if (money.isOn == false) {
                    this.sendReply('Money isn\'t on yet, we are fixing bugs');
                    return false
                } else {
                    if (!user.can('hotpatch')) return false;
                    targets = target.split(',');
                    target = toId(targets[0]);
                    var targetUser = Users.get(target);
                    if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
                    var addmoney = parseInt(targets[1]);
                    if (isNaN(addmoney)) return this.sendReply('Invalid sum of dollars.');
                    targetUser.dollars += addmoney;
                    money.save(targetUser);
                    this.sendReply(targetUser.name + ' has received ' + addmoney + ' dollars.');
                    if (Rooms.rooms.staff) Rooms.rooms.staff.addRaw(targetUser.name + ' has received ' + addmoney + ' dollars from ' + user.name);
                }
            },

            rmvd: function (target, room, user) {
                if (money.isOn == false) {
                    this.sendReply('Money isn\'t on yet, we are fixing bugs');
                    return false;
                } else {
                    if (!user.can('hotpatch')) return false;
                    targets = target.split(',');
                    target = toId(targets[0]);
                    var targetUser = Users.get(target);
                    if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
                    var removemoney = parseInt(targets[1]);
                    if (isNaN(removemoney)) return this.sendReply('Invalid sum of dollars.');
                    if (removemoney > targetUser.dollars) return this.sendReply('Invalid sum of dollars.');
                    targetUser.dollars -= removemoney;
                    money.save(targetUser)
                    this.sendReply(targetUser.name + ' has had ' + removemoney + ' dollars removed from their bagpack.');
                    if (Rooms.rooms.staff) Rooms.rooms.staff.addRaw(targetUser.name + ' has had ' + removemoney + ' dollars removed from their bagpack by ' + user.name);
                }
            },
            awdt: function (target, room, user) {
                if (money.isOn == false) {
                    this.sendReply('Money isn\'t on yet, we are fixing bugs');
                    return false;
                } else {
                    if (!user.can('hotpatch')) return false;
                    targets = target.split(',');
                    target = toId(targets[0]);
                    var targetUser = Users.get(target);
                    if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
                    var addtkt = parseInt(targets[1]);
                    if (isNaN(addtkt)) return this.sendReply('Invalid number of tickets.');
                    else {
                        targetUser.tkts += addtkt;
                    money.save(targetUser)
                    this.sendReply(targetUser.name + ' has received ' + addtkt + ' ticket(s).');
                    if (Rooms.rooms.staff) Rooms.rooms.staff.addRaw(targetUser.name + ' has received ' + addtkt + ' ticket(s) from ' + user.name);
                    }
                }
            },

            rmvtkt: function (target, room, user) {
                if (money.isOn == false) {
                    this.sendReply('Money isn\'t on yet, we are fixing bugs');
                    return false
                } else {
                    if (!user.can('hotpatch')) return false;
                    targets = target.split(',');
                    target = toId(targets[0]);
                    var targetUser = Users.get(target);
                    if (!targetUser) return this.sendReply('The user ' + targetUser + ' was not found.');
                    var removeticket = parseInt(targets[1]);
                    if (isNaN(removemoney)) return this.sendReply('Invalid number of tickets.');
                    if (removeticket > targetUser.tkts) return this.sendReply('Invalid number of tickets.');
                    targetUser.tkts -= removeticket;
                    money.save(targetUser)
                    this.sendReply(targetUser.name + ' has had ' + removeticket + ' tickets removed from their bagpack.');
                    if (Rooms.rooms.staff) Rooms.rooms.staff.addRaw(targetUser.name + ' has had ' + removeticket + ' tickets removed from their bagpack by ' + user.name);
                }
            },

            moneyintro: function (target, room, user) {
                this.sendReplyBox('<h2>Money Commands</h2><br /><hr />' +
                    '<h3>Every User Commands</h3><br /><hr />' +
                    '/buy <em>Use this to buy a item\'s id</em><br />' +
                    '/rbet <em> Bet a color on the roulette.</em><br />' +
                    '/scratchtkt <em> Not done but will allow you to scratch a ticket there will be chances to the amount you win. </em><br />' +
                    '<h3>Voice And Up Commands</h3><br /><hr />' +
                    '!shop <em>Allows a voiced user to show the shop.</em><br />' +
                    '!moneyintro <em>Shows you this.</em><br />' +
                    '!emotes <em>Shows the emote list.(not done)</em>' +
                    '<h3>Driver And Up Commands</h3><br /><hr />' +
                    '/roul <em> Starts a roulette this  will not work in lobby.</em><br />' +
                    '/spin <em>Spins the roulette.</em><br />' +
                    '<h3>VIP Commands</h3><br /><hr />' +
                    '/emote <em>Use ths with the emote ID to display a emote.(note done yet)</em><br />' +
                    '/mark <em>Allows you to give yourself a custom sign. (not done yet)</em><br />' +
                    '<h3>Admin Commands</h3><br /><hr />' +
                    '/award <em>Lets you give a user a amount of PokeDollars.</em><br />' +
                    '/awardtkt <em> gives the user a amount tickets</em><br />' +
                    '/rmvmoney <em> removes an amount of money from a user</em><br />' +
                    '/rmvtkt <em>removes an amount of tickets from a user</em><br />' +
                    '/checkalltickets <em>Checks if everyone on the server with a certain amount of tickets</em><br />' +
                    '/checkallmoney <em>Checks every user\'s money for ac</em><br />' +
                    '<h3>FAQ</h3><br /><hr />' +
                    'How do I get Battle Points?: Win a Tournament.<br />' +
                    'How do i get Dollars and Chips? Trade in battle points with /tradeinm [amount of bp](1 bp = 100$) and /tradeinc [amount of bp] (1 bp = 1 chip). <br />' +
                    'How do I get tickets? Buy them. Check the shop with /shop<br />' +
                    'What do i do with Tickets, you can either scratch them and hope to win, or trade 25 in for a ticket into the casino or arcade with /casinotkt or /arcade ticket.<br />' +
                    'What is a Roulette? A virtual machine that spins and if it lands on the color you bet you win Battle Points.<br />' +
                    'How do i check my money?: /profile, which also displays your other information.');
            },


            shop: function (target, room, user) {
                if (!this.canBroadcast()) return;
                if (money.isOn == false) this.sendReply('Money isn\'t on yet, we are fixing bugs');
                else {
                    this.sendReplyBox('<center></h4><table border="1" cellspacing ="0" cellpadding="4"><b>Welcome to our Shop. Spend your Dollars here!</b>' +
                        '<tr>' +
                        '<th>Item</th>' +
                        '<th>Price</th>' +
                        '<th>Description</th>' +
                        '<th>ID</th>' +
                        '</tr>' +
                        '<td>Ticket</td>' +
                        '<td>100 Dollars</td>' +
                        '<td>A ticket</td>' +
                        '<td>tkt</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td>Ticket Reel</td>' +
                        '<td>1,000 Dollars</td>' +
                        '<td>A reel of Tickets [10 tkts]</td>' +
                        '<td>reel</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td>Ticket Chest</td>' +
                        '<td>10,000 Dollars</td>' +
                        '<td>A chest of Tickets [100 tkts]</td>' +
                        '<td>chest</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td>Trainer Card</td>' +
                        '<td>10,000 Dollars</td>' +
                        '<td>A trainer card</td>' +
                        '<td>tc</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td>Custom Color</td>' +
                        '<td>775 coins</td>' +
                        '<td>A custom color</td>' +
                        '<td>color</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td>Avatar</td>' +
                        '<td>500 Coins</td>' +
                        '<td>A custom avatar sized 80px x 80px</td>' +
                        '<td>ava</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td>Voice</td>' +
                        '<td>5,000 Coins</td>' +
                        '<td>A promotion to Voice. For more details, use /groups.(this can be taken away)</td>' +
                        '<td>voice</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td>Room Message</td>' +
                        '<td>5,000 Coins</td>' +
                        '<td>A welcome message for your room</td>' +
                        '<td>roommsg</td>' +
                        '</tr>' +
                        '<tr>' +
                        '<td>Force Rename</td>' +
                        '<td>10,000 Dollars</td>' +
                        '<td>The ability to forcibly rename yourself to any namethat is appropriate.</td>' +
                        '<td>rename</td>' +
                        '</tr>'
                    );
					}
                },

               buy: function (target, room, user) {
                    if (money.isOn == false) {
                        this.sendReply('Money isn\'t on yet, we are fixing bugs');
                        return false;
                    } else {
                        if (!target) {
                            this.sendReply('Please specify a item.');
                            return false;
                        }
                    var tar = target;
                    if (money.checkItem(target) == false) {
                        return this.sendReply('That item doesn\'t exist');
                        return false;
                    } else {
                        money.read(user);
                        var taritem = money.shop[target];
                        if (taritem.price < user[item.currency] || user[item.currency] === taritem.price) {
                            if (taritem.promo && config.groupsranking.indexOf(user.group) > config.groupsranking.indexOf(taritem.promo)) {
                                return this.sendReply('You are already ' + taritem.promo + 'or higher, your purchase was canceled.');
                            }
                            this.sendReply('You have successfully purchased a ' + taritem.name + '.You benefit ' + taritem.benefits + ' from ' + taritem.name + '.');
                            user[item.currency] -= taritem.price;
                            if (taritem.add) {
                                room.add(taritem.add)
                            }
                            if (taritem.tkts) {
                                user.tkts += taritem.tkts;
                            }
                            if (taritem.say) {
                                this.parse(taritem.say)
                            }
                            if (taritem.userproperties) {
                                Object.merge(user, taritem.userproperties);
                            }
                            if (taritem.promo && config.groupsranking.indexOf(user.group) < config.groupsranking.indexOf(taritem.promo)) {
                                Users.setOfflineGroup(user.userid, taritem.promo);
                            } 
                            money.save(user);
                        } else {
                            this.sendReply('You do not have enough money to purchase that item.');
                            return false;
                        }
                    }
                }
            }
            };
