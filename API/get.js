(() => {

    const config = require(`../config`);
    const site_creds = require(`../credentials`);

    class Get {
        
        //init
        constructor() {
            console.log('Loaded API.get.js');
        }


        getStrikes = async (name) => {
            let fromDate = new Date().toISOString().substring(0, 10);
            const request_url = site_creds.website_url + `/api/penalty/list?name=${name}&isStrike=true&from=${fromDate}`;
            const res = await fetch(request_url);
            if (!res.status === 200) {
                return false;
            } else {
                return res.json();
            }
        };

        checkNames = async (names) => {
            let names_list = []
            for (const name of names) {
                const request_url = site_creds.website_url + `/api/player?name=${name}`;
                const res = await fetch(request_url);
                if (!res.status === 200) {
                    names_list.push(false)
                } else {
                    const playerData = await res.json()
                    names_list.push(playerData.name)
                }
            }
            return names_list
        };

        getPlayer = async (name, season = config.season) => {
            const request_url = site_creds.website_url + `/api/player?name=${name}&season=${season}`;
            const res = await fetch(request_url);
            if (!res.status === 200) {
                return false;
            } else {
                return res.json();
            }
        };

        getPlayerFromMKC = async (mkcid, season = config.season) => {
            const request_url = site_creds.website_url + `/api/player?mkcId=${mkcid}&season=${season}`;
            const res = await fetch(request_url);
            if (!res.status === 200) {
                return false;
            } else {
                return res.json();
            }
        };

        getPlayerFromFC = async (fc, season = config.season) => {
            const request_url = site_creds.website_url + `/api/player?fc=${fc}&season=${season}`;
            const res = await fetch(request_url);
            if (!res.status === 200) {
                return false;
            } else {
                return res.json();
            }
        };

        getPlayerFromDiscord = async (discordid, season = config.season) => {
            const request_url = site_creds.website_url + `/api/player?discordId=${discordid}&season=${season}`;
            const res = await fetch(request_url);
            if (!res.status === 200) {
                return false;
            } else {
                return res.json();
            }
        };

        getPlayerInfo = async (name, season = config.season) => {
            const request_url = site_creds.website_url + `/api/player/details?name=${name}&season=${season}`;
            const res = await fetch(request_url);
            if (!res.status === 200) {
                return false;
            } else {
                return res.json();
            }        };

        getTable = async (tableID) => {
            const request_url = site_creds.website_url + `/api/table?tableId=${tableID}`;
            const res = await fetch(request_url);
            if (!res.status === 200) {
                return false;
            } else {
                return res.json();
            }
        };

    }

    module.exports = new Get()

})();