const { Users } = require('../dbObjects.js')

module.exports = {
	name: 'inventory',
	description: 'shows a users inventory',
	async execute(message, input, currency, client) {
		const target = message.mentions.users.first() || message.author;
		    const user = await Users.findOne({ where: { user_id: target.id } });
		    const items = await user.getItems();

		    if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
		    return message.channel.send(`${target.tag} currently has ${items.map(t => `${t.amount} ${t.item.name}`).join(', ')}`);
	},
};