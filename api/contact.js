export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, discord, message } = req.body;

  if (!name || !discord || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  // Main message webhook
  const mainPayload = {
    content:
      `**New Contact Message**\n` +
      `**Name:** ${name}\n` +
      `**Discord:** ${discord}\n` +
      `**Message:** ${message}`
  };

  // Logging webhook
  const logPayload = {
    content:
      `**CONTACT LOG**\n` +
      `**Name:** ${name}\n` +
      `**Discord:** ${discord}\n` +
      `**Date:** ${date}\n` +
      `**Time:** ${time}\n` +
      `**IP:** ${req.headers["x-forwarded-for"] || "unknown"}`
  };

  try {
    await fetch(process.env.DISCORD_WEBHOOK_MAIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mainPayload)
    });

    await fetch(process.env.DISCORD_WEBHOOK_LOGS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logPayload)
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: "Webhook failed" });
  }
}
