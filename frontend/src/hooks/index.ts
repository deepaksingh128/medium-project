import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config/appConfig";

export interface Blog {
    id: number,
    title: string,
    content: string,
    publishedDate: Date,
    author: {
        name: string
    }
}

export const useBlog = ({id}: {id: Number}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setBlog(response.data.blog);
            setLoading(false);
        })
    }, [id]);

    return {
        blog,
        loading
    }
}


export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(BACKEND_URL + '/api/v1/blog/bulk', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);
            })
    },[]);

    return {
        loading,
        blogs 
    }
}