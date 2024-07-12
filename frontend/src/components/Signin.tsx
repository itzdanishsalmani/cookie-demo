import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// InputField Component
const InputField = ({ type, placeholder, onChange }):any => (
    <input
      type={type}
      placeholder={placeholder}
      onChange={ onchange }
      className="px-11 text-slate-200 py-2 bg-black border rounded-lg"
    />
  );
  
  // Signin Component
  export function Signin() {
    const [email,setEmail] = useState<String>("");
    const [password,setPassword] = useState<String>("");
    const navigate = useNavigate()

    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black">
        <div className="border border-black w-4/12 rounded-lg">
          <div className="m-4 space-y-4 flex flex-col items-center">
            <div className="text-white text-2xl font-bold">Create an account</div>
            <div className="text-slate-200 text-sm">Enter your credentials to create an account</div>
            
            <InputField type="text" placeholder="name@example.com" onChange={(e)=>{
              setEmail(e.target.value)
            }} />
            <InputField type="password" placeholder="password"     onChange={(e)=>{
              setPassword(e.target.value)
            }} />
            
            <div className="cursor-pointer px-36 py-2 bg-white border rounded-lg"
            onClick={async()=>{
              const res = await axios.post("http://localhost:3000/signin",{
                email,
                password,
              },{
                withCredentials:true,
              })
              console.log(res.data)
              toast.success(res.data.message)
              navigate("/users")
            }}>Sign in</div>
            
            <div className="text-center text-sm text-slate-200">
              By clicking on Continue, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy policy.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  