import { urlFor } from '../../sanity';

interface Props {
  image: any;
}

function PostHeroImage({ image }: Props) {
  return <img className="w-full h-40 object-cover" src={urlFor(image).url()!} alt="" />;
}

export default PostHeroImage;
