import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Users(){

    const [userData,setUserData] = useState("")
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get("http://localhost:3000/user",{
          withCredentials: true,
        }).then((response)=>{
            setUserData(response.data)
        })
    },[userData])

    return (
 
<div className="flex flex-col justify-center items-center h-screen bg-black">
<div className="border border-black w-4/12 rounded-lg">
  <div className="m-4 space-y-4 flex flex-col items-center">
    <div className="text-white text-2xl font-bold">
    {userData?.userId}
    </div>
        
    <div className="cursor-pointer px-36 py-2 bg-white border rounded-lg"
    onClick={async()=>{
      const res = await axios.post("http://localhost:3000/logout",{
        withCredentials: true,
      })
      toast.success(res.data.message)
      navigate("/")
    }}>Logout</div>
    
    <div className="text-center text-sm text-slate-200">
      By clicking on Continue, you  <span className="underline">Logout</span>
    </div>
  </div>
</div>
</div>
);
}
