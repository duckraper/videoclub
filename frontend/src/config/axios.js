import axios from "axios";
import {jwtDecode} from "jwt-decode"// Add missing import statement

const baseUrl = "http://127.0.0.1:8000/api/";

export const client = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

client.interceptors.request.use(
    async (config) => {
        const re_login = "auth/token/";
        const re_refresh = "auth/token/refresh/";

        if (
            config?.url.search(re_login) === -1 &&
            config?.url.search(re_refresh) === -1
        ) {
            let token = sessionStorage.getItem("access");

            const shouldRefresh = isRefreshNeeded(token);

            try {
                if (token && shouldRefresh.needRefresh) {
                    if (shouldRefresh.valid === false) {
                        token = await client.post("auth/token/refresh/", {
                            refresh: sessionStorage.getItem("refresh"),
                        });
                    }
                }
            } catch (e) {
                sessionStorage.removeItem("access");
                sessionStorage.removeItem("refresh");
                sessionStorage.removeItem("user");

                window.location
                    .replace(window.location.origin)
                    .then(() => window.location.reload());
            }

            if (token) {
                if (typeof token === "object") {
                    sessionStorage.setItem("access", token.data.access);
                    sessionStorage.setItem("refresh", token.data.refresh);

                    config.headers = {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token.data.access,
                    };
                } else {
                    config.headers = {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    };
                }
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export function isRefreshNeeded(token) {
    if (!token) {
        return { valid: false, needRefresh: true };
    }

    const decoded = jwtDecode(token);

    if (!decoded) {
        return { valid: false, needRefresh: true };
    }
    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        return { valid: false, needRefresh: true };
    }
    return { valid: true, needRefresh: false };
}