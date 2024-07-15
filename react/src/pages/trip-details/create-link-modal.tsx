import { Link2, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface CreateLinkModalProps {
  closeCreateLink: () => void
}

export function CreateLinkModal({ closeCreateLink }: CreateLinkModalProps) {
  const navigate = useNavigate()
  const { tripId } = useParams()

  function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const title = data.get('title')
    const url = data.get('url')

    api.post(`/trips/${tripId}/links`, {
      title,
      url
    })

    navigate(0)
  }

  return (
    <div onClick={closeCreateLink} className='bg-black/60 backdrop-blur flex items-center justify-center fixed inset-0'>
      <div onClick={(e) => e.stopPropagation()} className='max-w-xl w-full shadow-shape rounded-xl bg-zinc-900 p-6 space-y-5'>
        <div className="space-y-5">
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <h3 className='text-lg font-semibold'>Cadastrar link</h3>
              <button type='button' onClick={closeCreateLink}><X className='size-5 text-zinc-400 hover:text-zinc-300 transition-colors duration-300' /></button>
            </div>
            <p className='text-zinc-400 text-sm'>Todos convidados podem visualizar os links importantes.</p>
          </div>
          <form onSubmit={createLink} className="space-y-3">
            <div className="p-3 px-4 bg-zinc-950 rounded-xl flex items-center gap-2 border border-zinc-800">
              <Tag className='size-5 text-zinc-400' />
              <input className="text-lg placeholder-zinc-400 bg-transparent outline-none flex-1" type='text' name="title" placeholder="Título do link" />
            </div>
            <div className="p-3 px-4 bg-zinc-950 rounded-xl flex items-center gap-2 border border-zinc-800">
              <Link2 className='size-5 text-zinc-400' />
              <input className="text-lg placeholder-zinc-400 bg-transparent outline-none flex-1" type='url' name="url" placeholder="URL" />
            </div>
            <Button type="submit" variant="primary" size="full">
              Salvar link
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}