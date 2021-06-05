module.exports = {
	name: 'user-info',
	description: 'user-info!',
	usage: '<user>',
	cooldown: 5,
	execute(message, args) {
		//dysplay user info
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	},
};