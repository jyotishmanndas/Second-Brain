import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useState } from "react";
import { signUpSchema } from "@/lib/zod";
import type { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export function SignUpForm() {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    });
    async function onSubmit(values: z.infer<typeof signUpSchema>) {
        try {
            setLoading(true);
            const res = await axios.post("http://localhost:3000/signup", values);
            const token = res.data.token;
            if (token) {
                localStorage.setItem("token", token);
                form.reset();
                toast.success("Account created successfully!");
                navigate("/dashboard")
            };
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status == 400) {
                toast("Email already Registered", {
                    description: "This email is already in use. Please try signing in or using a different email."
                })
            } else {
                toast("Uh oh! Something went wrong.", {
                    description: "There was a problem with your request.",
                })
            }
        } finally {
            setLoading(false)
        };
    };
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Create a new account</CardTitle>
                <CardDescription>
                    Enter your details below to create a new account
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
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="jhondoe@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="******" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className="w-full cursor-pointer" type="submit">
                            {loading && (
                                <Loader className="w-4 h-4 animate-spin" />
                            )}
                            Sign Up
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <a href="/signin" className="underline underline-offset-4">
                            Sign in
                        </a>
                    </div>
                </Form>
            </CardContent>
        </Card>
    )
}