import { getFetch, httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { AppRouter } from "app.routes";
import superjson from "superjson";

export const trpc = createTRPCNext<AppRouter>({
  config({ ctx }) {
    const url = "http://localhost:3000/api/trpc/";

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            "x-ssr": "1",
          };
        }
        return {};
      },
      links: [
        httpBatchLink({
          url,
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: "include",
            });
          },
        }),
      ],
      transformer: superjson,
    };
  },
  ssr: true,
});
