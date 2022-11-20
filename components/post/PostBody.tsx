import PortableText from 'react-portable-text';

interface Props {
  postBody: any;
}

function PostBody({ postBody }: Props) {
  return (
    <div className="mt-10">
      <PortableText
        className=""
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
        content={postBody}
        serializers={{
          h1: (props: any) => <h1 className="text-2xl font-bold my-5" {...props} />,
          h2: (props: any) => <h1 className="text-xl font-bold my-5" {...props} />,
          li: ({ children }: any) => <h1 className="ml-4 list-disc">{children}</h1>,
          link: ({ href, children }: any) => (
            <a href={href} target="_blank" className="text-blue-500 hover:underline">
              {children}
            </a>
          ),
          normal: (props: any) => <p className="mb-5" {...props} />,
        }}
      />
    </div>
  );
}

export default PostBody;
