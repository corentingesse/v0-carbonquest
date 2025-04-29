"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ArrowLeft, Leaf, Truck, Droplets, Factory, AlertTriangle, Info, Share2 } from "lucide-react"
import { getCurrentSeason } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProductData {
  name: string
  brand: string
  image_url: string
  categories: string
  ecoscore_data?: {
    agribalyse?: {
      co2_total: number
    }
    adjustments?: {
      origins_transportation?: {
        value: number
      }
      packaging?: {
        value: number
      }
      production_system?: {
        value: number
      }
    }
  }
  ecoscore_grade?: string
  ecoscore_score?: number
  origins?: string
  packaging?: string
}

interface CarbonFootprint {
  total: number
  components: {
    production: number
    transport: number
    packaging: number
    water: number
  }
  grade: string
  score: number
}

export default function ProductPage({ params }: { params: { barcode: string } }) {
  const router = useRouter()
  const [product, setProduct] = useState<ProductData | null>(null)
  const [carbonFootprint, setCarbonFootprint] = useState<CarbonFootprint | null>(null)
  const [season, setSeason] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Utiliser l'API Open Food Facts pour récupérer les données du produit
        const response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${params.barcode}.json`)
        const data = await response.json()

        if (data.status === 0) {
          setError("Produit non trouvé dans la base de données Open Food Facts")
          setLoading(false)
          return
        }

        const productData: ProductData = {
          name: data.product.product_name || "Produit sans nom",
          brand: data.product.brands || "Marque inconnue",
          image_url: data.product.image_url || "/placeholder.svg?height=200&width=200",
          categories: data.product.categories || "Catégorie inconnue",
          ecoscore_data: data.product.ecoscore_data,
          ecoscore_grade: data.product.ecoscore_grade,
          ecoscore_score: data.product.ecoscore_score,
          origins: data.product.origins,
          packaging: data.product.packaging,
        }

        setProduct(productData)

        // Déterminer la saison actuelle
        const currentSeason = getCurrentSeason()
        setSeason(currentSeason)

        // Calculer l'empreinte carbone
        const footprint: CarbonFootprint = {
          total: 0,
          components: {
            production: 0,
            transport: 0,
            packaging: 0,
            water: 0,
          },
          grade: productData.ecoscore_grade || "?",
          score: productData.ecoscore_score || 0,
        }

        // Si les données Eco-score sont disponibles
        if (productData.ecoscore_data?.agribalyse?.co2_total) {
          // Valeur de base en kg CO2 eq/kg, convertir en g CO2 eq/100g
          const baseFootprint = productData.ecoscore_data.agribalyse.co2_total * 100

          // Appliquer un facteur saisonnier
          const seasonalFactors: Record<string, number> = {
            winter: 1.2,
            spring: 1.0,
            summer: 0.9,
            autumn: 1.1,
          }

          const seasonalFactor = seasonalFactors[currentSeason] || 1.0
          footprint.total = Math.round(baseFootprint * seasonalFactor)

          // Répartir l'empreinte entre les différentes composantes
          // Ces pourcentages sont approximatifs et pourraient être affinés
          footprint.components.production = Math.round(footprint.total * 0.6) // 60% production
          footprint.components.transport = Math.round(footprint.total * 0.2) // 20% transport
          footprint.components.packaging = Math.round(footprint.total * 0.15) // 15% emballage
          footprint.components.water = Math.round(footprint.total * 0.05) // 5% eau

          // Ajuster avec les données spécifiques si disponibles
          if (productData.ecoscore_data.adjustments) {
            if (productData.ecoscore_data.adjustments.origins_transportation) {
              // Ajuster le transport en fonction des données spécifiques
              const transportAdjustment = productData.ecoscore_data.adjustments.origins_transportation.value
              footprint.components.transport = Math.round(footprint.total * (0.2 + transportAdjustment / 100))
            }

            if (productData.ecoscore_data.adjustments.packaging) {
              // Ajuster l'emballage en fonction des données spécifiques
              const packagingAdjustment = productData.ecoscore_data.adjustments.packaging.value
              footprint.components.packaging = Math.round(footprint.total * (0.15 + packagingAdjustment / 100))
            }
          }
        } else {
          // Valeurs par défaut si aucune donnée n'est disponible
          footprint.total = 50 // Valeur moyenne par défaut
          footprint.components.production = 30
          footprint.components.transport = 10
          footprint.components.packaging = 7
          footprint.components.water = 3
        }

        setCarbonFootprint(footprint)

        // Sauvegarder dans l'historique
        const history = JSON.parse(localStorage.getItem("scanHistory") || "[]")
        const newScan = {
          barcode: params.barcode,
          name: productData.name,
          brand: productData.brand,
          footprint: footprint.total,
          grade: footprint.grade,
          date: new Date().toISOString(),
          image_url: productData.image_url,
        }

        // Éviter les doublons en remplaçant l'entrée existante si le même produit a été scanné récemment
        const existingIndex = history.findIndex((item: any) => item.barcode === params.barcode)
        if (existingIndex >= 0) {
          history[existingIndex] = newScan
        } else {
          history.unshift(newScan)
        }

        // Limiter l'historique à 10 éléments
        const limitedHistory = history.slice(0, 10)
        localStorage.setItem("scanHistory", JSON.stringify(limitedHistory))

        setLoading(false)
      } catch (err) {
        console.error("Erreur lors de la récupération des données du produit:", err)
        setError("Erreur lors de la récupération des données du produit. Veuillez réessayer.")
        setLoading(false)
      }
    }

    fetchProductData()
  }, [params.barcode])

  // Déterminer la couleur en fonction de l'empreinte carbone
  const getFootprintColor = (value: number) => {
    if (value < 30) return "from-green-400 to-green-600"
    if (value < 60) return "from-yellow-400 to-yellow-600"
    if (value < 90) return "from-orange-400 to-orange-600"
    return "from-red-400 to-red-600"
  }

  // Traduire la saison en français
  const getSeasonInFrench = (season: string) => {
    const translations: Record<string, string> = {
      winter: "hiver",
      spring: "printemps",
      summer: "été",
      autumn: "automne",
    }
    return translations[season] || season
  }

  // Traduire le grade Eco-score en français
  const getEcoScoreLabel = (grade: string) => {
    const labels: Record<string, string> = {
      a: "Impact très faible",
      b: "Impact faible",
      c: "Impact modéré",
      d: "Impact élevé",
      e: "Impact très élevé",
      "?": "Impact inconnu",
    }
    return labels[grade.toLowerCase()] || "Impact inconnu"
  }

  // Obtenir la couleur du grade Eco-score
  const getEcoScoreColor = (grade: string) => {
    switch (grade.toLowerCase()) {
      case "a":
        return "from-green-400 to-green-600"
      case "b":
        return "from-green-300 to-green-500"
      case "c":
        return "from-yellow-400 to-yellow-600"
      case "d":
        return "from-orange-400 to-orange-600"
      case "e":
        return "from-red-400 to-red-600"
      default:
        return "from-gray-400 to-gray-600"
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <Card className="w-full max-w-md border-none shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center mb-2">
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="w-full">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <Skeleton className="h-32 w-32 rounded-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
        <Card className="w-full max-w-md border-none shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center mb-2">
              <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <CardTitle>Produit non trouvé</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive" className="bg-red-50 border-red-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <div className="mt-6 text-center">
              <p className="mb-4">
                Ce produit n&apos;est pas encore dans la base de données Open Food Facts. Vous pouvez contribuer en
                ajoutant ce produit sur leur site.
              </p>
              <Button
                className="mt-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-200"
                onClick={() => window.open(`https://world.openfoodfacts.org/product/${params.barcode}/edit`, "_blank")}
              >
                Ajouter ce produit à Open Food Facts
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border-none shadow-sm hover:shadow-md transition-all duration-200"
              onClick={() => router.push("/")}
            >
              Scanner un autre produit
            </Button>
          </CardFooter>
        </Card>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <Card className="w-full max-w-md border-none shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <div className="flex items-center mb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="mr-2 hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <CardTitle className="text-xl font-bold line-clamp-1">{product?.name}</CardTitle>
              <CardDescription className="flex items-center gap-2">
                <span>{product?.brand}</span>
                <span className="text-gray-300">•</span>
                <span className="line-clamp-1">{product?.categories?.split(",")[0]}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            {product?.image_url && (
              <div className="relative">
                <div className="absolute inset-0 bg-gray-200/50 rounded-xl blur-md"></div>
                <Image
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="object-contain relative z-10 rounded-lg"
                  unoptimized
                />
              </div>
            )}
          </div>

          {carbonFootprint?.grade && (
            <div className="flex justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge
                      className={`text-white px-4 py-1.5 text-sm font-medium bg-gradient-to-r ${getEcoScoreColor(
                        carbonFootprint.grade,
                      )} shadow-sm`}
                    >
                      Eco-score: {carbonFootprint.grade.toUpperCase()} - {getEcoScoreLabel(carbonFootprint.grade)}
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notation environnementale de A (meilleur) à E (moins bon)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

          <div className="text-center">
            <h3 className="text-lg font-medium mb-1">Bilan carbone</h3>
            <p className="text-sm text-gray-500 mb-4">
              Ajusté pour la saison: <span className="font-medium">{getSeasonInFrench(season)}</span>
            </p>

            <div className="relative inline-flex items-center justify-center">
              <div className="absolute inset-0 bg-gray-100 rounded-full blur-md"></div>
              <div
                className={`h-32 w-32 rounded-full flex flex-col items-center justify-center text-white relative z-10 bg-gradient-to-br ${getFootprintColor(
                  carbonFootprint?.total || 0,
                )} shadow-lg`}
              >
                <span className="font-bold text-2xl">{carbonFootprint?.total}</span>
                <span className="text-xs font-medium mt-1 opacity-90">g CO₂e / 100g</span>
              </div>
            </div>
          </div>

          {!product?.ecoscore_data?.agribalyse?.co2_total && (
            <Alert className="bg-blue-50 border-blue-100 text-blue-800">
              <Info className="h-4 w-4" />
              <AlertTitle className="font-medium">Information</AlertTitle>
              <AlertDescription className="text-blue-700">
                Les données précises d&apos;impact carbone ne sont pas disponibles pour ce produit. Les valeurs
                affichées sont des estimations.
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-4 bg-gray-50 p-4 rounded-xl">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <span>Détail de l&apos;impact</span>
              <div className="h-px flex-grow bg-gray-200"></div>
            </h3>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-sm mr-3">
                      <Factory className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">Production</span>
                  </div>
                  <span className="font-bold">{carbonFootprint?.components.production} g</span>
                </div>
                <Progress
                  value={((carbonFootprint?.components.production || 0) / (carbonFootprint?.total || 1)) * 100}
                  className="h-2 bg-gray-200"
                  indicatorClassName="bg-gradient-to-r from-amber-400 to-amber-600"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-sm mr-3">
                      <Truck className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">Transport</span>
                  </div>
                  <span className="font-bold">{carbonFootprint?.components.transport} g</span>
                </div>
                <Progress
                  value={((carbonFootprint?.components.transport || 0) / (carbonFootprint?.total || 1)) * 100}
                  className="h-2 bg-gray-200"
                  indicatorClassName="bg-gradient-to-r from-blue-400 to-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-sm mr-3">
                      <Leaf className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">Emballage</span>
                  </div>
                  <span className="font-bold">{carbonFootprint?.components.packaging} g</span>
                </div>
                <Progress
                  value={((carbonFootprint?.components.packaging || 0) / (carbonFootprint?.total || 1)) * 100}
                  className="h-2 bg-gray-200"
                  indicatorClassName="bg-gradient-to-r from-green-400 to-green-600"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-sm mr-3">
                      <Droplets className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">Eau</span>
                  </div>
                  <span className="font-bold">{carbonFootprint?.components.water} g</span>
                </div>
                <Progress
                  value={((carbonFootprint?.components.water || 0) / (carbonFootprint?.total || 1)) * 100}
                  className="h-2 bg-gray-200"
                  indicatorClassName="bg-gradient-to-r from-cyan-400 to-cyan-600"
                />
              </div>
            </div>
          </div>

          {(product?.origins || product?.packaging) && (
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl">
              {product?.origins && (
                <div>
                  <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                    <span>Origine</span>
                    <div className="h-px flex-grow bg-gray-200"></div>
                  </h4>
                  <p className="text-sm">{product.origins}</p>
                </div>
              )}

              {product?.packaging && (
                <div>
                  <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                    <span>Emballage</span>
                    <div className="h-px flex-grow bg-gray-200"></div>
                  </h4>
                  <p className="text-sm">{product.packaging}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-200"
            onClick={() => router.push("/")}
          >
            Scanner un autre produit
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Bilan carbone de ${product?.name}`,
                  text: `Découvrez l'impact environnemental de ${product?.name} avec Éco Scanner !`,
                  url: window.location.href,
                })
              }
            }}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      <p className="text-center text-xs text-gray-400 mt-4">Données fournies par Open Food Facts via data.gouv.fr</p>
    </main>
  )
}
