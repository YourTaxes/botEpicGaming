module.exports = {
    name: 'setCurrency',
    description: 'set a user\'s balance',
    dev: true,
    usage: '<amount> <user>',
    async execute(message, commandArgs, currency, client) {
        const transferAmount = commandArgs.split(/ +/).find(arg => !/<@!?\d+>/.test(arg));
        const transferTarget = message.mentions.users.first() || message.author;

        if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount`);
        //if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}`);

        try {
            const user = currency.get(transferTarget.id);
            if (user) {
                user.balance = Number(transferAmount);
                user.save();
            }
        } catch (error) {
            message.reply('You need to tag a user to to transfer to');
            console.error(error);
        }

        return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}.`);
    },
};