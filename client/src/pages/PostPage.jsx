import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spinner, Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import CallToAction from '../Components/CallToAction';
import CommentSection from '../Components/CommentSection';
import PostCard from './../Components/PostCard';

function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPost, setRecentPost] = useState(null);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          //   console.log('not ok');
          setError(true);
          setLoading(false);
          console.log(error);
        } else {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/v1/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPost(data.posts);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchRecentPosts();
  }, []);
  if (loading)
    return (
      <div className="flex justify-center">
        <Spinner size="xl"></Spinner>
      </div>
    );
  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />
      <div className="flex justify-between p-3 bprder-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0)}mins read
        </span>
      </div>
      <div
        className="p-3 max-w-2xl max-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post && post.content }}
      ></div>
      <div>
        <CallToAction></CallToAction>
      </div>
      <CommentSection postId={post._id} />

      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent Articles</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPost &&
            recentPost.map((post) => (
              <PostCard key={post._id} post={post}></PostCard>
            ))}
        </div>
      </div>
    </main>
  );
}

export default PostPage;
