import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton"

const Blogs = () => {
  const {blogs, loading} = useBlogs();

  if(loading) {
    return <div>
      <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
    </div> 
  }

  return (
    
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-lg">
          {blogs.map((blog) => <BlogCard 
            id={blog.id}
            key={blog.id}
            title={blog.title}
            content={blog.content}
            publishedDate={new Date(blog.publishedDate).toISOString().split('T')[0]}
            authorName={blog.author.name}
          />)}
        </div>
      </div>
    </div>
  )
}

export default Blogs
