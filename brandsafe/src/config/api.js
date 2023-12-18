export const SERVER = window.location.hostname === "localhost" ? 'http://localhost:3000' : ""

export const header = {
    headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
}
