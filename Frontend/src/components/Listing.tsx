import getListings from "../utils/api";
import { useEffect, useState } from "react";

export default function Listing() {
  const [listings, setListings] = useState<any[]>([]);

  const getData = async () => {
    const data = await getListings();
    if (data.success) {
      setListings(data.data); // no need to JSON.parse
    } else {
      console.error(data.error);
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
              className="p-4 pl-0 border-b-1 border-neutral-900 flex justify-between"
            >
            <div>
              <h2 className="font-bold text-lg text-neutral-900">{job.title}</h2>
              <p>{job.description}</p>
              <p className="text-sm text-gray-500">{job.date}</p>
            </div>
            <div>
                <a href={`${job.link}`} >Link</a>
            </div>
            </div>
            
          ))}
        </div>
      )}
    </>
  );
}
