//const fetch = require("node-fetch");
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson} = require('../lib/functions')
const { cmd } = require("../command");

// get pair 2

cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot", "freebot", "pair"],
    react: "✅",
    desc: "𝐀𝐍𝐔𝐖𝐇 𝐌𝐃 𝐅𝐑𝐄𝐄 𝐁𝐎𝐓 𝐏𝐀𝐈𝐑 𝐂𝐎𝐃𝐄",
    category: "download",
    use: ".pair +94760663XXX",
    filename: __filename
}, 
async (conn, mek, m, { from, prefix, quoted, q, reply }) => {
    try {
        // Helper function for delay
        const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

        // Validate input
        if (!q) {
            return await reply("*Example -* .pair +,94760663XXX");
        }

        // Fetch pairing code
        //const fetch = require("node-fetch");
        const response = await fetch(`pair?phone=${q}`);
        const pair = await response.json();

        // Check for errors in response
        if (!pair || !pair.code) {
            return await reply("Failed to retrieve pairing code. Please check the phone number and try again.");
        }

        // Success response
        const pairingCode = pair.code;
        const doneMessage = "> *𝐀𝐍𝐔𝐖𝐇 𝐌𝐃 𝐅𝐑𝐄𝐄 𝐁𝐎𝐓 𝐏𝐀𝐈𝐑𝐈𝐍𝐆 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐄𝐃*";

        // Send first message
        await reply(`${doneMessage}\n\n*Your pairing code is:* ${pairingCode}`);

        // Add a delay of 2 seconds before sending the second message
        await sleep(2000);

        // Send second message with just the pairing code
        await reply(`Code: ${pairingCode}`);
    } catch (error) {
        console.error(error);
        await reply("An error occurred. Please try again later.");
    }
});
