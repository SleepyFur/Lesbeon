module.exports = {
    data: {
        name: `testmenu`
    },
    async execute(interaction, client) {
        await interaction.reply({
            content: `You selected ${interaction.values[0]}`,
        });
    },
};