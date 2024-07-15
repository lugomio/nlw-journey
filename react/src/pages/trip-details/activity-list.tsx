import { CircleDashed, CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
  date: string
  activities: {
    id: string
    title: string
    occurs_at: string
    is_confirmed: boolean
  }[]
}
export function ActivityList() {

  const navigate = useNavigate()

  const { tripId } = useParams()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
  }, [tripId])

  function confirmActivity(activityId: string, is_confirmed: boolean) {
    api.put(`/activities/${activityId}`, {
      is_confirmed: !is_confirmed
    }).then(() => navigate(0))
  }

  return (
    <div className="space-y-8">
      {activities.map(category => (
        <div key={category.date} className="space-y-3">
          <div className="flex gap-2 items-baseline">
            <h3 className="text-md text-zinc-300">Dia {format(category.date, "d")}</h3>
            <span className="text-xs text-zinc-500 capitalize">{format(category.date, "EEEE", { locale: ptBR })}</span>
          </div>

          {category.activities.length === 0 ? (
            <span className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</span>
          ) : (
            <ul className="space-y-3">
              {category.activities.map(activity => {
                return (
                  <li key={activity.id} className="flex items-center justify-between gap-3 px-4 py-3 bg-zinc-900 shadow-shape rounded-xl">
                    <div className="flex gap-3 items-center">
                      {activity.is_confirmed ? (
                        <button onClick={() => confirmActivity(activity.id, activity.is_confirmed)}>
                          <CircleCheck className="text-lime-300 size-5" />
                        </button>
                      ) : (
                        <button onClick={() => confirmActivity(activity.id, activity.is_confirmed)}>
                          <CircleDashed className="text-zinc-400 size-5" />
                        </button>
                      )}
                      <h4 className="text-zinc-100">{activity.title}</h4>
                    </div>
                    <span className="text-zinc-400 text-sm">{format(activity.occurs_at, "HH:mm")}h</span>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}