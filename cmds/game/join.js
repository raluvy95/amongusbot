module.exports = {
    name: "join",
    module: "game",
    requireAuth: true,
    run(message, args, client) {
        const c = require("./../../structure.json").colors[2]
        const game = client.game.get(message.guild.id)
        if(game.users.find(m => m.id == message.author.id)) return message.channel.send("You already joined the game!")
        const pickColor = game.avaliableC[Math.floor(Math.random() * game.avaliableC.length - 1)]
        game.avaliableC.splice(onlyName.find(m => m == pickColor), 1)
        if (game.started) return message.channel.send("It looks like you can't join the game who already started")
        if (game.avaliableP == 0) return message.channel.send("You can't join because the game has full players")
        let chanceImpostor = true
        if (game.avaliableI) {
            const pick = [true, false]
            chanceImpostor = pick[Math.floor(Math.random() * pick.length - 1)]
            if (chanceImpostor) game.avaliableI--
        }
        game.avaliableP--
        game.users.push({
            id: message.author.id,
            name: message.author.username,
            color: pickColor,
            isImpostor: chanceImpostor,
            isDead: false
        })
        client.game.set(message.guild.id, game)
        message.delete()
        client.channels.fetch(game.id.channel).then(msg => {
            msg.messages.fetch(game.id.msg).then(m => {
                const e = new client.Embed(m.embeds[0])
                .setColor("GOLD")
                .setTitle("Player joined!")
                .addField(`${c[pickColor]} ${message.author.username}`, "CREWMATE")
                m.edit(e)
            })
        })
    }
}