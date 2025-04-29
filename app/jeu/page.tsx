"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function JeuRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/jeu-circuits-courts")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirection vers le nouveau mini-jeu...</p>
    </div>
  )
}
