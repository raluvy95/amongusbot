module.exports = {
    name: "stop",
    desc: "Stop the game",
    requireAuth: true,
    run(message, args, client) {
        client.game.delete(message.guild.id)
        message.channel.send("The game has been stopped! All players are left!")
    }
}