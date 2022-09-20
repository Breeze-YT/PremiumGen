const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms")
module.exports = {
    name: "lockdown",
    description: "Start OR stop a lockdown for a channel",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "mode",
            description: "ON or OFF",
            type: 3,
            required: true
        },
        {
            name: "channel",
            description: "Select a channel to change lockdown",
            type: 6,
            required: true
        },
    ],

    run: async (client, interaction, args, con) => {
        const { guild } = interaction

        // Arguments
        let mode = args[0]
        let channel = args[0]

        interaction.reply('Mode:', mode)
        
    },
};