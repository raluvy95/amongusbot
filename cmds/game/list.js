module.exports = {
    name: "list",
    module: "game",
    requireAuth: true,
    run: (message, args, client) => {
        const color = require("./../../structure.json").colors[2]
        const game = client.game.get(message.guild.id)
        const user = game.users.find(m => m.id == message.author.id)
        const e = new client.Embed()
        .setTitle(`Players - ${game.users.length}/${game.players}`)
        .setDescription(`Deaths: ${game.users.filter(m => m.isDead).length} | Impostors left: ${game.users.filter(m => !m.isDead && m.isImpostor).length}`)
        .setColor("RANDOM")
        for(const u of game.users) {
            isDM = message.channel.type == "dm"
            e.addField(`${color[u.color]} - ${u.name}`, user.isImpostor ? isDM ? u.isImpostor ? "IMPOSTOR" : "CREWMATE" : "CREWMATE" : "CREWMATE")
        }
        return message.channel.send(e)
    }
}