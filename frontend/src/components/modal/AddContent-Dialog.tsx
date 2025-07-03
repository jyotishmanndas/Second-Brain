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
// import { Textarea } from "../ui/textarea";
// import { Badge } from "../ui/badge";

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
      await axios.post(`http://localhost:3000/content`, values, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      form.reset();
      toast.success("post create successfully");
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  };

  // const tags = form.watch("tags");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="cursor-pointer">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[360px]">
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
              {/* <div className="h-52 w-72 border">
                {tags.map((tag)=>(
                    <Badge key={tag}>{tag}</Badge>
                ))}
            </div> */}
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
