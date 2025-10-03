import crypto from "crypto";

export function verifyHmac(payload: any, secret: string, signature: string): boolean {
  if (!secret) return false;
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(payload))
    .digest("hex");
  return hmac === signature;
}