import { env } from "@/env";

const API_URL = env.API_URL;

// No dynamic and No {cache: no-store} : SSG --> Static Page
// {cache: no-store}:SSR --> Dynamic Page
// next: {revalidate: 10}:ISR --> Mix between static and dynamic

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

interface getBlogPosts {
  isFeatured?: boolean;
  search?: string;
}

export const blogService = {
  getBlogPosts: async function (
    params?: getBlogPosts,
    options?: ServiceOptions,
  ) {
    try {
      const url = new URL(`${API_URL}/posts`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value);
          }
        });
      }
      const config: RequestInit = {};
      if (options?.cache) {
        config.cache = options.cache;
      }
      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = {
        ...config.next,
        tags: ["blogPosts"],
      };
      const res = await fetch(url.toString(), config);
      
      // const res = await fetch(url.toString(), {
      //   next: {
      //     tags: ["blogPosts"],
      //   },
      // });

      const data = await res.json();

      //   this is an example
      // if(data.success){
      //     return
      // }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something  went wrong" } };
    }
  },

  getBlogById: async function (id: string) {
    try {
      const res = await fetch(`${API_URL}/posts/${id}`);
      const data = await res.json();
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
