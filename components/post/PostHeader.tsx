import { urlFor } from '../../sanity';

interface Props {
  title: string;
  description: string;
  authorImage: string;
  authorName: string;
  publishDate: string;
}

function PostHeader({ title, description, authorImage, authorName, publishDate }: Props) {
  return (
    <>
      <h1 className="text-3xl mt-10 mb-3">{title}</h1>
      <h2 className="text-xl font-light text-gray-500 mb-2">{description}</h2>
      <div className="flex items-center space-x-2">
        <img className="h-10 w-10 rounded-full" src={urlFor(authorImage).url()!} alt="" />
        <p className="font-extralight text-sm">
          Blog post by <span className="text-green-600">{authorName}</span> - Published at{' '}
          {publishDate}
        </p>
      </div>
    </>
  );
}

export default PostHeader;
