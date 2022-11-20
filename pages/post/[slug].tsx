import { GetStaticPaths, GetStaticProps } from 'next';
import { sanityClient } from '../../sanity';
import { Post } from '../../typings';

import Header from '../../components/Header';
import PostBody from '../../components/post/PostBody';
import PostHeader from '../../components/post/PostHeader';
import PostHeroImage from '../../components/post/PostHeroImage';
import PostCommentForm from '../../components/post/PostCommentForm';
import PostComments from '../../components/post/PostComments';

interface Props {
  post: Post;
}

function Post({ post }: Props) {
  return (
    <main>
      <Header />
      <PostHeroImage image={post.mainImage} />
      <article className="max-w-3xl mx-auto p-5">
        <PostHeader
          title={post.title}
          description={post.description}
          authorImage={post.author.image}
          authorName={post.author.name}
          publishDate={new Date(post._createdAt).toLocaleString()}
        />
        <PostBody postBody={post.body} />
        <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />
        <PostCommentForm post={post} />
        <PostComments comments={post.comments} />
      </article>
    </main>
  );
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
        *[_type == "post"] {
            _id,
            slug {
                current
            }
        }
    `;

  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
        *[_type == "post" && slug.current == $slug][0] {
            _id,
            _createdAt,
            title,
            description,
            mainImage,
            slug,
            body,
            author -> {
                name,
                image
            },
            'comments': *[
                _type == "comment" &&
                post._ref == ^._id &&
                approved == true
            ]
        }
  `;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // after 60 seconds, it'll update the old cached version
  };
};
