import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "app.routes";
import { createContext } from "createContext";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
