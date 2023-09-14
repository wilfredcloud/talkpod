import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const useAuth = (failRedirectTo?: string, successRedirectTo?: string) => {
    const navigate = useNavigate();

    const redirect = () => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate(successRedirectTo || "/");
        }else {
            navigate(failRedirectTo || "/signin");
        }
    }
    useEffect(() => {
        redirect();
        addEventListener("storage", (env) => {
            if (env.key === "token") {
                redirect()
            }
        });
        removeEventListener("storage", (env) => {
            if (env.key === "token") {
                redirect()
            }
        })
    }, [])

}

export default useAuth;
