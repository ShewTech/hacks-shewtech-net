import { hacks } from "~/hacks";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";

export const hacksRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return hacks.filter(hack => hack.visible).map((hack) => ({
      id: hack.id,
      name: hack.name,
      functions: hack.functions,
    }))
  }),
  
  // getOne: publicProcedure.input(z.object({
  //   id: z.string(),
  // })).query(({ input: { id }}) => {
  //   const hack = hacks.find(hack => hack.id === id);
  //   if (!hack) {
  //     throw new Error('Hack not found');
  //   }
  //   return hack;
  // })
})