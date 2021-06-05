module.exports = {
	name: 'avatar',
	description: 'avatar!',
	usage: '<user>',
	cooldown: 5,
	aliases: ['icon', 'pfp'],
	execute(message, args) {
		
		//check if any users were mentioned, and if they weren't, return the author's avatar
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
		}
		
		//get the avatars of all mantioned users
		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s avatar: <${user.displayAvatarURL({ format: "png", dynamic: true })}>`;
		});
		
		//send the array as a list
		message.channel.send(avatarList);
	},
};