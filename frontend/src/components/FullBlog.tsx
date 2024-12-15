import { Appbar } from "./Appbar"
import { Blog } from "../hooks"
import { Avatar } from "./Avatar"

export const FullBlog = ({blog}: {blog:Blog}) => {
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                        {blog.title}
                    </div>
                    <div className="text-slate-500 pt-2">
                        Post on {new Date(blog.publishedDate).toISOString().split('T')[0]}
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="text-slate-600 text-lg">
                        Author
                    </div>
                    <div className="flex w-full">
                        <div className="flex flex-col justify-center pr-4">
                            <Avatar name={blog.author.name} size="big" />
                        </div>
                        <div>
                            <div className="text-xl font-bold">
                                {blog.author.name}
                            </div>
                            <div className="text-slate-500 pt-2">
                                Read the blog and you will feel good.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}