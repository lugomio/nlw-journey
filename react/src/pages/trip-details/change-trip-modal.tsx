import { Calendar, MapPin, X } from "lucide-react"
import { Button } from "../../components/button"
import { useEffect, useState, type FormEvent } from "react"
import { DayPicker, type DateRange } from "react-day-picker"
import { api } from "../../lib/axios"
import { useNavigate, useParams } from "react-router-dom"
import { format, parseISO } from "date-fns"

interface ChangeTripModalProps {
  closeChangeTrip: () => void
}

export function ChangeTripModal({ closeChangeTrip }: ChangeTripModalProps) {
  const navigate = useNavigate()
  const { tripId } = useParams()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()
  const [tripDestination, setTripDestination] = useState('')
  const [isNewDateSelected, setIsNewDateSelected] = useState(false)
  const initialDate = new Date();
  initialDate.setDate(initialDate.getDate() + 1);

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => {
      const { starts_at, ends_at, destination } = response.data.trip
      setTripDestination(destination)
      setEventStartAndEndDates({
        from: parseISO(starts_at),
        to: parseISO(ends_at)
      })
    })
  }, [tripId])

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
    setIsNewDateSelected(true)
  }

  function changeDateAndDestination(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const destination = data.get('destination') || tripDestination

    if(!destination || !eventStartAndEndDates?.from || !eventStartAndEndDates.to) return

    api.put(`/trips/${tripId}`, {
      destination: destination,
      starts_at: eventStartAndEndDates.from,
      ends_at: eventStartAndEndDates.to
    }).then(() => navigate(0))
  }

  return (
    <div>
      <div onClick={closeChangeTrip} className='bg-black/60 backdrop-blur flex items-center justify-center fixed inset-0'>
        <div onClick={(e) => e.stopPropagation()} className='max-w-xl w-full shadow-shape rounded-xl bg-zinc-900 p-6 space-y-5'>
          <div className="space-y-5">
            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold'>Alterar data/local da viagem</h3>
                <button type='button' onClick={closeChangeTrip}><X className='size-5 text-zinc-400 hover:text-zinc-300 transition-colors duration-300' /></button>
              </div>
              <p className='text-zinc-400 text-sm'>Isso irá alterar a data e o local da viagem.</p>
            </div>
            <form onSubmit={changeDateAndDestination} className="space-y-3">
              <div className="p-3 px-4 bg-zinc-950 rounded-xl flex items-center gap-2 border border-zinc-800">
                <MapPin className='size-5 text-zinc-400' />
                <input className="text-lg placeholder-zinc-400 bg-transparent outline-none flex-1" type='text' name="destination" placeholder={tripDestination || "Para onde você vai?"} />
              </div>
              <button onClick={openDatePicker} type="button" className="p-3 px-4 w-full bg-zinc-950 rounded-xl flex items-center gap-2 border outline-none border-zinc-800">
                <Calendar className='size-5 text-zinc-400' />
                {eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to ? (
                  isNewDateSelected ? (
                    <span className="text-lg">{format(eventStartAndEndDates.from, "d 'de' LLL 'até '").concat(format(eventStartAndEndDates.to, "d 'de' LLL"))}</span>
                  ) : (
                    <span className="text-lg text-zinc-400">{format(eventStartAndEndDates.from, "d 'de' LLL 'até '").concat(format(eventStartAndEndDates.to, "d 'de' LLL"))}</span>
                  )
                ) : (
                  <span className="text-lg text-zinc-400">Quando?</span>
                )}
              </button>
              <Button type="submit" variant="primary" size="full">
                Alterar
              </Button>
            </form>
          </div>
        </div>
      </div>

      {isDatePickerOpen && (
        <div onClick={closeDatePicker} className='bg-black/60 backdrop-blur flex items-center justify-center fixed inset-0'>
          <div onClick={(e) => e.stopPropagation()} className='w-fit shadow-shape rounded-xl bg-zinc-900 p-6 space-y-5'>
            <div className="space-y-5">
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <h3 className='text-lg font-semibold'>Selecione a data</h3>
                  <button type='button' onClick={closeDatePicker}><X className='size-5 text-zinc-400 hover:text-zinc-300 transition-colors duration-300' /></button>
                </div>
              </div>

              <DayPicker mode="range" fromDate={initialDate} selected={eventStartAndEndDates} onSelect={setEventStartAndEndDates} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}