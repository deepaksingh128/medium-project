import { ChangeEvent, useState } from "react";

interface LabelledInputTypes {
    label: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    value: string
}

export function LabelledInput({label, placeholder, onChange, type, value}: LabelledInputTypes) {
    const [showPasswordHint, setShowPasswordHint] = useState(false);

    return <div>
        <label className="block mb-2 text-sm font-semibold text-black pt-4" >{label}</label>

        <input 
        type={type || "text"} 
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        onFocus={() => label === "Password" && setShowPasswordHint(true)}
        onBlur={() => label === "Password" && setShowPasswordHint(false)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        {label === "Password" && showPasswordHint && ( 
            <p className={`text-sm font-light pl-2 transition-opacity duration-300 ${
                showPasswordHint ? "opacity-100" : "opacity-0"
            }`}
            style={{
                height: "1.2rem", // Reserve space for the message (adjust based on font size)
                overflow: "hidden",
            }}
>
                Password must be atleast 6 characters long
            </p>
        )}
    </div>
}