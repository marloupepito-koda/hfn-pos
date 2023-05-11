import axios from "axios";

export async function useTimer(data) {
    try {
        await axios.patch("/api/end_session");
        return "success";
    } catch (error) {
        return "error";
    }
}
