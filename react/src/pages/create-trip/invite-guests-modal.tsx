import { AtSign, Plus, X } from "lucide-react"
import type { FormEvent } from "react"
import { Button } from "../../components/button"

interface InviteGuestsModalProps {
  closeGuestsModal: () => void
  emailsToInvite: string[]
  addEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
  removeEmailFromInvites: (email: string) => void
}

export function InviteGuestsModal({
  closeGuestsModal,
  emailsToInvite,
  addEmailToInvite,
  removeEmailFromInvites
}: InviteGuestsModalProps) {
  return (
    <div onClick={closeGuestsModal} className='bg-black/60 backdrop-blur flex items-center justify-center fixed inset-0'>
      <div onClick={(e) => e.stopPropagation()} className='max-w-2xl w-full shadow-shape rounded-xl bg-zinc-900 p-6 space-y-5'>
        <div className='space-y-2'>
          <div className='flex items-center justify-between'>
            <h3 className='text-lg font-semibold'>Selecionar convidados</h3>
            <button type='button' onClick={closeGuestsModal}><X className='size-5 text-zinc-400 hover:text-zinc-300 transition-colors duration-300' /></button>
          </div>
          <p className='text-zinc-400 text-sm'>Os convidados irão receber e-mails para confirmar a participação na viagem.</p>
        </div>
        <ul className='flex flex-wrap gap-2'>
          {emailsToInvite.map(email => {
            return (
              <li key={email} className='flex items-center gap-3 py-1.5 px-2.5 bg-zinc-800 rounded-md text-sm'>
                <span className='leading-none text-zinc-300'>{email}</span>
                <button type='button' onClick={() => removeEmailFromInvites(email)}>
                  <X className='size-4 text-zinc-400 hover:text-zinc-300' />
                </button>
              </li>
            )
          })}
        </ul>
        <div className="h-px w-full bg-zinc-800"></div>
        <form onSubmit={addEmailToInvite} method='post' className="p-2.5 pl-4 bg-zinc-950 rounded-xl flex items-center gap-2 border border-zinc-800">
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