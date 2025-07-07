import { Eye, EyeOff, Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useState } from "react";
import { profileUpdateSchema } from "@/lib/zod";
import type { z } from "zod";
import axios from "axios";
import { toast } from "sonner";


export function ProfileUpdateForm() {
    const [loading, setLoading] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<z.infer<typeof profileUpdateSchema>>({
        mode: "onChange",
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            name: "",
            newPassword: "",
            confirmPassword: ""
        }
    });

    const { isValid } = form.formState;

    async function onSubmit(values: z.infer<typeof profileUpdateSchema>) {
        try {
            setLoading(true);
            await axios.patch("http://localhost:3000/updateprofile", values, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            form.reset();
            toast.success("Profile updated successfully", {
                position: "bottom-center"
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        };
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Edit Profile</CardTitle>
                <CardDescription>
                    Enter your details to update your profile
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="jhon doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input type={showNewPassword ? "text" : "password"} placeholder="******" {...field} />
                                            </FormControl>
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword((prev) => !prev)}
                                                className="absolute right-2 top-2 text-gray-500"
                                            >
                                                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <div className="relative">
                                            <FormControl>
                                                <Input type={showConfirmPassword ? "text" : "password"} placeholder="******" {...field} />
                                            </FormControl>
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                className="absolute right-2 top-2 text-gray-500"
                                            >
                                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={!isValid} className="w-full cursor-pointer" type="submit">
                            {loading && (
                                <Loader className="w-4 h-4 animate-spin" />
                            )}
                            Update
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}