module.exports = {
	name: 'open',
	description: 'sends a message telling everyone that you are open',
    guildOnly: true,
    args: true,
    usage: '<games or things you are open to do>',
    notes: `anything after the command will be put in the blank for "is open for _______", so make sure to put "and" when listing things.`,
	execute(message, args) {
		//sends the mesage
        message.channel.send(`@everyone, ${message.author} is open for ${args.join(' ')}.`);
	},
};