import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "AKSDJBFASJDHhgsa345";
export const generateToken = (user: { _id: number }) => {
  return jwt.sign(user, secret, { expiresIn: "10s" });
  // return jwt.sign(user, secret, { expiresIn: "24h" });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
};