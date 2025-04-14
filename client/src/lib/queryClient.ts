import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { handleError, sanitizeErrorMessage } from "./errorHandler";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    const sanitizedText = sanitizeErrorMessage(text);
    throw new Error(`${res.status}: ${sanitizedText}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

// Custom error handlers that will process errors with Mark Twain style messaging
const handleQueryError = (error: unknown) => {
  console.error("Query error:", error);
  // Transform error to Mark Twain style
  const twainError = handleError(error);
  console.error("Handled error:", twainError);
  
  // Use toast for visual feedback
  import('@/hooks/use-toast').then(({ toast }) => {
    toast({
      title: "Query Error",
      description: twainError,
      variant: "destructive",
    });
  });
};

const handleMutationError = (error: unknown) => {
  console.error("Mutation error:", error);
  // Transform error to Mark Twain style
  const twainError = handleError(error);
  console.error("Handled error:", twainError);
  
  // Use toast for visual feedback
  import('@/hooks/use-toast').then(({ toast }) => {
    toast({
      title: "Action Failed",
      description: twainError,
      variant: "destructive",
    });
  });
};

// Create and configure the QueryClient
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

// Set up global error handlers
queryClient.getQueryCache().subscribe({
  onError: handleQueryError
});

queryClient.getMutationCache().subscribe({
  onError: handleMutationError
});
