import React, {useState, useEffect} from "react";
import logo from "../../assets/logo pass.png";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ isLoggedIn }) {
    const [isHidden, setIsHidden] = useState("w-[22vw]");
    const [isHidden2, setIsHidden2] = useState(false);
    const [isHiddenArrow, setIsHiddenArrow] = useState("left-[20vw]");
    const [isArrow, setArrow] = useState(
        <>
            <i className="fa-solid fa-arrow-left"></i>
        </>
    )

    const navigate = useNavigate()

    const hidden = () => {
        // setIsHidden2(false);
        console.log(isHidden2)
        if (isHidden2 == false) {
            setIsHidden("w-[0vw]")
            setIsHiddenArrow("-left-[1.5vw]")
            setIsHidden2(true)
            setArrow(
                <>
                    <i className="fa-solid fa-arrow-right"></i>
                </>
            )
        } else if (isHidden2 == true) {
            setIsHidden("w-[22vw]")
            setIsHiddenArrow("left-[20vw]")
            setIsHidden2(false)
            setArrow(
                <>
                    <i className="fa-solid fa-arrow-left"></i>
                </>
            )
        }
    }

    const logout = () => {
        window.localStorage.clear();
        // window.localStorage.setItem("Login", false);
        window.location.href = "/login";
        // navigate('/login')
    }
    
    return (
        <aside>
            <nav className={`h-[100vh] ${isHidden} bg-f1 float-left overflow-y-hidden text-white transition-all`}>
                <button className={`border w-[5vw] rounded-full bg-red-500 mb-1 absolute ${isHiddenArrow} transition-all`} onClick={hidden}>
                    {isArrow}
                </button>
                <div className="container h-[10vh] bg-slate-500 flex justify-center mx-auto items-center">
                    <img src={logo} alt="logo pass manager" className="w-[4vw]"/>
                    <h1 className="font-bold text-xl">Password Manager</h1>
                </div>
                <div className="container flex flex-col items-center h-full">
                    <div className="container flex justify-start items-center h-[10vh] hover:bg-black">
                        <div className="container w-1/3 text-end">
                            <i className="fa-solid fa-user text-xl"></i>
                        </div>
                        <div className="container text-start w-1/2">
                            <a href="/" className="text-xl ml-3">Beranda</a>
                        </div>
                    </div>
                    <div className="container flex justify-start items-center h-[10vh] hover:bg-black">
                        <div className="container w-1/3 text-end">
                            <i className="fa-solid fa-lock text-xl"></i>
                        </div>
                        <div className="container text-start w-1/2">
                            <a href="/password" className="text-xl ml-3">All Password</a>
                        </div>
                    </div>
                    <div className="container flex justify-start items-center h-[10vh] hover:bg-black">
                        <div className="container w-1/3 text-end">
                            <i class="fa-solid fa-key text-xl"></i>
                        </div>
                        <div className="container text-start w-1/2">
                            <a href="/passgen" className="text-xl ml-3">Pass Generator</a>
                        </div>
                    </div>

                    {isLoggedIn && (
                        <>
                            <button onClick={logout}>
                                Logout
                            </button>
                        </>
                    )}

                </div>
            </nav>
        </aside>
    )
}