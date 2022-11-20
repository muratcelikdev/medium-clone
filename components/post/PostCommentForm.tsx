import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Post } from '../../typings';
import PostCommentAfterSubmit from './PostCommentAfterSubmit';

interface FormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

function PostCommentForm({ post }: Props) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return submitted ? (
    <PostCommentAfterSubmit />
  ) : (
    <form
      className="flex flex-col p-10 my-10 max-w-2xl mx-auto mb-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
      <h4 className="text-3xl font-bold">Leave a comment below!</h4>
      <hr className="py-3 mt-2" />

      <input {...register('_id')} type="hidden" name="_id" value={post._id} />

      <label className="block mb-5">
        <span className="text-gray-700">Name</span>
        <input
          {...register('name', { required: true })}
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none"
          placeholder="John Doe"
          type="text"
        />
      </label>
      <label className="block mb-5">
        <span className="text-gray-700">Email</span>
        <input
          {...register('email', { required: true })}
          className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring outline-none"
          placeholder="John Doe"
          type="text"
        />
      </label>
      <label className="block mb-5">
        <span className="text-gray-700">Comments</span>
        <textarea
          {...register('comment', { required: true })}
          className="shadow border rounded py-3 px-3 form-textarea mt-1 block w-full ring-yellow-500 focus:ring outline-none"
          placeholder="John Doe"
          rows={8}
        />
      </label>

      <div className="flex flex-col p-5">
        {errors.name && <p className="text-red-500">- The name field is required</p>}
        {errors.comment && <p className="text-red-500">- The comment field is required</p>}
        {errors.email && <p className="text-red-500">- The email field is required</p>}
      </div>

      <button
        className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default PostCommentForm;
