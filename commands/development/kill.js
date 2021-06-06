module.exports = {
	name: 'kill',
	description: 'kills the bot',
    cooldown: 5,
	//the dev tag makes a command only avalable to people that have the bot dev role, specified in the config file
    dev: true,
	execute(message, args) {
        //tells you that you have the role
		process.exit();
	},
};