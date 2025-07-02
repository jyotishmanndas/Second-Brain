import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin")
        };
    }, [navigate])

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
           <h1>Jyotishmans</h1>
        </div>
    )
}