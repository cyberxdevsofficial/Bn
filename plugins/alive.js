const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["status", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "🙈",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Generate system status message
        const status = `
𝐀ɴᴜᴡʜ 𝐌ᴅ 𝐅ʀᴇᴇ 𝐁ᴏᴛ 𝐈s 𝐀ʟɪᴠᴇ 𝐍ᴏᴡ
👋 𝐇𝐢*: ${pushname}

⏳ 𝐔𝐩𝐭𝐢𝐦𝐞*: ${runtime(process.uptime())}

📟 𝐁𝐨𝐭 𝐑𝐚𝐦*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB

𝐓𝐲𝐩𝐞 .menu 𝐭𝐨 𝐠𝐞𝐭 𝐦𝐞𝐧𝐮.

𝐂𝐨𝐧𝐧𝐞𝐜𝐭 𝐎𝐮𝐫 𝐅𝐫𝐞𝐞 𝐁𝐨𝐭 : *https://freebot-anugasenithu.zone.id*

> 𝙋𝙊𝙒𝙀𝙍𝙀𝘿 𝘽𝙔 𝘼𝙉𝙐𝙂𝘼 𝙎𝙀𝙉𝙄𝙏𝙃𝙐 𝘼𝙉𝘿 𝙈𝙀𝙈𝘽𝙀𝙍𝙎 𝙊𝙁 𝘿𝘼𝙍𝙆 𝙏𝙀𝘾𝙃 𝙕𝙊𝙉𝙀.
`;

        // Send the status message with an image
        await conn.sendMessage(from, { 
            image: { url: `https://postimg.cc/nX6ZH38b` },  // Image URL
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '37283947@newsletter',
                    newsletterName: '𝐀𝐍𝐔𝐖𝐇 𝐌𝐃 𝐅𝐑𝐄𝐄 𝐁𝐎𝐓',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
