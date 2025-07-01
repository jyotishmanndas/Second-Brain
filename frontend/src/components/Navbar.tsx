import { AddContentDialog } from "./modal/AddContent-Dialog";
import { Sidebar } from "./Sidebar";

export function Navbar() {

    return (
        <div className="w-full h-16 bg-amber-500 flex items-center px-4 justify-between fixed top-0 left-0">
            <Sidebar />
            <div className="flex items-center">
                <AddContentDialog />
            </div>
        </div>
    )
}