import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions d'utilisation | CarbonQuest",
  description: "Conditions d'utilisation de CarbonQuest.",
}

export default function ConditionsUtilisation() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Conditions d'utilisation</h1>
      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Acceptation des conditions</h2>
        <p className="text-gray-700">
          L'utilisation du site CarbonQuest implique l'acceptation pleine et entière des présentes conditions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Accès au service</h2>
        <p className="text-gray-700">
          CarbonQuest est un service gratuit accessible à tous les utilisateurs.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Responsabilités</h2>
        <p className="text-gray-700">
          Les informations fournies par CarbonQuest sont à titre indicatif uniquement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Modifications</h2>
        <p className="text-gray-700">
          CarbonQuest se réserve le droit de modifier ces conditions à tout moment.
        </p>
      </section>
    </div>
  )
}