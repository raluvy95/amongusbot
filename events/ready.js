module.exports = async (client) => {
    const colors = ["Red", "Orange", "Yellow", "Green",
     "Cyan", "Blue", "Pink", "Purple",
    "Black", "White"]
    setInterval(() => {
        const pickC = Math.floor(Math.random() * colors.length - 1)
        client.user.setActivity(`${colors[pickC]} kinda sus | a!help`)
    }, 20000)
    console.log("I am ready")
}