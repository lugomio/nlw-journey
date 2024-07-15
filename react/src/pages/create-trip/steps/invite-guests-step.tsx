import { ArrowRight, UserRoundPlus } from "lucide-react"
import { Button } from "../../../components/button"

interface InviteGuestsStepProps {
  openGuestsModal: () => void
  emailsToInvite: string[]
  openConfirmTripModal: () => void
}

export function InviteGuestsStep({
  emailsToInvite,
  openConfirmTripModal,
  openGuestsModal
}: InviteGuestsStepProps) {
  return (
    <div className="h-16 bg-zinc-900 rounded-xl flex items-center gap-3 px-6 shadow-shape">
      <button type='button' onClick={openGuestsModal} className="flex gap-2 items-center flex-1">
        <UserRoundPlus className='size-5 text-zinc-400 shrink-0' />
        {emailsToInvite.length <= 0 ? (
          <span className="text-lg text-zinc-400 flex-1 text-left">Quem estará na viagem?</span>
        ) : (
          <span className="text-lg flex-1 text-left">{emailsToInvite.length} pessoa(s) convidada(s)</span>
        )}

      </button>
      <div className='w-px h-6 bg-zinc-800' />
      <Button onClick={openConfirmTripModal} variant="primary" size="small">
        Confirmar viagem
        <ArrowRight className='size-5' />
      </Button>
    </div>
  )
}