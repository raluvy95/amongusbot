module.exports = async (client) => {
    const colors = require("./../structure.json").onlyName
    setInterval(() => {
        const pickC = Math.floor(Math.random() * colors.length - 1)
        client.user.setActivity(`${colors[pickC]} kinda sus | a!help`)
    }, 20000)
    console.log("I am ready")
}