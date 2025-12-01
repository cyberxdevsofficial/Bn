const { cmd } = require('../command');

cmd({
    pattern: "boom",
    desc: "Send a message multiple times",
    react: "📢",
    filename: __filename
}, async (conn, mek, m, { from, args, isOwner, reply }) => {
    // Owner check
    if (!isOwner) {
        return await conn.sendMessage(from, { text: "𝗧𝗵𝗶𝘀 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗢𝗻𝗹𝘆 𝗳𝗼𝗿 𝗢𝘄𝗻𝗲𝗿𝘀!" });
    }

    if (args.length < 2) {
        return await conn.sendMessage(from, { text: "Usage: *.boom <count> <message>*\nExample: *.boom 500 Hello!*" });
    }

    const count = parseInt(args[0]);
    if (isNaN(count) || count <= 0 || count > 500) {
        return await conn.sendMessage(from, { text: "Please provide a valid count (1-500)." });
    }

    const message = args.slice(1).join(" ");

    for (let i = 0; i < count; i++) {
        await conn.sendMessage(from, { text: message });
        await new Promise(resolve => setTimeout(resolve, 500)); // 0.5-second delay to avoid spam detection
    }
});
