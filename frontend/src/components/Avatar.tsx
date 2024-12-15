export const Avatar = ({name, size}: {name: string, size: "small" | "big"}) => {
    return (        
        <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
            <span className={`${size === "small" ? "text-xs" : "text-md"}font-extralight text-gray-600 dark:text-gray-300`}>{name[0].toUpperCase()}</span>
        </div>
    )
}