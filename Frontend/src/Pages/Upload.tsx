import { useState } from "react"
import { crawlSite } from "../utils/api";
import * as XLSX from "xlsx";   // NEW


export default function Upload(){
    const [website, setWebsite] = useState("")
    const [message, setMessage] = useState("Find Jobs");
    const [tip, setTip] = useState("to enter more than one url separate by commas");
    const [loading, setLoading ] = useState(false);
    const [progress, setProgress] = useState("");
    const [jobs, setJobs] = useState(0);
    const [sites, setSites] = useState<string[]>([]);
    const [currentSite, setCurrentSite] = useState<string | null>(null);
    const [completedSites, setCompletedSites] = useState<string[]>([]);
    const [fileError, setFileError] = useState(""); // NEW

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setWebsite(e.target.value)
    }


    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const fileName = file.name.toLowerCase();

        setFileError("");

        try {
            let urls: string[] = [];

          
            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data);

           
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

           
            json.forEach((row: any) => {
                row.forEach((cell: any) => {
                    if (typeof cell === "string" && cell.includes(".")) {
                        urls.push(cell.trim());
                    }
                });
            });

            urls = urls.filter((u) => u.length > 0);

            if (urls.length === 0) {
                setFileError("No valid URLs found in file");
                return;
            }

            setWebsite(urls.join(", "));
        } catch (err) {
            console.error(err);
            setFileError("Could not read file. Use CSV or Excel only.");
        }
    };


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
            setJobs((prev)=> prev + response.data.data)
        }

        setCurrentSite(null);
        current -= 1
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
        

        <input 
            type="text" 
            onChange={handleChange} 
            placeholder="Enter website link..." 
            value={website}
            className={`${sites.length > 0 ?"hidden":"border-1 rounded-lg w-full border-black p-1"}`} 
        />


  
        {sites.length === 0 && (
            <div className="mt-3 flex items-center ">
                <p className="text-xs text-neutral-600 ">
                    Or upload a CSV/XLSX file
                </p>
                <input 
                    type="file"
                    accept=".csv, .xlsx, .xls"
                    onChange={handleFileUpload}
                    
                    className="p-2 rounded-3xl text-sm underline cursor-pointer"
                />
                {fileError && (
                    <p className="text-red-600 text-xs">{fileError}</p>
                )}
            </div>
        )}

        </div>
     
        <hr />

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
                        <div>
                            {isDone?<p className="text-sm">Found <span className="font-bold">{jobs}</span> jobs</p>:<></>}
                      
                        <div
                          key={site}
                          className={`
                            p-3 rounded-lg border text-sm transition
                            ${isCurrent ? "bg-blue-50 border-blue-200 text-blue-700" : ""}
                            ${isDone ? "bg-green-50 border-green-200 text-green-700" : ""}
                            ${!isCurrent && !isDone ? "bg-gray-100 border-gray-200 text-gray-600" : ""}
                          `}
                        >
                          {site}
                        </div></div>
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
