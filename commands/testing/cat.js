const fetch = require('node-fetch');
module.exports = {
	name: 'cat',
	description: 'gives a random picture of a cat',
	cooldown: 1,
	notes: 'This command may take a second or be buggy, so keep that in mind.',
	async execute(message, args) {
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
		message.channel.send(file);
	},
};