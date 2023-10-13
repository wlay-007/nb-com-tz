import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import IComment from "@/models/IComment";

export const commentsApi = createApi({
    reducerPath: 'commentsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    endpoints: (builder) => ({
        getComment: builder.query<IComment[], string>({
            query: (postId: string) => ({
                url: `/comments`,
                params: {
                    postId: postId,
                },
            }),
        }),
    }),
});

export const { useGetCommentQuery } = commentsApi;
