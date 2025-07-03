import { AddContentDialog } from "./modal/AddContent-Dialog";
import { InviteModal } from "./modal/Invite-modal";
import { Sidebar } from "./Sidebar";

export function Navbar() {
    return (
        <div className="w-full h-16 bg-white flex items-center px-4 justify-between fixed top-0 left-0">
            <Sidebar />
            <div className="flex items-center gap-4">
                <InviteModal />
                <AddContentDialog />
            </div>
        </div>
    )
}