# WhatsBOT
## Required Node Module
1. whatsapp-web.js 
>npm install whatsapp-web.js 
2. cors
>npm install cors 

## Steps to initialise:

1.Clone this repo locally and run this command from the root of the repo to install all the dependencies.
>npm install

2.Run run this command from the root of the repo:
>node node_modules\whatsapp-web.js\example.js

3.Scan the QR Code from the WhatsApp web option from your mobile phone's WhatsApp.

4.You will get a JSON file session.json at the root of the repo.

5.Copy the contents of the session.json file. Opne the index.js file at the root of the repo and paste at the indicate line...(line no. 11)

6.Modify your Mobile Number (at line no. 8) and save the file.

7.Run this command from the root of the repo to start the server.
>node index.js

8.Open the browser with url "localhost:3000/num=<WHATSAPP_NUMBER_WITH_COUNTRY_CODE>". This will send a greeting message to the number in the URL.
