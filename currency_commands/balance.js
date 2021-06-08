module.exports = {
	name: 'balance',
	description: 'dysplayies a users balance',
	async execute(message, input, currency) {
		const target = message.mentions.users.first() || message.author;
		return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
	},
};