import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/images/logo-icon.png" alt="CarbonQuest Logo" width={40} height={40} />
              <span className="font-bold text-lg bg-gradient-to-r from-green-600 to-teal-800 bg-clip-text text-transparent">
                CarbonQuest
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Comprendre et réduire l&apos;impact carbone de notre alimentation, un scan à la fois.
            </p>
            <div className="flex space-x-4">
              <Link href="https://www.facebook.com/YnovCampus" target="_blank" className="text-gray-500 hover:text-green-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com/YnovCampus" target="_blank" className="text-gray-500 hover:text-green-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/ynovcampus" target="_blank" className="text-gray-500 hover:text-green-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Nos outils</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/scanner" className="text-gray-600 hover:text-green-600 transition-colors">
                  Éco Scanner
                </Link>
              </li>
              <li>
                <Link href="/jeu" className="text-gray-600 hover:text-green-600 transition-colors">
                  Mini-Jeu Carbone
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-600 transition-colors">
                  Calculateur d&apos;empreinte
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">À propos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/a-propos" className="text-gray-600 hover:text-green-600 transition-colors">
                  Notre entreprise
                </Link>
              </li>
              <li>
                <Link href="/mission" className="text-gray-600 hover:text-green-600 transition-colors">
                  Notre mission
                </Link>
              </li>
              <li>
                <Link href="/equipe" className="text-gray-600 hover:text-green-600 transition-colors">
                  L&apos;équipe
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-gray-900 mb-4">Légal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/mentions-legales" className="text-gray-600 hover:text-green-600 transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/politique-de-confidentialite" className="text-gray-600 hover:text-green-600 transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/conditions-dutilisation" className="text-gray-600 hover:text-green-600 transition-colors">
                  Conditions d&apos;utilisation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} CarbonQuest. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
