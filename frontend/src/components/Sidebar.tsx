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
            <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-4">
                        <Brain className="h-10 w-10" />
                        <span className="text-2xl font-bold">Brainly</span>
                    </SheetTitle>
                </SheetHeader>
                {Links.map((link) => (
                    <a
                        key={link.id}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-5 text-xl text-red-400 py-2 px-6 mt-1 rounded-md transition-all border",
                           location.pathname === link.href ? "text-green-300 bg-gray-300" : "text-yellow-300 hover:bg-red-600"
                        )}
                    >
                        <link.icon className="size-7" />
                        {link.name}
                    </a>
                ))}
            </SheetContent>
        </Sheet>
    )
}