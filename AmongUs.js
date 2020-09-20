const { default: Collection } = require("@discordjs/collection");
const { Client, MessageEmbed } = require("discord.js");
const db = require("quick.db")
class AmongUs extends Client {
    constructor() {
        super({disableMentions: "everyone", shards: "auto"})
        this.Embed = MessageEmbed
        this.cmds = new Collection()
        this.cooldowns = new Collection()
        this.prefix = "a!"
        this.game = new db.table("game")
    }
}
module.exports = AmongUs