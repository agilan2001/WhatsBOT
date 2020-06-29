const http = require('http');
const url = require('url');
const cors = require('cors')({ origin: true });
const { Client } = require('whatsapp-web.js');
var MessageMedia = require("whatsapp-web.js/src/structures/MessageMedia.js");
var msg_data = { hist: [] };

var client = new Client({
    session: { "WABrowserId": "\"F6Cb0xz0utNsv2uI87mH0A==\"", "WASecretBundle": "{\"key\":\"RMKtKypKtQWHfkfDah9/KaHGUHkDQvf7M55I5o0UYh0=\",\"encKey\":\"J/m31CUxLvxfCZ0MX526w28HfKFK+EXIJZzEhecyfsw=\",\"macKey\":\"RMKtKypKtQWHfkfDah9/KaHGUHkDQvf7M55I5o0UYh0=\"}", "WAToken1": "\"7a9T6ZnTQFmFGzB023UsqPMJM8/VBpjemhwpcpvMkQI=\"", "WAToken2": "\"1@QgY0+505U34Y49ajGPjCZqDEcDsKcoXqfob+bs6MXs2qMvemm1gDTp3UkOK9gdWezcb5ynb/nzNdIg==\"" },
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    }
});

client.on('ready', () => {
    console.log('Client is ready!');
    client.sendMessage("919384495336@c.us", 'Client is ready!');

    http.createServer((req, res) => {
        cors(req, res, function () {
            if (url.parse(req.url, true).pathname == "/hist") {
                res.end(JSON.stringify(msg_data["hist"]));

                return;
            }
            if (url.parse(req.url, true).pathname == "/reset_for_me") {
                msg_data["918098255246"] = 0;
                msg_data["919384495336"] = 0;

                res.end("reset");

                return;
            }
            var qry = url.parse(req.url, true).query;
            if (qry.num) {
                if (msg_data[qry.num] == undefined) msg_data[qry.num] = 0;
                if (msg_data[qry.num] < 5) {
                    client.sendMessage(qry.num + "@c.us", MessageMedia.fromFilePath("./jerry.png"), { caption: `\n_HELLO *FRIEND*_ 😉,\n\nThank you for visiting *WhatsBOT*\n    👍👍👍\n\nWhatsBOT Message No. : *${msg_data["hist"].length + 1}*\n\nConsider Upvoting my _SOLOLEARN_ Code\n    😇😇😇` })
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

