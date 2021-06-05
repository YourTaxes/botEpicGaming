module.exports = {
	name: 'ping',
	description: 'Ping!',
	execute(message, args) {
		
		//it just says pong
		//nothing else
		//doesn't dysplay your ping or something useful like that
		//nope
		//just pong

		message.channel.send('Pong.');
	},
};