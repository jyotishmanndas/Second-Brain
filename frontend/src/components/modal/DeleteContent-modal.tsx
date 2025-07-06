import { Trash } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import axios from "axios";
import { toast } from "sonner";

export function DeleteContentModal({ id }: { id: string }) {

    const onSubmit = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3000/content/deleteContent/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            toast.success("Delete successfully")
            window.location.reload();
        } catch (error) {
            console.log(error);
            toast.error("error")
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Trash className="w-4 h-4 cursor-pointer" />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        post and remove your data from your servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => onSubmit(id)}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
