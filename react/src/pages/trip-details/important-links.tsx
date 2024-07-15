import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface Link {
  id: string,
  title: string,
  url: string
}

interface ImportantLinksProps{
  openCreateLink: () => void
}

export function ImportantLinks({ openCreateLink }: ImportantLinksProps) {

  const { tripId } = useParams()

  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>
      <ul className="space-y-5">
        {links.map(link => {
          return (
            <li key={link.id} className="flex items-center justify-between">
              <div className="flex flex-col gap-1.5 max-w-60">
                <h3 className="text-zinc-100">{link.title}</h3>
                <span className="truncate text-xs text-zinc-400">{link.url}</span>
              </div>
              <a href={link.url} target="_blank"><Link2 className="size-5 text-zinc-400 hover:text-zinc-300" /></a>
            </li>
          )
        })}
      </ul>
      <Button onClick={openCreateLink} variant="secondary" size="full">
        <Plus className='size-5' />
        Cadastrar atividade
      </Button>
    </div>
  )
}