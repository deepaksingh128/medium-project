import { Hono } from 'hono'
import { userRoutes } from './user/userRoutes';
import { blogRoutes } from './blog/blogRoutes';

export const v1Routes = new Hono();

v1Routes.route('/user', userRoutes);
v1Routes.route('/blog', blogRoutes);