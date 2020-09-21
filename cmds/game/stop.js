module.exports = {
    name: "stop",
    desc: "Stop the game",
    requireAuth: true,
    run(message, args, client) {
        game = client.game.get(message.guild.id)
        client.channels.fetch(game.id.channel).then(msg => {
            msg.messages.fetch(game.id.msg).then(m => {
                const e = new client.Embed(m.embeds[0])
                .setColor("RED")
                .setTitle("Game Stopped!")
                .setDescription(`${message.author.tag} stopped the game.`)
                m.edit(e)
            })
        })
        client.game.delete(message.guild.id)
        message.channel.send("The game has been stopped! All players are left!")
        
    }
}