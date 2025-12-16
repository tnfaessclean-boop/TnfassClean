import { Activity, Users, Calendar, Layers } from 'lucide-react'
import Sparkline from './Sparkline'

type Props = {
  title: string
  value: string | number
  delta?: number
  icon?: 'users' | 'events' | 'projects' | 'activity'
  sparklineData?: number[]
}

const iconMap: Record<string, any> = {
  users: Users,
  events: Calendar,
  projects: Layers,
  activity: Activity,
}

export default function StatsCard({ title, value, delta, icon = 'activity', sparklineData }: Props) {
  const Icon = iconMap[icon] || Activity
  const sparkColor = delta && delta > 0 ? '#16a34a' : '#84cc16'

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 flex items-center space-x-4 transform transition hover:scale-[1.01]">
      <div className="flex-shrink-0">
        <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <div className="flex-1">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="mt-1 flex items-baseline space-x-3">
          <div className="text-2xl font-semibold text-gray-800">{value}</div>
          {typeof delta === 'number' && (
            <div className={`text-sm font-medium ${delta >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}%
            </div>
          )}
        </div>
        {sparklineData && (
          <div className="mt-3">
            <Sparkline data={sparklineData} color={sparkColor} width={160} height={36} />
          </div>
        )}
      </div>
    </div>
  )
}
