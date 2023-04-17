const { Client, Intents, MessageEmbed } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');
const express = require('express')
const { InfinityAutoPoster } = require('@infinitybots/autoposter')
const app = express()

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = '1094827870737674311';
const rest = new REST({ version: '9' }).setToken(TOKEN);



const commands = [
  new SlashCommandBuilder()
    .setName('shorten')
    .setDescription('Shorten a URL')
    .addStringOption(option => option.setName('url').setDescription('The URL to shorten').setRequired(true))
    .toJSON(),
  new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get help with the `/shorten` command')
    .toJSON()
];

(async () => {
  try {
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
  }
})();

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log('Bot is online!');
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({
    status: 'online',
    activity: {
      name: `👥 ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Members`,
      type: 'WATCHING',
    }
  });
});


client.on('error', error => {
  if (error.code === 'ECONNRESET') {
    console.error('Connection to Discord lost. Timeout error.');
    // send a message to a logging channel or to the bot owner's DMs
    // indicating that the bot is currently experiencing a timeout error
  } else {
    console.error(error);
    console.log('Bot is running smoothly.');
    // send a message to a logging channel or to the bot owner's DMs
    // indicating that the bot is running smoothly
  }
});

const poster = InfinityAutoPoster(process.env.INFBOTLIST_TOKEN, client)

poster.on('posted', (stats) => {

  console.log(`Posted stats to the Infinity Bot List API | ${stats.servers} servers | at https://infinitybots.xyz/bot/${client.user.username}`)

});


client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'shorten') {
    const url = interaction.options.getString('url');
    const protocolRegex = /^https?:\/\//i;
    const normalizedUrl = protocolRegex.test(url) ? url : `https://${url}`;

    if (!protocolRegex.test(normalizedUrl)) {
      const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Error')
        .setDescription(`"${url}" is not a valid URL. Please enter a valid URL to shorten.`);
      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }

    const response = await fetch(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(normalizedUrl)}`);
    const data = await response.text();

    if (response.ok) {
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Shortened URL')
        .setThumbnail('https://mediashare.ink/img/TinyURLBot.png')
        .setURL(data)
        .setAuthor('tinyurl.com', 'https://mediashare.ink/img/TinyURLBot.png', 'http://tinyurl.com/')
        .setDescription(`Here's your shortened link: ${data}`);
      await interaction.reply({ embeds: [embed] });
    } else {
      await interaction.reply('An error occurred while shortening the URL. (do not add `https://`)');
    }
  } else if (interaction.commandName === 'help') {
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setThumbnail('https://mediashare.ink/img/TinyURLBot.png')
      .setTitle('Help: Shorten URL')
      .setDescription('Use the `/shorten` command to shorten a URL.')
      .addFields(
  { name: 'Usage', value: '`/shorten <url>`' },
  { name: 'Example', value: '`/shorten example.com` (do not add `https://`)' }
);
    await interaction.reply({ embeds: [embed] });
  }
});

client.on('message', message => {
  if (message.content === `<@!${client.user.id}>`) {  
    message.channel.send(`Use the \`${client.user.username} shorten <url>\` command to shorten a URL. Example: \`${client.user.username} shorten example.com\` (do not add \`https://\`)`);
  }
});


client.login(TOKEN);


app.get('/', function(req, res) {
  const botId = client.user.id; // Retrieve the bot's ID
  const guilds = Array.from(client.guilds.cache.values()); // Convert the guilds collection to an array
  let totalMembers = 0; // Initialize totalMembers to 0

  // Loop through each guild and add the memberCount property to totalMembers
  for (let i = 0; i < guilds.length; i++) {
    totalMembers += guilds[i].memberCount;
  }

  // Create an HTML string that displays the retrieved information
  const html = `
    <html>
      <head>
        <style>
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
            padding: 5px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <h1>Discord Bot Information</h1>
        <table>
          <tr>
            <th>Bot ID:</th>
            <td>${botId}</td>
          </tr>
          <tr>
            <th>Server Lists:</th>
            <td>
              <ul>
                ${guilds.map(guild => `<li>${guild.name} (ID: ${guild.id})</li>`).join('')}
              </ul>
            </td>
          </tr>
          <tr>
            <th>Total Members:</th>
            <td>${totalMembers}</td>
          </tr>
        </table>
      </body>
    </html>
  `;

  // Send the HTML string as a response
  res.send(html);
});






app.listen(3000)