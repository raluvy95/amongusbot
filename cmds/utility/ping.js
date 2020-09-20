module.exports = {
    name: "ping",
    module: "utility",
    run(message, args, client) {
       message.channel.send("Pong!") 
    }
}