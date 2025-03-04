import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "@/server/trpc";

export default createNextApiHandler({ router: appRouter });

//Neste arquivo estou cirando o manipulador para as requisições da API e conectando ele ao Next.js