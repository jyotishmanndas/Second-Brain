import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useContent } from "@/hooks/useContent";
import { CopyIcon, Edit, Trash } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export function Dashboard() {

    const { authenticated, loading } = useAuth();
    const { content } = useContent();

    console.log('Dashboard render - loading:', loading, 'authenticated:', authenticated);
    console.log('Content:', content);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl font-semibold">Loading...</p>
            </div>
        );
    }
    return (
        <>
            {authenticated && (
                <div className="h-screen w-full flex flex-wrap justify-start gap-3 mt-20 pl-20">
                    {content.map((content) => {
                        const youtube = content.link.includes("youtube.com");
                        const twitter = content.link.includes("twitter.com") || content.link.includes("x.com");
                        
                        return (
                            <Card className="w-96 h-[400px]" key={content.id}>
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">

                                        <div className="flex">
                                            {youtube && <FaYoutube className="w-4 h-4" />}
                                            {twitter && <FaTwitter className="w-4 h-4" />}
                                        </div>

                                        <span className="text-center">{content.title}</span>
                                        <div className="flex gap-3">
                                            <CopyIcon className="w-4 h-4" />
                                            <Edit className="w-4 h-4" />
                                            <Trash className="w-4 h-4" />
                                        </div>
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
                                <CardFooter>
                                    #{content.tags}
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            )}
        </>
    )
}