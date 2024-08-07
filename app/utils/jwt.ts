import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "AKSDJBFASJDHhgsa345";
export const generateToken = (user: { email: string,password:string }) => {
  // return jwt.sign(user, secret, { expiresIn: "10s" });
  return jwt.sign(user, secret, { expiresIn: "24h" });
};

export const verifyToken = (token: string): any => {
  console.log("Original token.....", token);
  try {
    console.log("Verifying token.....")
    
    return jwt.verify(token, process.env.JWT_SECRET||"AKSDJBFASJDHhgsa345");
  } catch (error) {
    return null;
  }
};
