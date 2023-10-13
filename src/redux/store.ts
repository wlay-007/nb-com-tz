import {configureStore} from "@reduxjs/toolkit";
import {postsApi} from "@/redux/posts/services/postsApi";
import {commentsApi} from "@/redux/comments/commentsApi";


export const store = configureStore({
    reducer: {[postsApi.reducerPath]: postsApi.reducer, [commentsApi.reducerPath]: commentsApi.reducer},

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(postsApi.middleware,  commentsApi.middleware),

})