const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("test-embed")
        .setDescription("Embed moment"),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle(`This is an EMBED, unsurprisingly`)
            .setDescription(`This is a dope embed right?`)
            .setColor(0x18e1ee)
            .setImage(client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp(Date.now())
            .setAuthor({
                url: `https://e621.net/`,
                iconURL: interaction.user.displayAvatarURL(),
                name: interaction.user.tag
            })
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.tag
            })
            .setURL(`https://e926.net/`)
            .addFields([
                {
                    name: `Field 1`,
                    value: `an awesome fieldvalue`,
                    inline: true
                },
                {
                    name: `Field 2`,
                    value: `yet another awesome fieldvalue`,
                    inline: true
                }
            ])

            await interaction.reply({
                embeds: [embed]
            })
    },
};