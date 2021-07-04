// Take command from bot, if empty tell it forward, then
// send JSON action and direction to bot

// Check performance of lua matching 

const Websocket = require('ws');
const express = require('express');
const url = require('url');

const app = express();
let paired = false;

const digDirections = ['up', 'down', 'forward'];
const moveDirections = ['up', 'down', 'left', 'right', 'forward'];

const wss = new Websocket.Server({ port: 8080 });
wss.on('connection', function connection(ws, req, client) {
	ws.on('message', function incoming(message) {

		console.log(req.url);
		console.log(req.headers.host);
		
		const conn = new URL(req.url, "http://" + req.headers.host);

		const search_params = conn.searchParams;

		console.log(search_params.entries());

		console.log(message);

		 


	});

	ws.send('Something');
});


// FORMAT OF TURTLE ACTION
//
// ws.send(JSON.stringify({
// 	"action": "test",
// 	"direction": "dir"
// }));