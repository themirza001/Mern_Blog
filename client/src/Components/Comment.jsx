import { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `/api/v1/user/getUserForCmnts/${comment?.userId}`
        );
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    getUser();
  }, [comment]);

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          src={user.profilePicture}
          alt={user.username}
          className="w-10 h-10 rounded-full bg-gray-200"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : `@anonymous User`}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 mb-2">{comment.content}</p>
      </div>
    </div>
  );
};

// };
Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired, // Ensure content is validated
    likes: PropTypes.arrayOf(PropTypes.string).isRequired,
    numberOfLikes: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired, // Adjust to PropTypes.instanceOf(Date) if necessary
    userId: PropTypes.string.isRequired, // Added userId validation
  }).isRequired,
  onLike: PropTypes.func.isRequired,
};

export default Comment;
