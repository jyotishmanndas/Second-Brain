import { AddContentModal } from "./modal/AddContent-modal";
import { InviteModal } from "./modal/Invite-modal";
import { Sidebar } from "./Sidebar";

export function Navbar() {
    return (
        <div className="w-full h-16 bg-white/60 backdrop-blur-md flex items-center px-4 justify-between fixed top-0 left-0 shadow-md z-50">
            <Sidebar />
            <div className="flex items-center gap-4">
                <InviteModal />
                <AddContentModal />
            </div>
        </div>
    )
}