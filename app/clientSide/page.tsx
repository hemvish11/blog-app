"use client"

import { useLayoutEffect } from "react"
import { sessionStatus } from "../utils/session"
import { redirect } from "next/navigation"

const ClientSide = () =>{
    useLayoutEffect(()=>{
        const session = sessionStatus;
        if(!session){
            redirect('/')
        }
    },[])
    return <div>This is protected route</div>
}

export default ClientSide;