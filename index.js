const http = require('http');
const url = require('url');
const cors = require('cors')({ origin: true });
const { Client } = require('whatsapp-web.js');
var MessageMedia = require("whatsapp-web.js/src/structures/MessageMedia.js");
var msg_data = { hist: [] };

var my_num = "<YOUR MOBILE NUMBER>";

var client = new Client({
    //session: { Your SESSION DATA },
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    }
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.sendMessage(my_num + "@c.us", 'Client is ready!');

    http.createServer((req, res) => {
        cors(req, res, function () {
            if (url.parse(req.url, true).pathname == "/hist") {
                res.end(JSON.stringify(msg_data["hist"]));

                return;
            }
            
            var qry = url.parse(req.url, true).query;
            if (qry.num) {
                if (msg_data[qry.num] == undefined) msg_data[qry.num] = 0;
                if (msg_data[qry.num] < 5) {
                    client.sendMessage(qry.num + "@c.us", MessageMedia.fromFilePath("./jerry.png"), { caption: `\n_HELLO *FRIEND*_ 😉,\n\nWishing you a GREAT LIFE ahead...\n    💯💥🏁😎\n\nThank you for visiting *WhatsBOT*\n    👍👍👍\n\nWhatsBOT Message No. : *${msg_data["hist"].length + 1}*\n\nConsider Upvoting my _SOLOLEARN_ Code\n    😇😇😇\n\nhttps://code.sololearn.com/WOwu1UE2z6BR/#html` })
                    msg_data[qry.num]++;
                    msg_data["hist"].push([qry.num.slice(0, 6) + ("****") + qry.num.slice(10), Date.now()])
                    res.end("sent");
                } else {
                    res.end("limit");
                }
                return;
            }
            res.end("invalid");

        });
    }).listen(process.env.PORT || 3000, function () {
        console.log("SERVER STARTED PORT: 3000");
    });

});

client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
});
client.initialize();

