module.exports = {
	name: 'args-info',
	description: 'This command will repeat back the arguments you put in, only stacking up to 5.',
	args: true,
	usage: '<arguments>',
	execute(message, args) {
		if (args[0] === 'secret') {
			return message.channel.send('Wow, I didn\'t think you would try this, congrats for finding it.');
		}

		message.channel.send(`First argument: ${args[0]}`);
		
		if (args[1]) {
			message.channel.send(`Second argument: ${args[1]}`);
		}

		if (args[2]) {
			message.channel.send(`Third argument: ${args[2]}`);
		}

		if (args[3]) {
			message.channel.send(`Fourth argument: ${args[3]}`);
		}

		if (args[4]) {
			message.channel.send(`Fifth argument: ${args[4]}`);
		}
	},
};