import { SignupInput } from "@deepak_singh18/medium-common"
import { useState } from "react"
import { LabelledInput } from "./LabelledInput"
import { AuthHeader } from "./AuthHeader"
import axios from "axios"
import { BACKEND_URL } from "../config/appConfig"

import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


export const SignupAuth = () => {
    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        email: "",
        password: ""
    });

    const onSubmit = async () => {
      try {
        const { data } = await axios.post(BACKEND_URL + '/api/v1/user/signup', postInputs);
        if(data.success) {
          localStorage.setItem('token', data.jwt);
          navigate('/blogs')
        } else {
          toast.error(data.message);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(error.message);
        } else {
            toast.error("An unexpected error has occured")
        }
      }
    }

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div className="flex flex-col justify-center">

          <AuthHeader type="signup" />

          <LabelledInput label="Name" type="text" value={postInputs.name || ""} placeholder="deepak singh..." onChange={(e) => setPostInputs({...postInputs, name: e.target.value})}
          />

          <LabelledInput label="Email" placeholder="example@.com" value={postInputs.email} type="text" onChange={(e) => setPostInputs({...postInputs, email: e.target.value})}
          />

          <LabelledInput label="Password" value={postInputs.password} type="password" placeholder="******" onChange={(e) => setPostInputs({...postInputs, password: e.target.value})}
          />

          <button onClick={onSubmit} type="button" className="w-full mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign up</button>

            </div>
        </div>
      </div>
  )
}




