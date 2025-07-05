import { DeleteContentModal } from "@/components/modal/DeleteContent-modal";
import { EditContentDialog } from "@/components/modal/EditContent-modal";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useContent } from "@/hooks/useContent";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export function Dashboard() {

    const { authenticated, loading } = useAuth();
    const { content } = useContent();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl font-semibold">Loading...</p>
            </div>
        );
    };

    const formatDate = (isoString: string): string => {
        const date = new Date(isoString);
        return date.toLocaleDateString("en-GB");
    };

    return (
        <>
            {authenticated && (
                <div className="min-h-screen w-full flex flex-wrap justify-start gap-3 pt-20 pl-20 pb-10 bg-[#eeeeef]">
                    {content.map((content) => {
                        const youtube = content.link.includes("youtube.com");
                        const twitter = content.link.includes("twitter.com") || content.link.includes("x.com");

                        return (
                            <Card className="w-80 h-[400px]" key={content.id}>
                                <CardHeader>
                                    <CardTitle className="flex justify-between items-center">

                                        <div className="flex">
                                            {youtube && <FaYoutube className="w-4 h-4" />}
                                            {twitter && <FaTwitter className="w-4 h-4" />}
                                        </div>

                                        <span className="text-center">{content.title}</span>
                                        <div className="flex gap-3">
                                            <EditContentDialog id={content.id} />
                                            <DeleteContentModal id={content.id} />
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

                                    #{content.tags}
                                </CardContent>
                                <CardFooter className="text-muted-foreground">
                                    Added on {formatDate(content.createdAt)}
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            )}
        </>
    )
}