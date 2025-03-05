'use client';


import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const RegisterUserPage =() =>{
    const router =  useRouter();

   
    return (

        <div onClick={()=>{
        router.push('landingpage')
        }}>
            my page {`${router}`}
        </div>
    )
}


export default RegisterUserPage