import { trpc } from "../utils/trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }){
    return (
        <trpc.Provider client={trpc.createClient({ links: [httpBatchLink({ url: '/api/trpc' })] })} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </trpc.Provider>
      );
}

export default MyApp;

//Aqui, estarei estabalecendo a URL da api, como também disponibilizando ela para toda a aplicação. Tambem estou garantindo a gerencia do cache.