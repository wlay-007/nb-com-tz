'use client'
import { postsApi } from "@/redux/posts/services/postsApi";
import { commentsApi } from "@/redux/comments/commentsApi";
import { Row, Col } from 'antd';
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
        <Row justify="center" align="middle" className="h-screen bg-gray-100">
            <Col span={24} md={12} lg={12}>
                <div className="bg-white rounded-lg p-4 md:flex md:h-auto lg:max-h-96">
                    <Button type="primary" shape="circle" icon={<ArrowLeftOutlined />} size="large" className="fixed bottom-4 right-4 bg-amber-500" onClick={() => router.push('/')}/>
                    <div className="flex-1 md:mr-4 mb-4 md:mb-0">
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
                    <div className="w-full md:w-1/2 overflow-auto">
                        <h3 className="text-xl font-bold mb-4">Комментарии</h3>
                        <ul className="list-none pl-0">
                            {comments && comments.map((comment) => (
                                <li key={comment.id} className="bg-blue-100 p-4 mb-2 rounded">
                                    <div className="font-semibold">{comment.name}</div>
                                    <div className="text-gray-700">{comment.body}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Col>
        </Row>
    );
}
