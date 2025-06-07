"use client"

import { setCookie } from "cookies-next";
import React from "react";


export default function SignInSide() {


  React.useEffect(() => {
    const fetchData = async () => {

        try {

            setCookie("idUser", -1)

        } catch (error) { console.error('Error sending message:', error); }

    }

    fetchData()
}, [])

    
    return (
        <>
            Logged out
        </>
    )

}