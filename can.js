const fetch = require('node-fetch');

const WebSocket = require('ws');

const { SNIPER_GUILD_ID, URL_SNIPER_SELF_TOKEN, SNIPER_SELF_TOKEN, WEBHOOKS } = require('./ss');

const guilds = {};

 

class Sniper {

  constructor() {

    this.socket = new WebSocket('wss://gateway.discord.gg/?v=10&encoding=json');

 

    this.socket.on('open', async () => {

      const identifyPayload = {

        op: 2,

        d: {

          token: SNIPER_SELF_TOKEN,

          intents: 513,

          properties: { os: 'macos', browser: 'Safari', device: 'MacBook Air' },

        },

      };

        

      this.socket.send(JSON.stringify(identifyPayload));

 

      this.socket.on('message', async (message) => {

        const data = JSON.parse(message);

 

        if (data.t === 'GUILD_UPDATE') {

          const find = guilds[data.d.guild_id];

 

          if (find?.vanity_url_code && find.vanity_url_code !== data.d.vanity_url_code) {

            const startTime = Date.now();

 

            try {

              const res = await fetch(`https://discord.com/api/v10/guilds/${SNIPER_GUILD_ID}/vanity-url`, {

                method: 'PATCH',

                body: JSON.stringify({ code: find.vanity_url_code }),

                headers: { Authorization: URL_SNIPER_SELF_TOKEN, 'Content-Type': 'application/json' },

              });

 

              const endTime = Date.now();

              const snipeTime = endTime - startTime;

 

              const successMessage = `@everyone Successfully sniped vanity URL: \`https://discord.gg/${find.vanity_url_code}\` in ${snipeTime}ms.`;

              const errorMessage = `@everyone Error while sniping URL: \`${find.vanity_url_code}\` in ${snipeTime}ms.\n\`\`\`JSON\n${JSON.stringify(await res.json(), null, 4)}\n\`\`\``;

 

              await WEBHOOKS.SUCCESS(res.ok ? successMessage : errorMessage);

              delete guilds[data.d.guild_id];

            } catch (err) {

              console.log(err);

              delete guilds[data.d.guild_id];

            }

          }

        } else if (data.t === 'READY') {

          data.d.guilds

            .filter(e => typeof e.vanity_url_code === 'string')

            .forEach(e => (guilds[e.id] = { vanity_url_code: e.vanity_url_code }));

 

          const readyMessage = `connected.`;

          await WEBHOOKS.INFO(readyMessage);

        } else if (data.t === 'GUILD_CREATE') {

          guilds[data.d.id] = { vanity_url_code: data.d.vanity_url_code };

        } else if (data.t === 'GUILD_DELETE') {

          const find = guilds[data.d.id];

          setTimeout(async () => {

            if (find?.vanity_url_code) {

              const startTime = Date.now();

 

              try {

                const res = await fetch(`https://discord.com/api/v10/guilds/${SNIPER_GUILD_ID}/vanity-url`, {

                  method: 'PATCH',

                  body: JSON.stringify({ code: find.vanity_url_code }),

                  headers: { Authorization: URL_SNIPER_SELF_TOKEN, 'Content-Type': 'application/json' },

                });

 

                const endTime = Date.now();

                const snipeTime = endTime - startTime;

 

                const successMessage = `guild delete @everyone Successfully sniped vanity URL: \`${find.vanity_url_code}\` in ${snipeTime}ms.`;

                const errorMessage = `guild delete @everyone Error while sniping URL: \`${find.vanity_url_code}\` in ${snipeTime}ms.\n\`\`\`JSON\n${JSON.stringify(await res.json(), null, 4)}\n\`\`\``;

 

                await WEBHOOKS.SUCCESS(res.ok ? successMessage : errorMessage);

                delete guilds[data.d.guild_id];

              } catch (err) {

                console.log(err);

                delete guilds[data.d.guild_id];

              }

            }

          }, 50);

        }

      });

 

      this.socket.on('close', () => process.exit());

      this.socket.on('error', (error) => {

        console.log(error);

        process.exit();

      });

    });

  }

}

 

module.exports = Sniper;