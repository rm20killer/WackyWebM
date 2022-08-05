const discord = require("discord.js");
const {ActivityType } = require('discord.js');
module.exports = {
    async execute(client) {
        const guild = client.guilds.cache.get("631448500902559744");
        const statusUpdated = async (client) => {
            //fetch members count
            var memberCount = guild.memberCount;
            client.user.setPresence({
                activites: [
                    {
                        name: `with ${memberCount} amazing people`,
                        type: ActivityType.Playing
                    }
                ],
            })
            console.log("status updated");
            setTimeout(statusUpdated, 1000 * 60);
        };
        statusUpdated(client);
    },
};

