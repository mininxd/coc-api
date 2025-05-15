import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

export async function initArcjet(req, res, requested = 5) {
  const decision = await aj.protect(req, { requested });

  if (decision.isDenied()) {
    const reason = decision.reason;
    const status = reason.isRateLimit() ? 429 : 403;
    const message = reason.isRateLimit()
      ? "Too Many Requests"
      : reason.isBot()
      ? "No bots allowed"
      : "Forbidden";

    res.status(status).json({ error: message });
    return false;
  }

  if (decision.results.some(isSpoofedBot)) {
    res.status(403).json({ error: "Forbidden" });
    return false;
  }

  return true;
}
