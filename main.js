const commands = require('./src/commands');

const fs = require('fs'); 
const unqmod = require('./unqfy'); 
const { UNQfy } = require('./unqfy');

function getUNQfy(filename = 'data.json') {
	let unqfy ;
	if (fs.existsSync(filename)) {
        unqfy = unqmod.UNQfy.load(filename);
	}
    else {
        unqfy = new unqmod.UNQfy();
    }
	return unqfy;
}

function saveUNQfy(unqfy, filename = 'data.json') {
	unqfy.save(filename);
}

async function main() {
	const unqfy = getUNQfy()
	
    consoleMethod = process.argv[2]
	consoleArgs = process.argv.slice(3)
	
	const command = commands[consoleMethod];
	await command.executeMethod(consoleArgs, unqfy);
	
	saveUNQfy(unqfy);
}

main();

module.exports = {getUNQfy, saveUNQfy};