import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateActiviyModal } from "./create-activity-modal";
import { ImportantLinks } from "./important-links";
import { Guests } from "./guests";
import { ActivityList } from "./activity-list";
import { DestinationAndDate } from "./destination-and-date";
import { Button } from "../../components/button";
import { ManageGuestsModal } from "./mange-guests-modal";
import { CreateLinkModal } from "./create-link-modal";
import { useNavigate } from "react-router-dom";
import { ChangeTripModal } from "./change-trip-modal";

export function TripDetailsPage() {
  const navigate = useNavigate()

  const [isCreateActivityOpen, setIsCreateActivityOpen] = useState(false)
  const [isManageGuestsOpen, setIsManageGuestsOpen] = useState(false)
  const [isCreateLinkOpen, setIsCreateLinkOpen] = useState(false)
  const [isChangeTripOpen, setIsChangeTripOpen] = useState(false)

  function openCreateActivity() {
    setIsCreateActivityOpen(true)
  }

  function closeCreateActivity() {
    setIsCreateActivityOpen(false)
  }

  function openManageGuests() {
    setIsManageGuestsOpen(true)
  }

  function closeManageGuests() {
    navigate(0)
  }

  function openCreateLink() {
    setIsCreateLinkOpen(true)
  }

  function closeCreateLink() {
    setIsCreateLinkOpen(false)
  }

  function openChangeTrip() {
    setIsChangeTripOpen(true)
  }

  function closeChangeTrip() {
    setIsChangeTripOpen(false)
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <DestinationAndDate openChangeTrip={openChangeTrip} />
      <main className="flex gap-16 px-6 flex-wrap">
        <div className="flex-1 space-y-6 min-w-96">
          <div className="flex justify-between items-center gap-4">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button onClick={openCreateActivity} variant="primary" size="small">
              <Plus className='size-5' />
              Cadastrar atividade
            </Button>
          </div>
          <ActivityList />
        </div>
        <div className="max-w-none lg:max-w-80 w-full space-y-6">
          <ImportantLinks openCreateLink={openCreateLink} />
          <div className="w-full h-px bg-zinc-800"></div>
          <Guests
            openManageGuests={openManageGuests}
          />
        </div>
      </main>

      {isCreateActivityOpen && (
        <CreateActiviyModal
          closeCreateActivity={closeCreateActivity}
        />
      )}

      {isManageGuestsOpen && (
        <ManageGuestsModal closeManageGuests={closeManageGuests} />
      )}

      {isCreateLinkOpen && (
        <CreateLinkModal closeCreateLink={closeCreateLink} />
      )}

      {isChangeTripOpen && (
        <ChangeTripModal closeChangeTrip={closeChangeTrip} />
      )}

    </div>
  )
}