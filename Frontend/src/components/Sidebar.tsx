import dashboard from "../assets/dashboard.svg"
import upload from "../assets/upload.svg"

interface SidebarProps {
    setActive: (value: "dashboard" | "upload") => void;
  }

export default function Sidebar({ setActive }: SidebarProps){
    return (
       <>
       <aside className="min-h-screen  sticky top-0  p-1 bg-gray-100">
        <div className="p-2 bg-[#40434E] rounded-2xl min-h-full flex flex-col ">
            <div>
                <h1 className="text-white font-ops">JOBBOT</h1>

            </div>
            <hr className="text-white"/>
            <div className="flex flex-col gap-1.5 mt-3 rounded-2xl">
                <button className="flex items-center gap-1 text-left bg-white text-black rounded-sm text-sm p-2 hover:bg-gray-100"  onClick={() => setActive("dashboard")}> <img src={dashboard} alt=""  className="w-7"/>Dashboard</button>
                <button className="flex items-center gap-3 text-left bg-white text-black rounded-sm text-sm p-3 hover:bg-gray-100"  onClick={() => setActive("upload")}><img src={upload} alt=""  className="w-5"/> Upload</button>
            </div>

        </div>

       </aside>
       </>
)
}