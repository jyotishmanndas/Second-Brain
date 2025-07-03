import type { z } from "zod";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import axios from "axios";
import { contentSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Edit } from "lucide-react";

export function EditContentDialog({ id }: { id: string }) {

    const form = useForm<z.infer<typeof contentSchema>>({
        resolver: zodResolver(contentSchema),
        defaultValues: {
            title: "",
            link: "",
            tags: []
        },
    });

    async function onSubmit(values: z.infer<typeof contentSchema>) {
        try {
            await axios.put(`http://localhost:3000/updateContent/${id}`, values, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            form.reset();
            toast.success("post updated successfully");
            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Edit className="w-4 h-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] w-[360px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Edit Content</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="link"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="link" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tags"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="tags" onChange={(e) => {
                                                field.onChange(e.target.value.split(",").map((tag) => tag.trim()))
                                            }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type="submit" className="flex ml-auto cursor-pointer">
                            Submit
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
