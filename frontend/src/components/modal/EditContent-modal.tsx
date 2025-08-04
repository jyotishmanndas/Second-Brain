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
import { Edit, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";

export function EditContentDialog({ id }: { id: string }) {
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const form = useForm<z.infer<typeof contentSchema>>({
        mode: "onChange",
        resolver: zodResolver(contentSchema),
        defaultValues: {
            title: "",
            link: "",
            tags: []
        },
    });
    const { isValid } = form.formState;

    const addTag = (tag: string) => {
        const trimmedTag = tag.trim();
        if (trimmedTag && !trimmedTag.includes(trimmedTag)) {
            const newtag = [...tags, trimmedTag]
            setTags(newtag);
            form.setValue("tags", newtag);
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        const newTag = tags.filter(tag => tag !== tagToRemove);
        setTags(newTag);
        form.setValue("tags", newTag);
    };

    const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag(tagInput);
        }
    };

    async function onSubmit(values: z.infer<typeof contentSchema>) {
        try {
            await axios.put(`http://localhost:3000/content/updateContent/${id}`, values, {
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
                                            <div className="space-y-2">
                                                <Input
                                                    placeholder="Edit tags"
                                                    value={tagInput}
                                                    onChange={(e) => setTagInput(e.target.value)}
                                                    onKeyDown={handleTagInputKeyDown}
                                                />
                                                {tags.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 p-2 border rounded-md min-h-[40px]">
                                                        {tags.map((tag, index) => (
                                                            <Badge
                                                                key={index}
                                                                variant="secondary"
                                                                className="flex items-center gap-1"
                                                            >
                                                                {tag}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeTag(tag)}
                                                                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                                                                >
                                                                    <X size={12} />
                                                                </button>
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={!isValid} type="submit" className="flex ml-auto cursor-pointer">
                            Submit
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
