module.exports = {
    name: "start",
    module: "game",
    requireAuth: true,
    run(message, args, client) {
        if(client.game.get(message.guild.id).started) return message.channel.send("It looks like the game is already started. You may try again with `a!stop` to stop the game")
        client.game.set(`${message.guild.id}.started`, true)
        const ID = client.game.get(`${message.guild.id}.id`)
        client.channels.fetch(ID.channel).then(c => {
            c.messages.fetch(ID.msg).then(msg => {
                const e = new client.Embed(msg.embeds[0])
                .setTitle("Game Started!")
                .setDescription("The game just started, now complete the tasks to win! No more accept new players.")
                .setTitle("LIME")
                msg.edit(e)
            })
        })
    }
}