module.exports = async (client, info) => {
    if(info.includes("Heartbeat")) return;
    console.log(info);
}