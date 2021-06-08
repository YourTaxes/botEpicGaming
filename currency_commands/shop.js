const { CurrencyShop } = require('../dbObjects')
module.exports = {
	name: 'shop',
	description: 'shows the shop',
	async execute(message, commandArgs, currency, client) {
        const items = await CurrencyShop.findAll();
		return message.channel.send(items.map(i => `${i.name}: ${i.cost}💰`).join('\n'), { code: true });
	},
};