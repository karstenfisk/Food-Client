import jwt from "jsonwebtoken";

export default function createToken(payload) {
  const secret = process.env.NEXT_PUBLIC_RECIPE_SECRET;
  const token = jwt.sign(payload, secret, {
    expiresIn: "1h",
  });
  return token;
}

export function verifyToken(token) {
  const secret = process.env.NEXT_PUBLIC_RECIPE_SECRET;
  try {
    const verifiedToken = jwt.verify(token, secret);
    return verifiedToken;
  } catch (error) {
    return { error: "Invalid Token" };
  }
}
