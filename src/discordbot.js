const WebSocket = require('ws');
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();

const ws = new WebSocket('ws://localhost:8080?bot=true&id=7370');

const prefix = "cc"

require('dotenv').config();

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
});

ws.on('open', () => {
	client.on('message', message => {
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		const transfer_copy = message.content.slice(prefix.length).trim();
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const transfer_cmd = args;
		
		const command = args.shift().toLowerCase();

		if (!(command === "dig" || command === "move")) return;

		console.log(transfer_copy);
		

		ws.send(transfer_copy);
	});
});

client.login(process.env.TOKEN);