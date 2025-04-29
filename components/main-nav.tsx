"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const routes = [
    {
      href: "/",
      label: "Accueil",
      active: pathname === "/",
    },
    {
      href: "/scanner",
      label: "Éco Scanner",
      active: pathname === "/scanner",
    },
    {
      href: "/jeu-circuits-courts",
      label: "Mini-Jeu",
      active: pathname === "/jeu-circuits-courts" || pathname === "/jeu",
    },
    {
      href: "/a-propos",
      label: "À propos",
      active: pathname === "/a-propos",
    },
    {
      href: "/mission",
      label: "Notre mission",
      active: pathname === "/mission",
    },
    {
      href: "/equipe",
      label: "L'équipe",
      active: pathname === "/equipe",
    },
  ]

  return (
    <div className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/images/logo-icon.png" alt="CarbonQuest Logo" width={50} height={50} />
        <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-teal-800 bg-clip-text text-transparent hidden sm:inline-block">
          CarbonQuest
        </span>
      </Link>

      {/* Navigation pour desktop */}
      <nav className="hidden md:flex items-center space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-green-600",
              route.active ? "text-green-600" : "text-gray-700",
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>

      {/* Bouton menu pour mobile */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="relative z-20">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-10 pt-20 px-6">
            <nav className="flex flex-col space-y-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-lg font-medium transition-colors hover:text-green-600 py-2 border-b border-gray-100",
                    route.active ? "text-green-600" : "text-gray-700",
                  )}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}
