module.exports = {
    name: "kill",
    description: "Kill a crewmate",
    usage: "<crewmate's color>",
    requireAuth: true,
    impostorOnly: true,
    run(message, args, client) {
        if(!args[0]) return message.channel.send("Which crewmate should be killed? (must be color, not member's name)")
        const game = client.game.get(message.guild.id)
        const found = game.users.find(m => m.color == args[0].toLowerCase() && !m.isDead)
        if(!found) return message.author.send("The user's color you're searching for is not found.")
        found.isDead = true
        
    }
}