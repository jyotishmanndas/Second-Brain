import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { Check, Copy } from "lucide-react";

export function InviteModal() {

  const [link, setlink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/invite/link", {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then((res) => {
        setlink(res.data.link)
      })
  }, []);

  const inviteUrl = `http://localhost:5173/invite/${link}`
  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(inviteUrl);
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">Share</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              defaultValue={inviteUrl}
              readOnly
            />
          </div>
          <Button onClick={onCopy} type="submit" size="sm" className="px-3">
            {copied ? <Check /> : <Copy />}
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}