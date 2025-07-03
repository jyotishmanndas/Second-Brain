import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function useAuth() {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }

        axios.get(`http://localhost:3000/auth/validate`, {
            headers: {
                Authorization: token
            }
        })
            .then(res => {
                if (!res.data.valid) {
                    localStorage.removeItem("token");
                    navigate("/signin");
                } else {
                    setAuthenticated(true)
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/signin");
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [navigate]);

    return {
        authenticated,
        loading
    }
};