import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";

interface dataInterface {
    id: string,
    title: string,
    link: string,
    tags: string[],
    createdAt: string,
}

export function InvitePage() {

    const [data, setData] = useState<dataInterface[]>([])
    const { id } = useParams();

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-GB");
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/invite/${id}`)
            .then((res) => {
                setData(res.data.content)
            });
    }, [])
    return (
        <div className="min-h-screen w-full flex flex-wrap justify-start gap-3 pt-10 pl-20 pb-10 bg-[#eeeeef]">
            {data.map((content) => {
                const youtube = content.link.includes("youtube.com");
                const twitter = content.link.includes("twitter.com") || content.link.includes("x.com");

                return (
                    <Card className="w-80 h-[400px]" key={content.id}>
                        <CardHeader>
                            <CardTitle className="flex item-center">
                                <div className="flex items-center">
                                    {youtube && <FaYoutube className="w-4 h-4" />}
                                    {twitter && <FaTwitter className="w-4 h-4" />}
                                </div>

                                <span className="mx-auto truncate">{content.title}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-60 overflow-y-auto">
                            {youtube && (
                                <iframe
                                    className="w-full h-full"
                                    width="560"
                                    height="315"
                                    src={content.link}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                />
                            )}

                            {twitter && (
                                <blockquote className="twitter-tweet">
                                    <a href={content.link.replace("x.com", "twitter.com")}></a>
                                </blockquote>
                            )}
                        </CardContent>
                        <CardFooter className="text-muted-foreground flex flex-col items-start">
                            <div className="flex items-center">
                                {content.tags.map((tag, index) => (
                                    <Badge key={index} className="m-1">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                            <div className="text-sm mt-3">
                                Added on {formatDate(content.createdAt)}
                            </div>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
    )
};