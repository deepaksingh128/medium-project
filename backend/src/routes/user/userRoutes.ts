import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from '@deepak_singh18/medium-common';
import  bcrypt from 'bcryptjs'

export const userRoutes = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
}>();

userRoutes.post('/signup', async (c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
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
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const isAlreadyexists = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        });
        if(isAlreadyexists) {
            return c.json({
                success: false,
                message: "Email already exists!"
            });
        }
        const user = await prisma.user.create({
            data: {
                email: body.email,
                name: body.name,
                password: hashedPassword
            }
        });

        const jwt = await sign({id: user.id}, c.env.JWT_SECRET);

        return c.json({
            success: true,
            jwt
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return c.json({ success: false, message: error.message });
        } else {
            return c.json({ success: false, message: 'An unexpected error occurred' });
        }
    }
});

userRoutes.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success) {
        return c.json({
            success: false,
            message: "Inputs are not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            }
        });
        if(!user) {
            return c.json({ success: false, message: "Email or password is wrong!" });
        }

        const isMatch = await bcrypt.compare(body.password, user.password);
        if(!isMatch) {
            return c.json({ success: false, message: "Email or password is wrong!" });
        }

        const jwt = await sign({id: user.id}, c.env.JWT_SECRET);

        return c.json({
            success: true,
            jwt
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return c.json({ success: false, message: error.message });
        } else {
            return c.json({ success: false, message: 'An unexpected error occurred' });
        }
    }
});