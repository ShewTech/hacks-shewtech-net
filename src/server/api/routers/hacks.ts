import { hacks } from '~/hacks';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const hacksRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return hacks
      .filter((hack) => hack.visible)
      .map((hack) => ({
        id: hack.id,
        name: hack.name,
        functions: hack.functions,
      }));
  }),
});
