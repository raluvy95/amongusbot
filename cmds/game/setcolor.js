const {colors} = require("./../../structure.json")
module.exports = {
    name: "setcolor",
    desc: "Set your character's color",
    requireAuth: true,
    module: "game",
    run(message, args, client) {
        if(!args[0]) return message.channel.send("You need to choose which color you want to pick")
        const u = client.game.get(message.guild.id)
        const user = u.users.find(r => r.id == message.author.id)
        if(!colors[0][args[0].toLowerCase()] || !colors[1][args[0]]) {
            return message.channel.send("Invalid color, please try again").then(r => r.delete({timeout: 2000}))
        }
        user.color = colors[0][args[0].toLowerCase()] || colors[1][args[0]]
        u.users.splice(u.user.findIndex(r => r.id == message.author.id), 1)
        u.users.push(user)
        client.game.set(`${message.guild.id}.users`, u.users)
        message.delete()
    }
}