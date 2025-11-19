import axios from "axios"


export async function getListings(){
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


export async function crawlSite(websites:string[]) {
  console.log(websites, "hi")
  try{
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/scrapper/api/scrape/`,
      {websites} 
    )
    return { success: true, status: response.status, data: response.data };}
    catch (err: unknown) {
      if (err instanceof Error) {
        return { success: false, error: err.message };
      }
      return { success: false, error: "Unknown error" };
    }

  }
  
