module.exports = {
	name: 'dev',
	description: 'checks if you have the dev role',
    cooldown: 5,
    dev: true,
	execute(message, args) {
        message.reply("you have the role");
	},
};