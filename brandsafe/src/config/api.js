export const SERVER = window.location.hostname === "localhost" ? 'http://localhost:8081' : ""

export const header = {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
}
