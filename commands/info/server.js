module.exports = {
	name: 'server',
	description: 'server-info!',
	cooldown: 5,
	execute(message, args) {
		//dysplay all the server info
		message.channel.send(`This server's name is: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};