(() => {
    const config = require(`../config`);
    const site_creds = require(`../credentials`);
    const client = require(`../main`);
    const API_get = require(`../API/get`);

    class Stats {
        
        //init
        constructor() {
            this.prefix = config.prefix
            this.client = client
        }

        check_name = async (name = null, id, display_name, season = config.season) => {
            let player
            if (name === null) {
                player = await API_get.getPlayerFromDiscord(id, season);
                if (player === false) {
                    player = await API_get.getPlayer(display_name, season);
                }
            } else if (isNaN(name) === false) {
                if (17 <= name.length) {
                    player = await API_get.getPlayerFromDiscord(name, season);
                } else {
                    player = await API_get.getPlayerFromMKC(name, season);
                }
            } else if (isNaN(name.replace("-", "")) === false) {
                player = await API_get.getPlayerFromFC(name, season);
            } else {
                player = await API_get.getPlayer(name, season);
            }

            return player
        };


        handler = async message => {
            if (message.author.bot) {
                return
            }

            if (!message.content.startsWith(this.prefix)) {
                return
            }

            if (message.content.startsWith(`${this.prefix}mmr`)) {
                const player_name = message.content.split(" ")[1];
                const player = await this.check_name(player_name, message.author.id, message.author.display_name);
                if (player === false) {
                    await message.channel.send("This player can't be found on the site!");
                }
                const embed = {
                    title: 'S7 MMR',
                    url: `${site_creds.website_url}/PlayerDetails/${player.id}`,
                    fields: [
                        {
                            name: player.name,
                            value: player.mmr
                        }
                    ]
                };
                await message.channel.send({ embeds: [embed] });

            }
        }

    }

    const name = 'messageCreate';
    const handler = new Stats().handler
    module.exports = { name, handler };
    
})();