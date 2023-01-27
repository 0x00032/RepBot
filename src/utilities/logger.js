const { bgBlueBright, bgRedBright, bgYellowBright } = require("chalk");// Chalk imports

function info(message) {
    console.log(bgBlueBright("[INFO]") + " " + message) // Info Logger
}

function error(message) {
    console.log(bgRedBright("[ERROR]") + " " + message) // Error Logger
}

function warning(message) {
    console.log(bgYellowBright("[WARNING]") + " " + message) // Warning Logger
}

module.exports = { // Exporting Each Logger For use as client.logger
    info,
    error,
    warning
}