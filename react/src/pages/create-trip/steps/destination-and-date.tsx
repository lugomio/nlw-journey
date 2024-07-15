import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import 'react-day-picker/dist/style.css';
import { format } from "date-fns";

interface DestinationAndDateProps {
  isGuestsInputOpen: boolean
  openGuestsInput: () => void
  closeGuestsInput: () => void
  setDestination: (destination: string) => void
  eventStartAndEndDates: DateRange | undefined
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDate({
  closeGuestsInput,
  isGuestsInputOpen,
  openGuestsInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates
}: DestinationAndDateProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const initialDate = new Date();
  initialDate.setDate(initialDate.getDate() + 1);

  function openDatePicker() {
    setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    setIsDatePickerOpen(false)
  }


  return (
    <div className="h-16 bg-zinc-900 rounded-xl flex items-center gap-3 px-6 shadow-shape">
      <div className="flex gap-2 items-center flex-1">
        <MapPin className='size-5 text-zinc-400 shrink-0' />
        <input onChange={event => setDestination(event.target.value)} disabled={isGuestsInputOpen} className="text-lg placeholder-zinc-400 bg-transparent outline-none flex-1" type="text" placeholder="Para onde você vai?" />
      </div>
      <button onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex gap-2 items-center outline-none">
        <Calendar className='size-5 text-zinc-400 shrink-0' />
        {eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to ? (
          <span className="text-lg w-auto">{format(eventStartAndEndDates.from, "d 'de' LLL")} até {format(eventStartAndEndDates.to, "d 'de' LLL")}</span>
        ) : (
          <span className="text-lg text-zinc-400 w-auto">Quando?</span>
        )}
      </button>

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

      <div className='w-px h-6 bg-zinc-800' />
      {!isGuestsInputOpen ? (
        <Button onClick={openGuestsInput} variant="primary" size="small">
          Continuar
          <ArrowRight className='size-5' />
        </Button>
      ) : (
        <Button onClick={closeGuestsInput} variant="secondary" size="small">
          Alterar local/data
          <Settings2 className='size-5' />
        </Button>
      )}
    </div>
  )
}