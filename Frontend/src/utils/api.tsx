import axios from "axios"


export default async function getListings(){
    try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/listings/api/all/`)
    return { success: true, status: response.status, data: response.data };}
    catch (err: unknown) {
        if (err instanceof Error) {
          return { success: false, error: err.message };
        }
        return { success: false, error: "Unknown error" };
      }
}