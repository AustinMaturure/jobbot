import { useState } from 'react'
import Sidebar from "./components/Sidebar";
import Home from './pages/Home.jsx'
import Upload from './pages/Upload.js';


function App() {
  const [active, setActive] = useState("dashboard");
 

  return (
     <section className="w-screen h-screen grid grid-cols-[16rem_1fr]">
      <Sidebar setActive={setActive} />

      <main className="flex-1 p-4 bg-gray-100 h-screen overflow-auto">
        {active === "dashboard" && <Home />}
        {active === "upload" && <Upload />}
      </main>
    </section>
  )
}

export default App
