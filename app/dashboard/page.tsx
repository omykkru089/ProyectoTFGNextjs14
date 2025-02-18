"use client"
import { useSession } from 'next-auth/react'


const page = () => {
    const session = useSession()

    
  return (
    <div>
        <pre>
            {JSON.stringify(session, null, 2)}
        </pre>
    </div>
  )
}

export default page