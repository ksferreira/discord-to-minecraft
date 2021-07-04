const WebSocket = require('ws');
const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

const ws = new WebSocket('http://localhost:8080?bot=true&id=8080');

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

		message.channel.send(`args: ${args}`);
		message.channel.send(`command: ${command}`);

		if (!client.commands.has(command)) return;

		console.log(transfer_copy);
		

		ws.send(transfer_copy);
	});
	ws.send('discord hello.')
});

ws.on('message', () => {
	
});

client.login(process.env.TOKEN);