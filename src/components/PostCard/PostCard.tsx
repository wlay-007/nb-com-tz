import IPost from "@/models/IPost";
import Link from "next/link";
import Image from "next/image";

interface PostCardProps {
    post: IPost
}

export default function PostCard ({post}: PostCardProps) {
    return (
        <Link scroll={false} href={`/post/${post.id}`}><div className="flex items-center justify-center">
            <Image
                src={post.url}
                alt="Placeholder Image"
                width={600}
                height={600}
                className="transition-opacity opacity-0 duration-[0.6s]"
                onLoadingComplete={( image) => image.classList.remove ("opacity-0")}
            />
        </div></Link>
    )
}
