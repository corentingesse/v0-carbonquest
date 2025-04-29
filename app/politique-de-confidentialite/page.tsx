import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de confidentialité | CarbonQuest",
  description: "Politique de confidentialité de CarbonQuest.",
}

export default function PolitiqueConfidentialite() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Politique de confidentialité</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Collecte des données</h2>
        <p className="text-gray-700">
          CarbonQuest collecte uniquement les données nécessaires au fonctionnement de ses services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Utilisation des données</h2>
        <p className="text-gray-700">
          Les données sont utilisées uniquement pour fournir et améliorer nos services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Protection des données</h2>
        <p className="text-gray-700">
          Nous mettons en œuvre des mesures de sécurité pour protéger vos données.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Vos droits</h2>
        <p className="text-gray-700">
          Vous pouvez demander l'accès, la rectification ou la suppression de vos données.
        </p>
      </section>
    </div>
  )
}