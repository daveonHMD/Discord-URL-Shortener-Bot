const chalk = require('chalk');
const moment = require('moment');

module.exports = class InfinityLogger {

    static log (content = "", type = "log") {

        const date = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;

        switch (type) {

            case "log": {
                return console.log(`[Infinity Logger - LOG] - Date: ${chalk.gray(date)}\nType: ${chalk.black.bgBlue(type.toUpperCase())}\nMessage: ${content}`);
            }

            case "warn": {
                return console.log(`[Infinity Logger - WARN] - Date: ${chalk.gray(date)} | Type: ${chalk.black.bgYellow(type.toUpperCase())} | Message: ${content}`);
            }

            case "error": {
                return console.log(`[Infinity Logger - ERROR] - Date: ${chalk.gray(date)} | Type: ${chalk.black.bgRed(type.toUpperCase())} | Message: ${content}`);
            }

            case "debug": {
                return console.log(`[Infinity Logger - DEBUG] - Date: ${chalk.gray(date)} | Type: ${chalk.black.bgGreen(type.toUpperCase())} | Message: ${content}`);
            }

            case "cmd": {
                return console.log(`[Infinity Logger - CMD] - Date: ${chalk.gray(date)} | Type: ${chalk.black.bgWhite(type.toUpperCase())} | Message: ${content}`);
            }

            case "event": {
                return console.log(`[Infinity Logger - EVENT] - Date: ${chalk.gray(date)} | Type: ${chalk.black.bgWhite(type.toUpperCase())} | Message: ${content}`);
            }

            case "ready": {
                return console.log(`[Infinity Logger - READY] - Date: ${chalk.gray(date)} | Type: ${chalk.black.bgBlueBright(type.toUpperCase())} | Message: ${content}`);
            }

            default: throw new TypeError('[Infinity Logger] Logger Type should be one of: "warn", "debug", "log", "ready", "cmd" or "error"');
        }

    }
};