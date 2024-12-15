import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";


export const authMiddleware = createMiddleware<{
    Bindings: {
        JWT_SECRET: string;
    };
    Variables: {
        userId: string;
    };
}>(async (c, next) => {
    const token = c.req.header('Authorization') || "";

    try {
        const user = await verify(token, c.env.JWT_SECRET);
        
        if (user && user.id) {
            c.set("userId", String(user.id));
        } else {
            c.status(401);
            return c.json({
                success: false,
                message: "You are not logged in",
            });
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            const statusCode = error.message.includes('Validation') ? 400 : 500;
            c.status(statusCode);
            return c.json({ success: false, message: error.message });
        } else {
            c.status(500);
            return c.json({ success: false, message: 'An unexpected error occurred' });
        }
    }

    await next();
});
