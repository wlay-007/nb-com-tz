'use client'
import { useState, useEffect } from 'react';
import { useGetPostsQuery } from "@/redux/posts/services/postsApi";
import IPost from "@/models/IPost";
import PostCard from "@/components/PostCard/PostCard";

export default function PostContainer() {
    const [page, setPage] = useState(1);
    const { data: posts, isFetching } = useGetPostsQuery({
        page: page,
        perPage: 21,
    });

    useEffect(() => {
        const onScroll = () => {
            const scrolledToBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight;
            if (scrolledToBottom && !isFetching) {
                console.log("Fetching more data...");
                setPage(page + 1);
            }
        };

        document.addEventListener("scroll", onScroll);

        return function () {
            document.removeEventListener("scroll", onScroll);
        };
    }, [page, isFetching]);

    if (isFetching && page === 1) {
        return <div>Loading...</div>;
    }

    return (
        <div className="grid grid-cols-3 md:grid-cols-2 md:p-2 lg:grid-cols-4 lg:p-2 gap-1 rounded-2xl">
            {posts && posts.map((post: IPost) => <PostCard key={post.id} post={post} />)}
        </div>
    );
}

