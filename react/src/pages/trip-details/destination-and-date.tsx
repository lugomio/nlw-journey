import { MapPin, Calendar, Settings2 } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { format } from "date-fns";

interface Trip {
  id: string
  destination: string
  starts_at: string
  ends_at: string
  is_confirmed: boolean
}

interface DestinationAndDateProps {
  openChangeTrip: () => void
}

export function DestinationAndDate({ openChangeTrip }: DestinationAndDateProps) {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

  return (
    <div className="h-16 bg-zinc-900 rounded-xl flex items-center gap-5 px-6 shadow-shape">
      <div className="flex gap-2 items-center flex-1">
        <MapPin className='size-5 text-zinc-400' />
        <span className="flex-1">{trip?.destination}</span>
      </div>

      <div className="flex gap-2 items-center">
        <Calendar className='size-5 text-zinc-400 shrink-0' />
        <span>{trip && format(trip?.starts_at, "d 'de' LLL 'até '").concat(format(trip?.ends_at, "d 'de' LLL"))}</span>
      </div>

      <div className='w-px h-6 bg-zinc-800' />

      <Button onClick={openChangeTrip} variant="secondary" size="small">
        Alterar local/data
        <Settings2 className='size-5' />
      </Button>
    </div>
  )
}