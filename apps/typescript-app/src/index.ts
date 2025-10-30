import process from "node:process";

import { closeDb, connectToDb } from "@org/mongodb/client";

import { getGreet } from "./module.js";

async function main() {
	const greet = getGreet(process.env.USER);
	console.log(greet);
	await connectToDb(process.env.DB_NAME!);
}

process.on("uncaughtException", async (err) => {
	console.error(err);
	await closeDb();
	process.exitCode = 1;
});

setInterval(async () => {
	await main();
}, 10000);

export default main;
