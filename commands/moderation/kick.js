module.exports = {
	name: 'kick',
	description: 'You can use this command to pretend to kick a member from the server, It doesn\'t actually work.',
	args: true,
	usage: '<user>',
	guildOnly: true,
	cooldown: 5,
	execute(message, args) {
		//check if you have tagged a user
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		//gets the tagged user
		const taggedUser = message.mentions.users.first();

		//says who you wanted to kick
		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	},
};