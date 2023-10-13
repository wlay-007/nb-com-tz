import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import IPost from "@/models/IPost";

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    endpoints: (builder) => ({
        getPosts: builder.query<IPost[], { page: number, perPage: number }>({
            query: ({ page, perPage }) => ({
                url: `/photos`,
                params: {
                    _page: page,
                    _limit: perPage,
                },
            }),
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },

            merge: (currentCache, newItems) => {
                currentCache.push(...newItems);
            },

            forceRefetch({ currentArg, previousArg }) {
                return currentArg !== previousArg;
            }
        }),
        getPost: builder.query<IPost, string>({
            query: (index: string) => ({
                url: `/photos/${index}`,
            }),
        }),
    }),
});

export const { useGetPostsQuery, useGetPostQuery } = postsApi;
