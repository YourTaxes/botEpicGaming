module.exports = {
	name: 'beep',
	description: 'boop!',
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Boop.');
	},
};