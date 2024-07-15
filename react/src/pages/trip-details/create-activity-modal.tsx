import { Calendar, Tag, X } from "lucide-react"
import { Button } from "../../components/button"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../lib/axios"
import { useEffect, useState, type FormEvent } from "react"
import { format } from "date-fns"

interface CreateActiviyModalProps {
  closeCreateActivity: () => void
}

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

export function CreateActiviyModal({
  closeCreateActivity
}: CreateActiviyModalProps) {
  const navigate = useNavigate()

  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()
  const dateStart = trip?.starts_at && format(trip.starts_at, "yyyy-MM-dd'T00:00:00'")
  const dateEnd = trip?.ends_at && format(trip.ends_at, "yyyy-MM-dd'T23:59:59'")

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const title = data.get('title')?.toString()
    const occurs_at = data.get('occurs_at')?.toString()

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at
    })

    navigate(0)
  }

  return (
    <div onClick={closeCreateActivity} className='bg-black/60 backdrop-blur flex items-center justify-center fixed inset-0'>
      <div onClick={(e) => e.stopPropagation()} className='max-w-xl w-full shadow-shape rounded-xl bg-zinc-900 p-6 space-y-5'>
        <div className="space-y-5">
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>Cadastrar atividade</h3>
              <button type='button' onClick={closeCreateActivity}><X className='size-5 text-zinc-400 hover:text-zinc-300 transition-colors duration-300' /></button>
            </div>
            <p className='text-zinc-400 text-sm'>Todos convidados podem visualizar as atividades.</p>
          </div>
          <form onSubmit={createActivity} className="space-y-3">
            <div className="p-3 px-4 bg-zinc-950 rounded-xl flex items-center gap-2 border border-zinc-800">
              <Tag className='size-5 text-zinc-400' />
              <input className="text-lg placeholder-zinc-400 bg-transparent outline-none flex-1" type='text' name="title" placeholder="Qual atividade?" />
            </div>
            <div className="p-3 px-4 bg-zinc-950 rounded-xl flex items-center gap-2 border border-zinc-800">
              <Calendar className='size-5 text-zinc-400' />
              <input className="text-lg placeholder-zinc-400 bg-transparent outline-none flex-1" type='datetime-local' name="occurs_at" min={dateStart} max={dateEnd} placeholder="Data" />
            </div>
            <Button type="submit" variant="primary" size="full">
              Salvar atividade
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}