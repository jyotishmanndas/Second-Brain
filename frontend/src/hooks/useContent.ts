import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface dataInterface {
    id: string,
    title: string,
    link: string,
    tags: string[],
}

export function useContent() {

    const [content, setContent] = useState<dataInterface[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        };
        axios.get("http://localhost:3000/allContent", {
            headers: {
                Authorization: token
            }
        })
            .then((res) => {
                setContent(res.data.allContents)
            })
    }, [navigate])

    return {
        content
    }
}