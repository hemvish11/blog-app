// import { NextRequest } from "next/server";

// const validateToken = (token:any) => {
//     // const validToken = token.length;
//     const validToken = true;
//     if(!token || !validToken ){
//         return false;
//     }
//     return true; 
// }
    
// export function authMiddleware(req:NextRequest){
//     const token = req.headers.get("authorization")?.split(" ")[1];

//     return {isValid:validateToken(token)}
// }