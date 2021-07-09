// Take command from bot, if empty tell it forward, then
// send JSON action and direction to bot

// Check performance of lua matching 

const Websocket = require('ws');
const url = require('url');
const { dir } = require('console');

let paired = false;

const actionList  = ['dig', 'move'];
const digDirections = ['up', 'down', 'forward'];
const moveDirections = ['up', 'down', 'left', 'right', 'forward', 'back'];

const wss = new Websocket.Server({ port: 8080 });

// (key, value) = (id, websocket) (i should've, used typescript)
const botMap = new Map(); 
const turtleMap = new Map();

// Add a function to identify if a connection is bot or turtle
// Have it return the map it's in

wss.on('connection', function connection(ws, req, client) {

	const conn = new URL(req.url, "http://" + req.headers.host);
	const search_params = conn.searchParams;

	ws.id = search_params.get('id');

	// Sort the input bot and output bots
	if (search_params.get('bot') === "true" && botMap.size === 0) {
		botMap.set(ws.id, ws);
		console.log(`Added Bot#${ws.id}`);
	} else if (search_params.get('bot') === 'false' && ws.id) {
		if (!(turtleMap.get(ws.id))) {	
			turtleMap.set(ws.id, ws);
			console.log(`Added Turtle#${ws.id}`);
		};
	} else {
		console.log(`Connection#${ws.id} already in system.`);
	};

	ws.on('message', function incoming(message) {

		if (botMap.has(ws.id) && turtleMap.size > 0) { // Bot case
			const [[receiverId, receiverBot]] = turtleMap
			
			let direction = message.split(/ +/);
			const action = direction.shift().toLowerCase();

			const [[botId, bot]] = botMap

			console.log(direction.length);
			if (direction.length === 0) {
				direction = 'forward';
			} else {
				direction = direction.shift().toLowerCase();
			};

			switch(action) {
				case 'move':
					if (moveDirections.includes(direction)) {
						receiverBot.send(JSON.stringify({
							"action": action,
							"direction": direction
						}));

						console.log(`Sent action: ${action} ${direction} to Turtle#${receiverId}`);

					} else {
						bot.send('Not a valid direction.');
					};
				break;
				case 'dig':
					if (digDirections.includes(direction)) {
						receiverBot.send(JSON.stringify({
							"action": action,
							"direction": direction
						}));
						console.log(`Sent action: ${action} ${direction} to Turtle#${receiverId}`);
					} else {
						bot.send('Not a valid direction');
					};
				break;
			};
			//receiverBot.send(message);
		} else {
			ws.send('Do not have permission to send input.');
			return;
		};

	});

	ws.send(`Your id: ${ws.id}`);

	ws.on('close', () => {
		console.log(`Connection closed by #${ws.id}`);

		// Shorten this for the function -7/6/2021
		if (botMap.has(ws.id)) {
			botMap.delete(ws.id);
			console.log(`Connection closed by Bot${ws.id}`);
		} else if (turtleMap.has(ws.id)) {
			turtleMap.delete(ws.id);
			console.log(`Connection closed by Turtle#${ws.id}`);
		};
	});

});





// FORMAT OF TURTLE ACTION
//
// ws.send(JSON.stringify({
// 	"action": "test",
// 	"direction": "dir"
// }));
//
// CCBot.lua will ONLY accept in this format.