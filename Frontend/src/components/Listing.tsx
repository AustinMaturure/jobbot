import {getListings} from "../utils/api";
import { useEffect, useState } from "react";
import linkArrowUp from '../assets/link-up-arrow.svg'
import clock from "../assets/clock.svg"
import location from "../assets/location.svg"
import { pastelColorFromString } from "../utils/formatters";
import { formatDate } from "../utils/formatters";

export default function Listing() {
  const [listings, setListings] = useState<any[]>([]);
  const [message, setMessage] = useState("Find Jobs");
  const [loading, setLoading ] = useState(false);

  const getData = async () => {
    setLoading(true)
    const data = await getListings();
    if (data.success) {
      setListings(data.data); 
      setLoading(false)
    } else {
      console.error(data.error);
      setLoading(false)
    }
  };

  useEffect(() => {
    getData();
  }, []);

  

  return (
    <>
      {listings.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-2 bg-white rounded-2xl p-4">
          {listings.map((job: any, index: number) => (
            <div
              key={index}
              className="p-4 pl-0 border-b-1 border-neutral-900 flex justify-between gap-2"
            >
            <div>
              <div className="flex items-center gap-3" >
                 <h2 className="font-bold text-lg text-neutral-900">{job.title}</h2> 
                 <p className="px-1 rounded-lg " style={{ backgroundColor: pastelColorFromString(job.company) }}>@{job.company}</p>
                 
                  
               
              </div>
             
              <p className="text-black line-clamp-1">{job.description}</p>
              <div className="flex text-black gap-2 mt-3 items-center">
              <div>
                 <p className="font-bold text-sm">{job.seniority}</p> 
                </div>
                <div className="flex items-center justify-between gap-1  border-1 p-1 px-3 rounded-2xl">
                    <img src={clock} alt="" className="w-6" />
                     <h1 className=" text-sm">{job.length}</h1>
                </div>
                <div className="flex items-center border-1 justify-between gap-1  p-1 px-3 rounded-2xl">
                    <img src={location} alt="" className="w-6"/>
                    <h1 className="l text-sm">{job.location}</h1>
                </div>
                <div>
                <p style={{color:`${formatDate(job.date).text}`, backgroundColor:`${formatDate(job.date).bg}`}} className="text-sm p-1 rounded-lg">{job.date ? formatDate(job.date).date:""}</p>
                </div>
              
                
              </div>
            </div>
            <div className="hover:underline flex items-center">
                <a href={`${job.link}`} className=" text-black font-black ">Link</a>
                <img src={linkArrowUp} alt="link arrow up icon" />
            </div>
            </div>
            
          ))}
        </div>
      )}
    </>
  );
}
