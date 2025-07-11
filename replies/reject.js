module.exports = {
    async execute(interaction) {
        await interaction.deferUpdate()
        await interaction.deleteReply()
    }
}