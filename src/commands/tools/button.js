const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test-button")
    .setDescription("Returns a button... obviously"),
  async execute(interaction, client) {
    const button = new ButtonBuilder()
        .setCustomId('example-button')
        .setLabel(`Click Me! (free gay)`)
        .setStyle(ButtonStyle.Primary);

    await interaction.reply({
        components: [new ActionRowBuilder().addComponents(button)]
    });
  },
};
