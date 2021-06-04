const fetch = require('node-fetch');
const { key } = require('../../config.json');
module.exports = {
	name: 'hypixelkey',
	description: 'says if the bot has sucessfully connected to hypixel',
	cooldown: 60,
	notes: 'This command may take a second or be buggy, so keep that in mind. Also, you can\'t request the same player multiple times in a minuite',
	async execute(message, args) {
        const json = await fetch(`https://api.hypixel.net/key?key=${key}`).then(response => response.json());

		message.channel.send(json.success);
	},
};