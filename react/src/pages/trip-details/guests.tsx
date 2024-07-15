import { CircleCheck, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

interface GuestsProps {
  openManageGuests: () => void
}

export function Guests({ openManageGuests }: GuestsProps) {

  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participant[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Convidados</h2>
      <ul className="space-y-5">
        {participants?.map((participant, index) => {
          return (
            <li key={participant.id} className="flex items-center justify-between">
              <div className="flex flex-col gap-1.5 max-w-60">
                <h3 className="text-zinc-100">{participant.name ?? `Convidado ${index}`}</h3>
                <span className="truncate text-xs text-zinc-400">{participant.email}</span>
              </div>
              {participant.is_confirmed ? (
                <CircleCheck className="size-5 text-lime-300" />
              ) : (
                <CircleDashed className="size-5 text-zinc-400" />
              )}
            </li>
          )
        })}
      </ul>
      <Button onClick={openManageGuests} variant="secondary" size="full">
        <UserCog className='size-5' />
        Gerenciar convidados
      </Button>
    </div>
  )
}