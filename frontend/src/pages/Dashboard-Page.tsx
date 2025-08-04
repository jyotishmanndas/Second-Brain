import { DeleteContentModal } from "@/components/modal/DeleteContent-modal";
import { EditContentDialog } from "@/components/modal/EditContent-modal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useContent } from "@/hooks/useContent";
import { FaYoutube } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

export function Dashboard() {

    const { authenticated, loading: authLoading } = useAuth();
    const { content, loading: contentLoading, error } = useContent();

    if (authLoading || contentLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl font-semibold">Loading...</p>
            </div>
        );
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-xl font-semibold text-red-600">Error: {error}</p>
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
                <>
                    {content && content.length > 0 ? (
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

                                                <span className="text-center truncate">{content.title}</span>
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
                    ) : (
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="text-center">
                                <p className="text-2xl font-semibold text-gray-600 mb-2">No Content Found</p>
                                <p className="text-gray-500">Start by adding some content to your dashboard!</p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}