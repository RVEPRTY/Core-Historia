export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, discord, message, captcha, captchaExpected } = req.body;


  if (!message || message.length < 5) {
    await logEvent("INVALID MESSAGE", name, discord, message);
    return res.status(400).json({ error: "Message too short" });
  }


  if (parseInt(captcha) !== parseInt(captchaExpected)) {
    await logEvent("CAPTCHA FAILED", name, discord, message);
    return res.status(400).json({ error: "Captcha failed" });
  }

  const payload = {
    content:
      `📩 **New Contact Message**\n\n` +
      `**Name:** ${name || "N/A"}\n` +
      `**Discord:** ${discord || "N/A"}\n\n` +
      `**Message:**\n${message}`
  };

  try {
    // Send main message
    await fetch(process.env.DISCORD_WEBHOOK_MAIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    // Log success
    await logEvent("MESSAGE SENT", name, discord, message);

    return res.status(200).json({ success: true });
  } catch (err) {
    await logEvent("SERVER ERROR", name, discord, message);
    return res.status(500).json({ error: "Internal server error" });
  }
}



async function logEvent(type, name, discord, message) {
  if (!process.env.DISCORD_WEBHOOK_LOGS) return;

  const logPayload = {
    content:
      `🛡️ **CONTACT LOG**\n\n` +
      `**Event:** ${type}\n` +
      `**Name:** ${name || "N/A"}\n` +
      `**Discord:** ${discord || "N/A"}\n` +
      `**Time:** ${new Date().toISOString()}\n\n` +
      `**Message Preview:**\n${message?.slice(0, 200) || "N/A"}`
  };

  await fetch(process.env.DISCORD_WEBHOOK_LOGS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(logPayload)
  });
}
