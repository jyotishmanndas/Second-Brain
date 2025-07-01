import type { z } from "zod";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import axios from "axios";
import { contentSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function AddContentDialog() {

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
      console.log(values);

    } catch (error) {
      console.log(error);
    } finally {
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="cursor-pointer">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add Content</DialogTitle>
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
                      <Input placeholder="shadcn" {...field} />
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
                      <Input placeholder="shadcn" {...field} />
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
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className=" flex ml-auto">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}