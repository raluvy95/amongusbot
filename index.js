require("dotenv").config()
const Discord = require("discord.js")
const AmongUs = require("./AmongUs");
const requireAll = require("require-all")
const client = new AmongUs()
const fs = require("fs");
const { on } = require("process");
const files = requireAll({
    dirname: `${__dirname}/events`,
    filter: /^(?!-)(.+)\.js$/
});

client.removeAllListeners();
for (const name in files) {
    const event = files[name];
    client.on(name, event.bind(null, client));
    console.log(`Event loaded: ${name}`);
}

const modules = fs.readdirSync("./cmds")
    .filter(m => !m.startsWith("_"))
for (const m of modules) {
    const c = fs.readdirSync(`./cmds/${m}/`)
        .filter(f => !f.startsWith("_"))
    for (const cmds of c) {
        try {
            const command = require(`./cmds/${m}/${cmds}`)
            client.cmds.set(command.name, command)
            console.log(`${cmds} loaded!`)
        } catch (e) {
            console.error(`It looks like the command ${cmds} did an oppsie!\n${e}`)
            console.error("But other commands will continue loading")
            continue
        }
    }
}

client.on("message", message => {
    if (message.author.bot || message.channel.type !== "text") return;
    if (!message.content.startsWith(client.prefix)) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/)
    const cmdName = args.shift().toLowerCase()
    const command = client.cmds.get(cmdName) || client.cmds.find(m => m.aliases && m.aliases.includes(cmdName))
    if (!command) return
    if ((command.perm || command.permission || command.permissions) && !message.member.hasPermission(command.perm || command.permission || command.permissions)) return message.channel.send(`You don't have any permission for that!`)
    const owners = process.env.OWNERS
    if (command.owner && !owners.includes(message.author.id)) return;
    const now = Date.now();
    if(command.requireAuth) {
        if(!client.game.has(message.guild.id)) return message.channel.send("It looks like the game isn't create in this server. You may use `a!create` to create")
        const user = client.game.get(message.guild.id)
        if(!user.users.find(m => m.id == message.author.id) && command.name != "join") return message.channel.send("You didn't joined the game, use `a!join` to join!")
    }
    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection());
    }
    const timestamp = client.cooldowns.get(command.name);
    const ca = (command.cooldown || 1) * 1000;
    if (timestamp && timestamp.has(message.author.id)) {
        const et = timestamp.get(message.author.id) + ca;
        if (now < et) {
            const te = (et - now) / 1000;
            return message.reply(
                `Command is on cooldown! \`${te.toFixed(1)}\` seconds left!`
            ).then(msg => {
                msg.delete({timeout: 2000})
            });
        }
    }
    timestamp.set(message.author.id, now);
    setTimeout(() => {
        timestamp.delete(message.author.id);
    }, ca);
 //   try {
        command.run(message, args, client)
 //   } catch (e) {
    //    return message.channel.send(`It looks like the command did an oppsie\n${e}`)
 //   }
})

process.on("exit", () => {
    const tables = client.game.all()
    for(const y of tables.map(m => m.ID)) {
        client.game.delete(y)
    }
})
process.on("SIGINT", () => {
    console.log()
    process.exit()
})

client.login(process.env.SECRET)