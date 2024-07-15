import { useEffect, useState, type FormEvent } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../lib/axios"
import { AtSign, Plus, X } from "lucide-react"
import { Button } from "../../components/button"

interface ManageGuestsModalProps {
  closeManageGuests: () => void
}

interface Participant {
  id: string,
  name: string,
  email: string,
  is_confirmed: boolean
}

export function ManageGuestsModal({ closeManageGuests }: ManageGuestsModalProps) {
  const [guestsEmails, setGuestsEmails] = useState<Array<string>>([])
  const { tripId } = useParams()

  useEffect(() => {
    api.get<{ participants: Participant[] }>(`/trips/${tripId}/participants`).then(response => {
      setGuestsEmails(response.data.participants.map(guest => guest.email))
    })
  }, [tripId])

  function inviteGuest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')

    if (!email) return

    api.post(`/trips/${tripId}/invites`, {
      email
    })
    setGuestsEmails([...guestsEmails, email.toString()])
    event.currentTarget.reset()
  }

  return (
    <div onClick={closeManageGuests} className='bg-black/60 backdrop-blur flex items-center justify-center fixed inset-0'>
      <div onClick={(e) => e.stopPropagation()} className='max-w-2xl w-full shadow-shape rounded-xl bg-zinc-900 p-6 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold'>Adicionar convidados</h3>
            <button type='button' onClick={closeManageGuests}><X className='size-5 text-zinc-400 hover:text-zinc-300 transition-colors duration-300' /></button>
          </div>
          <p className='text-zinc-400 text-sm'>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
        </div>
        <ul className='flex flex-wrap gap-2'>
          {guestsEmails.map(email => {
            return (
              <li key={email} className='flex items-center gap-3 py-1.5 px-2.5 bg-zinc-800 rounded-md text-sm'>
                <span className='leading-none text-zinc-300'>{email}</span>
              </li>
            )
          })}
        </ul>
        <div className="h-px w-full bg-zinc-800"></div>
        <form onSubmit={inviteGuest} method='post' className="p-2.5 pl-4 bg-zinc-950 rounded-xl flex items-center gap-2 border border-zinc-800">
          <AtSign className='size-5 text-zinc-400' />
          <input className="text-lg placeholder-zinc-400 bg-transparent outline-none flex-1" type="email" name='email' placeholder="Digite o e-mail do convidado" />
          <Button type="submit" variant="primary" size="small">
            Convidar
            <Plus className='size-5' />
          </Button>
        </form>
      </div>
    </div>
  )
}