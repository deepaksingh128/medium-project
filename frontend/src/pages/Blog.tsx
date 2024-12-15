import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
import { } from "../hooks";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/Spinner";

const Blog = () => {
  const { id } = useParams();
  const {blog, loading} = useBlog({id: Number(id)});
  

  if(loading || !blog) {
    return <div>
      <Appbar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
          </div>
      </div>
    </div>
    
  }

  return (
    <div>
        <FullBlog blog={blog}/>
    </div>
  )
}

export default Blog