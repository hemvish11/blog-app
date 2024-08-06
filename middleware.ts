import { NextRequest, NextResponse } from "next/server";
// import { authMiddleware } from "./middlewares/apis/authMiddleware";
// import { loggingMiddleware } from "./middlewares/apis/loggingMiddleware";

// export const config = {
//     matcher: "/api/:path*",
// }

export default function middleware(req:NextRequest){
//     if(req.url.includes("/api/blogs")){
//         const logResult = loggingMiddleware(req);
//         console.log("Request",logResult);
//     }
//     const authRes = authMiddleware(req);
//     if(!authRes?.isValid){
//         return new NextResponse(JSON.stringify({message: "Unauthorized"}),{status: 401})
//     }
//     return NextResponse.next();
}