import { Hono } from "hono";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@deepak_singh18/medium-common";

export const blogRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string
    },
    Variables: {
        userId: string
    }
}>();

blogRoutes.use(authMiddleware);

blogRoutes.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success) {
        return c.json({
            message: "Inputs are not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const authorId = c.get('userId')
    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId),
                publishedDate: new Date()
            }
        });

        return c.json({
            success: true,
            message: "Blog created successfully",
            id: blog.id
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return c.json({ success: false, message: error.message });
        } else {
            return c.json({ success: false, message: 'An unexpected error occurred' });
        }
    }
});

blogRoutes.put('/', async (c) => {
    const body = await c.req.json();
    const { success, data } = updateBlogInput.safeParse(body);
    if(!success) {
        return c.json({
            success: false,
            message: "Inputs are not correct"
        });
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const updateData: { title?: string; content?: string } = {};
        if (data.title) updateData.title = data.title;
        if (data.content) updateData.content = data.content;

        if (Object.keys(updateData).length === 0) {
            return c.json({success: false, message: "No valid fields to update" });
        }

        const blog = await prisma.blog.update({
            where: {
                id: body.id
            },
            data: updateData
        });

        return c.json({
            success: true,
            message: "Blog updated successfully",
            id: blog.id
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return c.json({ success: false, message: error.message });
        } else {
            return c.json({ success: false, message: 'An unexpected error occurred' });
        }
    }
});

blogRoutes.get('/bulk', async (c) => {
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '10');

    if (page < 1 || limit < 1) {
        return c.json({success: false, message: 'Page and limit must be positive integers' });
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    try {
        const totalBlogs = await prisma.blog.count();
        const blogs = await prisma.blog.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                publishedDate: true,
                author: {
                    select: {
                        name: true
                    }
                }
            },
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {id : 'asc'}
        });

        return c.json({
            success: true,
            page,
            limit,
            totalBlogs,
            totalPages: Math.ceil(totalBlogs / limit),
            blogs,
            message: "Successfully fetched the blogs"
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return c.json({ success: false, message: error.message });
        } else {
            return c.json({ success: false, message: 'An unexpected error occurred' });
        }
    }
})

blogRoutes.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const id = c.req.param("id");

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                id: true,
                title: true,
                content: true,
                publishedDate: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });

        return c.json({
            success: true,
            blog
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return c.json({ success: false, message: error.message });
        } else {
            return c.json({ success: false, message: 'An unexpected error occurred' });
        }
    }
});

