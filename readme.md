# Discord URL Shortener Bot

This is a simple Discord bot that can shorten URLs using the [TinyURL API](https://tinyurl.com/app/dev). It also has a help command that provides instructions on how to use the `/shorten` command.

## Installation

1. Clone the repository: `git clone https://github.com/daveonHMD/discord-url-shortener-bot.git`
2. Navigate to the project directory: `cd discord-url-shortener-bot`
3. Install the dependencies: `npm install`
4. Rename `.env.example` to `.env` and add your Discord bot token and Infinity Bots API token.
5. Start the bot: `node index.js`

## Usage

1. Invite the bot to your Discord server using your bot client ID
2. Use the `/shorten` command to shorten a URL: `/shorten <url>`. Example: `/shorten example.com` (do not add `https://`)
3. Use the `/help` command to get help with the `/shorten` command: `/help`

## Dependencies

- [discord.js](https://github.com/discordjs/discord.js) - Discord API library
- [node-fetch](https://github.com/node-fetch/node-fetch) - A light-weight module that brings `window.fetch` to Node.js
- [express](https://github.com/expressjs/express) - Fast, unopinionated, minimalist web framework for Node.js
- [@discordjs/builders](https://github.com/discordjs/builders) - A command builder for Discord.js v13
- [discord-api-types](https://github.com/discordjs/discord-api-types) - TypeScript types for Discord API
- [@infinitybots/autoposter](https://github.com/InfinityBotList/infinity-libs/tree/master/packages/autoposter) - An autoposter for Infinity Bot List API
