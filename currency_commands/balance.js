module.exports = {
	name: 'balance',
	description: 'shows a users balance',
	usage: '<user>',
	async execute(message, commandArgs, currency, client) {
		const target = message.mentions.users.first() || message.author;
		return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
	},
};