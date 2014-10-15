/*********************************************************
        * Money Functions                                       *
        *********************************************************/
exports.money = function (m) {
    if (typeof m != "undefined") var money = m;
    else var money = new Object();
	var settings = require('./settings.js');
    var Moneystuff = {
    	/*********************************************************
         * Casino & Arcade                                       *
         *********************************************************/
         roul: require('./casino/roul.js'),
         
        /*********************************************************
         * Save Features                                         *
         *********************************************************/
        importtkts: function (uid) {
            var data = fs.readFileSync('src/data/usertkts.csv', 'utf8');
            var match = false;
            var tkts = 0;
            var row = ('' + data).split("\n");
            var line = '';
            for (var i = row.length; i > -1; i--) {
                if (!row[i]) continue;
                var parts = row[i].split(",");
                var userid = toUserid(parts[0]);
                if (uid.userid == userid) {
                    var x = Number(parts[1]);
                    var tkts = x;
                    match = true;
                    uid.tkts = tkts;
                    if (match === true) {
                        line = line + row[i];
                        break;
                    }
                }
            }
            return true;
        },
        importmoney: function (uid) {
            var data = fs.readFileSync('src/data/userwealth.csv', 'utf8');
            var match = false;
            var money = 0;
            var row = ('' + data).split("\n");
            var line = '';
            for (var i = row.length; i > -1; i--) {
                if (!row[i]) continue;
                var parts = row[i].split(",");
                var userid = toUserid(parts[0]);
                if (uid.userid == userid) {
                    var x = Number(parts[1]);
                    var money = x;
                    match = true;
                    uid.dollars = money;
                    if (match === true) {
                        line = line + row[i];
                        break;
                    }
                }
            }
            return true;
        },
        exportmoney: function (uid) {
            if(money.settings.autodollars[user.userid]) {
                   return money.settings.autodollars[user.userid];
            }
            var data = fs.readFileSync('src/data/userwealth.csv', 'utf8');
            var row = ('' + data).split("\n");
            var match = false;
            var line = '';
            for (var i = row.length; i > -1; i--) {
                if (!row[i]) continue;
                var parts = row[i].split(",");
                var userid = toUserid(parts[0]);
                if (uid.userid == userid) {
                    var x = Number(parts[1]);
                    var money = x;
                    match = true;
                    if (match === true) {
                        line = line + row[i];
                        break;
                    }
                }
            }
            if (match === true) {
                var re = new RegExp(line, "g");
                fs.readFile('src/data/userwealth.csv', 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    var result = data.replace(re, uid.userid + ',' + uid.dollars);
                    fs.writeFile('src/data/userwealth.csv', result, 'utf8', function (err) {
                        if (err) return console.log(err);
                    });
                });
            } else {
                var log = fs.createWriteStream('src/data/userwealth.csv', {
                    'flags': 'a'
                });
                log.write("\n" + uid.userid + ',' + uid.dollars);
                money.importmoney(uid);
            }
            return uid.money;
        },
        importbp: function (uid) {
            var data = fs.readFileSync('src/data/userbp.csv', 'utf8');
            var match = false;
            var money = 0;
            var row = ('' + data).split("\n");
            var line = '';
            for (var i = row.length; i > -1; i--) {
                if (!row[i]) continue;
                var parts = row[i].split(",");
                var userid = toUserid(parts[0]);
                if (uid.userid == userid) {
                    var x = Number(parts[1]);
                    var money = x;
                    match = true;
                    uid.bp = money;
                    if (match === true) {
                        line = line + row[i];
                        break;
                    }
                }
            }
            return true;
        },
        exportbp: function (uid) {
            var data = fs.readFileSync('src/data/userbp.csv', 'utf8')
            var row = ('' + data).split("\n");
            var match = false;
            var line = '';
            for (var i = row.length; i > -1; i--) {
                if (!row[i]) continue;
                var parts = row[i].split(",");
                var userid = toUserid(parts[0]);
                if (uid.userid == userid) {
                    var x = Number(parts[1]);
                    var money = x;
                    match = true;
                    if (match === true) {
                        line = line + row[i];
                        break;
                    }
                }
            }
            if (match === true) {
                var re = new RegExp(line, "g");
                fs.readFile('src/data/userbp.csv', 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    var result = data.replace(re, uid.userid + ',' + uid.bp);
                    fs.writeFile('src/data/userbp.csv', result, 'utf8', function (err) {
                        if (err) return console.log(err);
                    });
                });
            } else {
                var log = fs.createWriteStream('src/data/userbp.csv', {
                    'flags': 'a'
                });
                log.write("\n" + uid.userid + ',' + uid.bp);
                money.importbp(uid);
            }
            return uid.bp;
        },
        importcoins: function (uid) {
            var data = fs.readFileSync('src/data/usercoins.csv', 'utf8');
            var match = false;
            var money = 0;
            var row = ('' + data).split("\n");
            var line = '';
            for (var i = row.length; i > -1; i--) {
                if (!row[i]) continue;
                var parts = row[i].split(",");
                var userid = toUserid(parts[0]);
                if (uid.userid == userid) {
                    var x = Number(parts[1]);
                    var money = x;
                    match = true;
                    uid.coins = money;
                    if (match === true) {
                        line = line + row[i];
                        break;
                    }
                }
            }
            return true;
        },
        exportcoins: function (uid) {
               if(money.settings.autocoins[user.userid]) {
                   return money.settings.autocoins[user.userid];
            }
            var data = fs.readFileSync('src/data/usercoins.csv', 'utf8')
            var row = ('' + data).split("\n");
            var match = false;
            var line = '';
            for (var i = row.length; i > -1; i--) {
                if (!row[i]) continue;
                var parts = row[i].split(",");
                var userid = toUserid(parts[0]);
                if (uid.userid == userid) {
                    var x = Number(parts[1]);
                    var money = x;
                    match = true;
                    if (match === true) {
                        line = line + row[i];
                        break;
                    }
                }
            }
            if (match === true) {
                var re = new RegExp(line, "g");
                fs.readFile('src/data/usercoins.csv', 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    var result = data.replace(re, uid.userid + ',' + uid.coins);
                    fs.writeFile('src/data/usercoins.csv', result, 'utf8', function (err) {
                        if (err) return console.log(err);
                    });
                });
            } else {
                var log = fs.createWriteStream('src/data/usercoins.csv', {
                    'flags': 'a'
                });
                log.write("\n" + uid.userid + ',' + uid.coins);
                money.importcoins(uid);
            }
            return uid.coins;
        },
        exporttkts: function (uid) {
               if(money.settings.autotkts[user.userid]) {
                   return money.settings.autotkts[user.userid];
            }
            var data = fs.readFileSync('src/data/usertkts.csv', 'utf8')
            var row = ('' + data).split("\n");
            var match = false;
            var line = '';
            for (var i = row.length; i > -1; i--) {
                if (!row[i]) continue;
                var parts = row[i].split(",");
                var userid = toUserid(parts[0]);
                if (uid.userid == userid) {
                    var x = Number(parts[1]);
                    var money = x;
                    match = true;
                    if (match === true) {
                        line = line + row[i];
                        break;
                    }
                }
            }
            if (match === true) {
                var re = new RegExp(line, "g");
                fs.readFile('src/data/usertkts.csv', 'utf8', function (err, data) {
                    if (err) {
                        return console.log(err);
                    }
                    var result = data.replace(re, uid.userid + ',' + uid.tkts);
                    fs.writeFile('src/data/usertkts.csv', result, 'utf8', function (err) {
                        if (err) return console.log(err);
                    });
                });
            } else {
                var log = fs.createWriteStream('src/data/usertkts.csv', {
                    'flags': 'a'
                });
                log.write("\n" + uid.userid + ',' + uid.tkts);
                money.importtkts(uid);
            }
            return uid.tkts;
        },
        save: function (user) {
            money.exportmoney(user);
            money.exporttkts(user);
            money.exportcoins(user);
            money.exportbp(user);
        },
        read: function (user) {
            money.importmoney(user);
            money.importtkts(user);
            money.importcoins(user);
            money.importbp(user);
        },
        /*********************************************************
         * Settings                                              * 
         *********************************************************/
        settings: settings,
        started: settings.isOn,
        /*********************************************************
         * Item Functions                                        *
         *********************************************************/
        shop: require('./shop.js').shop,
        checkItem: function (target) {
            if (money.shop[target] !== undefined) return true
            else {
                return false;
            }
        },
        isBuyable: function (target) {
            var item = money.shop[target];
            if (user[item.currency] > item.price) {
                return true;
            }
            return false;
        },
        /*********************************************************
         * Other Stuff                                           *
         *********************************************************/
        transfer: function (type, amount) {
            if (type === 'coins') {
                if (user.bp >= amount) {
                    user.coins += amount;
                    user.bp -= amount;
                    return true
                } else {
                    return false
                }
            }
            if (type === 'dollars') {
                if (user.bp >= amount) {
                    user.dollars += amount * 100;
                    user.bp -= amount;
                    return true
                } else {
                    return false
                }
            }
        },
        //commands
        cmds: require('./cmds.js').cmds
    };
    Object.merge(CommandParser.commands, Moneystuff.cmds);
    Object.merge(money, Moneystuff);
    return money;
};
Users.User.prototype.dollars = 0;
Users.User.prototype.tkts = 0;
Users.User.prototype.coins = 0;
Users.User.prototype.bp = 0;
