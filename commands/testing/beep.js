module.exports = {
	name: 'beep',
	description: 'boop!',
	cooldown: 5,
	execute(message, args) {
		//boop
		message.channel.send('Boop.');
	},
};