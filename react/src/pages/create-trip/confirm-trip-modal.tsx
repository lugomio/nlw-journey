import { Mail, User, X } from "lucide-react";
import type { FormEvent } from "react";
import { Button } from "../../components/button";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
  eventStartAndEndDates: DateRange | undefined
  destination: string
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerEmail,
  setOwnerName,
  destination,
  eventStartAndEndDates
}: ConfirmTripModalProps) {
  return (
    <div onClick={closeConfirmTripModal} className='bg-black/60 backdrop-blur flex items-center justify-center fixed inset-0'>
      <div onClick={(e) => e.stopPropagation()} className='max-w-xl w-full shadow-shape rounded-xl bg-zinc-900 p-6 space-y-5'>
        <div className="space-y-5">
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>Confirmar criação da viagem</h3>
              <button type='button' onClick={closeConfirmTripModal}><X className='size-5 text-zinc-400 hover:text-zinc-300 transition-colors duration-300' /></button>
            </div>
            <p className='text-zinc-400 text-sm'>
              Para concluir a criação da viagem para <span className='font-semibold text-zinc-50'>{destination}</span> nas datas de <span className='font-semibold text-zinc-50'> {(eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to) ? format(eventStartAndEndDates.from, "d 'de' LLL 'até '").concat(format(eventStartAndEndDates.to, "d 'de' LLL")) : ''} </span> preencha seus dados abaixo:
            </p>
          </div>
          <form onSubmit={createTrip} className="space-y-3">
            <div className="p-3 px-4 bg-zinc-950 rounded-xl flex items-center gap-2 border border-zinc-800">
              <User className='size-5 text-zinc-400' />
              <input onChange={event => setOwnerName(event.target.value)} className="text-lg placeholder-zinc-400 bg-transparent outline-none flex-1" type='text' placeholder="Seu nome completo" />
            </div>
            <div className="p-3 px-4 bg-zinc-950 rounded-xl flex items-center gap-2 border border-zinc-800">
              <Mail className='size-5 text-zinc-400' />
              <input onChange={event => setOwnerEmail(event.target.value)} className="text-lg placeholder-zinc-400 bg-transparent outline-none flex-1" type='email' placeholder="Seu e-mail pessoal" />
            </div>
            <Button type="submit" variant="primary" size="full">
              Confirmar criação de viagem
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}