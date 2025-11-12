import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

export default function Home(){
    return (
        <>
       <section className="w-screen h-screen grid grid-cols-[16rem_1fr]">
            <Sidebar />  
            <Main />      
        </section>

        </>


    )
}