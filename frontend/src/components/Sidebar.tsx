import { Brain, LogOut, Menu, User, } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import type { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";

interface SidebarLinks {
    id: number;
    name: string;
    href: string;
    icon: IconType
};

export const Links: SidebarLinks[] = [
    {
        id: 0,
        name: "Videos",
        href: "/dashboard/youtube",
        icon: FaYoutube
    },
    {
        id: 1,
        name: "Tweets",
        href: "/dashboard/tweet",
        icon: FaTwitter
    },
    {
        id: 2,
        name: "Profile",
        href: "/dashboard/profile",
        icon: User
    },
    {
        id: 3,
        name: "Profile",
        href: "/signup",
        icon: LogOut
    }
]

export function Sidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Menu className="w-6 h-6 cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] bg-[#eeeeef]">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-4">
                        <Brain className="h-10 w-10 text-[#262626]" />
                        <span className="text-2xl font-bold text-[#262626]">Brainly</span>
                    </SheetTitle>
                </SheetHeader>
               <div className="mt-6 flex flex-col gap-2 px-2">
               {Links.map((link) => (
                    <a
                        key={link.id}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-5 text-xl text-[#262626] py-2 px-6 mt-1 rounded-md transition-all",
                           location.pathname === link.href ? "bg-[#404040] text-white" : "hover:bg-[#d4d4d4] hover:text-[#262626]"
                        )}
                    >
                        <link.icon className="size-7" />
                        {link.name}
                    </a>
                ))}
               </div>
            </SheetContent>
        </Sheet>
    )
}