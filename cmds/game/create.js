module.exports = {
    name: "create",
    module: "game",
    desc: "Create a new game!\n\ncount players - Count players from 1 to 10. Default to 5\nCount impostors from 1 to 3. Default to 1.",
    usage: "[count players] [count impostors]",
    run(message, args, client) {
        const y = [true, false]
        const pick = y[Math.floor(Math.random() * y.length - 1)]
        const {onlyName, colors} = require("./../../structure.json")
        const pickColor = onlyName[Math.floor(Math.random() * onlyName.length - 1)]
        if(client.game.has(message.guild.id)) return message.channel.send("It looks like the game is already started. You may stop the game using `a!stop`")
        const impostor = args[1] || 1
        const players = args[0] || 5
        const json = {
            players: players,
            impostors: impostor,
            avaliableI: y ? impostor - 1 : impostor,
            avaliableP: players - 1,
            started: false,
            id: {
                msg: null,
                channel: null
            },
            users: [{
                id: message.author.id,
                color: pickColor,
                isImpostor: pick
            }]
        }
        client.game.set(message.guild.id, json)
        message.channel.send("The game has created! Make sure your DM is open or it won't work at all!")
        const e = new client.Embed()
        .setTitle("Game Created!")
        .setColor("GREEN")
        .setDescription("The game just created! To join in a game, use `a!join` to join!")
        .setTimestamp()
        .addField(colors[2][json.users[0].color], message.member.displayName || message.author.username, true)
        message.channel.send(e).then(msg => {
            client.game.set(`${message.guild.id}.id`, {msg: msg.id, channel: msg.channel.id})
        })
    }
}