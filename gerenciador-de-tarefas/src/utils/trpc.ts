import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../server/trpc";

export const trpc = createTRPCReact<AppRouter>();

//Neste código, estou estabalecendo o tRPC no projeto para poder chamar ele no servidor e no componentes.