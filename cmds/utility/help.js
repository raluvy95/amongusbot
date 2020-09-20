const fs = require("fs")
module.exports = {
    name: "help",
    module: "utility",
    run(message, args, client) {
        const e = new client.Embed()
        if(!args[0]) {
            fs.readdir("./cmds", (err, file) => {
                e.setTitle("List of Commands")
                .setDescription(`Avaliable commands: ${client.cmds.size}`)
                .setColor("RANDOM")
                for(const f of file) {
                    e.addField(f.toUpperCase(), client.cmds.filter(m => m.module == f)
                    .map(r => `\`${r.name}\``).join(", "))
                }
                return message.channel.send(e)
            })
        } else {
            if(!client.cmds.has(args[0])) return message.channel.send("The command you're looking for is not found.")
            const cmd = client.cmds.get(args[0])
            e.setDescription(`The command is ${cmd.name} which contains some cool features`)
            .setColor("RANDOM")
            return message.channel.send(e)
        }
    }
}