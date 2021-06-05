module.exports = {
	name: 'dev',
	description: 'checks if you have the dev role',
    cooldown: 5,
	//the dev tag makes a command only avalable to people that have the bot dev role, specified in the config file
    dev: true,
	execute(message, args) {
        //tells you that you have the role
		message.reply("you have the role");
	},
};