import { useState } from "react"
import { crawlSite } from "../utils/api";


export default function Upload(){
    const [website, setWebsite] = useState("")
    const [message, setMessage] = useState("Find Jobs");
    const [tip, setTip] = useState("to enter more than one url separate by commas");
    const [loading, setLoading ] = useState(false);
    const [progress, setProgress] = useState("");
    const [sites, setSites] = useState<string[]>([]);
    const [currentSite, setCurrentSite] = useState<string | null>(null);
    const [completedSites, setCompletedSites] = useState<string[]>([]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setWebsite(e.target.value)
    }

    const crawl = async (e: React.FormEvent) => {
        e.preventDefault();       
        setLoading(true);
        setTip("this might take a few minutes, feel free to come back later...");
        setMessage("Crawling ...");
    
        const websiteList = website
            .split(",")
            .map(w => w.trim())
            .filter(w => w.length > 0);

        setSites(websiteList);
        setCompletedSites([]);
        setCurrentSite(null);
    
        let current = 1;
        const total = websiteList.length;
    
        setProgress(`Preparing crawl for ${total} site(s)...`);
    
        for (const site of websiteList) {
            setProgress(`Crawling ${site} (${current}/${total})`);
            setCurrentSite(site);
    
            const response = await crawlSite([site]);  
            setCompletedSites(prev => [...prev, site]);
    
            if (!response.success) {
                console.error(response.error);
                setMessage(`Failed on ${site}`);
                setLoading(false);
                return;
            }
    
            current++;
        }

        setCurrentSite(null);
        current +=-1
        setProgress("Completed!");
        setTip("to enter more than one url separate by commas");
        setMessage("All Websites Crawled!");
        setLoading(false);
    };
    
    
    return (
        <>
       <section className="h-screen flex flex-col items-center justify-center rounded-2xl p-4 bg-white">
        <div className={`${sites.length > 0 ? "flex gap-8 items-center":""}`}>
        <form action="" className="flex flex-col gap-2" onSubmit={crawl}>
        <div>
        <h1 className="font-bold text-2xl"> Enter website addresses to <span className="italic">crawl</span></h1>
        <p className="text-sm mb-3">tip: {tip}</p>
        
        <input type="text" onChange={handleChange} placeholder="Enter website link..." className={`${sites.length > 0 ?"hidden":"border-1 rounded-lg w-full border-black p-1"}`} />

        </div>
     
        <hr />
        <div>

        </div>
        <div>
            <button className="text-white p-4 rounded-lg py-1 w-full bg-[#2B50AA] cursor-pointer" type="submit">{message}</button>
        </div>
        </form>
        {sites.length > 0 && (
                <div className="p-6 bg-gray-50 rounded-xl space-y-3 w-full mt-6">
              
                  <p className="text-sm text-neutral-700">
                    Crawling {completedSites.length+1} / {sites.length} site(s)…
                  </p>
              
                  <div className="space-y-2">
                    {sites.map((site) => {
                      const isCurrent = currentSite === site;
                      const isDone = completedSites.includes(site);
              
                      return (
                        <div
                          key={site}
                          className={`
                            p-3 rounded-lg border text-sm transition
                            ${isCurrent ? "bg-yellow-50 border-yellow-200 text-yellow-700" : ""}
                            ${isDone ? "bg-green-50 border-green-200 text-green-700" : ""}
                            ${!isCurrent && !isDone ? "bg-gray-100 border-gray-200 text-gray-600" : ""}
                          `}
                        >
                          {site}
                        </div>
                      );
                    })}
                  </div>
              
                </div>
              )}
        </div>
   
          
              

           
        </section>

        </>


    )
}