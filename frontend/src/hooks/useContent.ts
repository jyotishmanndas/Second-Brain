import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface dataInterface {
    id: string,
    title: string,
    link: string,
    tags: string[],
    createdAt: string
}

export function useContent() {
    const [content, setContent] = useState<dataInterface[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        };

        setLoading(true);
        setError(null);

        axios.get("http://localhost:3000/content/allContent", {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                setContent(res.data.allContents);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching content:", err);
                setError(err.response?.data?.message || "Failed to fetch content");
                setLoading(false);
            });
    }, [navigate]);

    return {
        content,
        loading,
        error
    }
};