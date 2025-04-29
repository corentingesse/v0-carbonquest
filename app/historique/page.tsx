"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, Trash2, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface HistoryItem {
  barcode: string
  name: string
  brand: string
  footprint: number
  grade?: string
  date: string
  image_url?: string
}

export default function HistoryPage() {
  const router = useRouter()
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredHistory, setFilteredHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
    const storedHistory = localStorage.getItem("scanHistory")
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory)
      setHistory(parsedHistory)
      setFilteredHistory(parsedHistory)
    }
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredHistory(history)
    } else {
      const filtered = history.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredHistory(filtered)
    }
  }, [searchTerm, history])

  const clearHistory = () => {
    localStorage.removeItem("scanHistory")
    setHistory([])
    setFilteredHistory([])
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  // Déterminer la couleur en fonction de l'empreinte carbone
  const getFootprintColor = (value: number) => {
    if (value < 30) return "bg-gradient-to-r from-green-400 to-green-600"
    if (value < 60) return "bg-gradient-to-r from-yellow-400 to-yellow-600"
    if (value < 90) return "bg-gradient-to-r from-orange-400 to-orange-600"
    return "bg-gradient-to-r from-red-400 to-red-600"
  }

  // Déterminer la couleur en fonction du grade Eco-score
  const getEcoScoreColor = (grade?: string) => {
    if (!grade) return "bg-gray-500 text-white"

    switch (grade.toLowerCase()) {
      case "a":
        return "bg-gradient-to-r from-green-400 to-green-600 text-white"
      case "b":
        return "bg-gradient-to-r from-green-300 to-green-500 text-white"
      case "c":
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case "d":
        return "bg-gradient-to-r from-orange-400 to-orange-600 text-white"
      case "e":
        return "bg-gradient-to-r from-red-400 to-red-600 text-white"
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <Card className="w-full max-w-md border-none shadow-lg bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="mr-2 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                  Historique
                </CardTitle>
                <CardDescription>Vos produits scannés récemment</CardDescription>
              </div>
            </div>
            {history.length > 0 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={clearHistory}
                className="hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {history.length > 0 && (
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-200 focus:border-green-500 focus:ring focus:ring-green-200 transition-all duration-200"
              />
            </div>
          )}

          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <div className="bg-gray-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-10 w-10 text-gray-300" />
              </div>
              <p className="text-gray-500 mb-4">Aucun produit scanné</p>
              <Button
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-none shadow-md hover:shadow-lg transition-all duration-200"
                onClick={() => router.push("/")}
              >
                Scanner un produit
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 shadow-sm hover:shadow-md"
                  onClick={() => router.push(`/produit/${item.barcode}`)}
                >
                  <div className="flex-shrink-0 mr-3">
                    {item.image_url ? (
                      <div className="relative">
                        <div className="absolute inset-0 bg-gray-200/50 rounded-md blur-sm"></div>
                        <Image
                          src={item.image_url || "/placeholder.svg"}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="object-contain rounded-md relative z-10"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                        <span className="text-xs text-gray-500">Image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-xs text-gray-400">{formatDate(item.date)}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <div
                      className={`px-2 py-1 rounded-full text-sm font-medium text-white shadow-sm ${getFootprintColor(item.footprint)}`}
                    >
                      {item.footprint}
                    </div>
                    {item.grade && (
                      <Badge className={`text-xs shadow-sm ${getEcoScoreColor(item.grade)}`}>
                        {item.grade.toUpperCase()}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <p className="text-center text-xs text-gray-400 mt-4">Données fournies par Open Food Facts via data.gouv.fr</p>
    </main>
  )
}
