import { t } from "./createRouter";

export const appRouter = t.router({
  hello: t.procedure.query(async ({ ctx }) => {
    const message = "hello there...";
    return { message };
  }),
});

export type AppRouter = typeof appRouter;
