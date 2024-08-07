import { verifyToken } from "@/app/utils/jwt";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export function authMiddleware(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"Authorization token required"});
    }

    try {
        verifyToken(token);
        return handler(req,res);
    } catch (error) {
        return res.status(401).json({message:"Invalid token"});
    }
  };

}

export default authMiddleware;