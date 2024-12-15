import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps  {
    id: number,
    authorName: string;
    title: string;
    content: string;
    publishedDate: String;
}

export const BlogCard = ({
    id,
    title,
    content,
    publishedDate,
    authorName,
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`} >
            <div className="p-4 border-b border-slate-200 pb-4">
                <div className="flex">
                    <div className="flex flex-col justify-center">
                        <Avatar name={authorName} size="small"/>
                    </div> 
                    <div className="flex justify-center">
                        <div className="flex flex-col justify-center font-extralight pl-2">
                            {authorName}
                        </div> 
                        <div className="flex flex-col justify-center pl-2">
                            <Circle />
                        </div>
                        <div className="flex flex-col justify-center text-slate-500 pl-2 font-thin">
                            {String(publishedDate)}
                        </div>
                    </div>
                </div>
                <div className="text-xl font-semibold pt-2">
                    {title}
                </div>
                <div className="text-md font-thin">
                    {content.slice(0, 100) + "..."}
                </div>
                <div className="pt-4 text-sm font-thin text-slate-500">
                    {`${Math.ceil((content.length / 100))} minute(s) read`}
                </div>
            </div>
        </Link>
    )
}

export function Circle() {
    return (
        <div className="h-1 w-1 rounded-full bg-slate-400">
        </div>
    )
}
