'use client'
import { postsApi } from "@/redux/posts/services/postsApi";
import { commentsApi } from "@/redux/comments/commentsApi";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
    params: {
        id: string;
    };
}

export default function Post({ params: { id } }: Props) {
    const { data: post } = postsApi.useGetPostQuery(id);
    const { data: comments } = commentsApi.useGetCommentQuery(id);
    const router = useRouter();

    return (
        <div className=" gap-4 bg-white rounded-lg max-h-screen grid sm:grid-cols-1 lg:grid-cols-2 p-4 sm:p-6 lg:p-4">
            <div className="bg-cover">
                {post && (
                    <Image
                        src={post.url}
                        alt="Placeholder Image"
                        width={600}
                        height={600}
                        className="transition-opacity opacity-0 duration-[0.6s] w-full h-full object-cover rounded"
                        onLoadingComplete={(image) => image.classList.remove("opacity-0")}
                    />
                )}
            </div>
            <div className="card__info">
                <div className="flex flex-col justify-between items-start h-full">

                    <h2 className="text-2xl font-semibold mb-4">Комментарии</h2>

                    {comments && comments.map((comment) => (
                        <li key={comment.id} className="bg-blue-100 p-4 mb-2 rounded list-none">
                            <div className="font-semibold">{comment.name}</div>
                            <div className="text-gray-700">{comment.body}</div>
                        </li>
                    ))}
                </div>
            </div>
            <Button type="primary" shape="circle" icon={<ArrowLeftOutlined />} size="large" className="fixed bottom-4 right-4 bg-amber-500" onClick={() => router.push('/')}/>
        </div>
    )
}