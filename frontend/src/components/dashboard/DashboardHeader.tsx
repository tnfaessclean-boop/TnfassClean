"use client"

import { Plus, Download } from 'lucide-react'
import PlantIllustration from './PlantIllustration'
import AirQualityCard from './AirQualityCard'
import BiofilterStatusCard from './BiofilterStatusCard'

export default function DashboardHeader() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Tableau de bord</h2>
            <p className="text-sm text-gray-600">Vue d&apos;ensemble — indicateurs &amp; actions rapides</p>
          </div>
          <div className="hidden sm:block">
            <PlantIllustration className="w-20 h-20" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white text-sm shadow hover:bg-emerald-700 transition">
            <Plus className="w-4 h-4" />
            Nouveau membre
          </button>

          <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm bg-white hover:bg-gray-50 transition">
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>

      {/* AI Models Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AirQualityCard />
        <BiofilterStatusCard />
      </div>
    </div>
  )
}
