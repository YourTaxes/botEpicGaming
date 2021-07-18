const { Users, CurrencyShop } = require('../dbObjects');
const { Op } = require('sequelize');
module.exports = {
	name: 'buy',
	description: 'used to buy an item',
    args: true,
    usage: "<item>",
	async execute(message, commandArgs, currency, client) {

		const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
		if (!item) return message.channel.send('That item doesn\'t exist.');
		if (item.cost > currency.getBalance(message.author.id)) {
			return message.channel.send(`You don't have enough currency, ${message.author}`);
		}
		const user = await Users.findOne({ where: { user_id: message.author.id } });
		if (commandArgs === "Bot User Rank") {
			if (user.rank) {
				return message.channel.send("You already have the rank.");
			}
			const role = message.guild.roles.cache.find(role => role.name === 'Bot User');
			currency.add(message.author.id, -50);
			await message.member.roles.add(role);
			user.rank = true;
			await user.save();
			return message.channel.send(`${message.author} has gotten the bot user rank!`);
		}
		currency.add(message.author.id, -item.cost);
		await user.addItem(item);

		message.channel.send(`You've bought a ${item.name}`);
		console.log(user.rank);
	},
};