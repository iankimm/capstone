import './postdetailpage.css';

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import CommentList from '../CommentListTile';
import DeletePostModal from './DeletePostModal';
import OpenModalButton from '../OpenModalButton';

const PostDetailPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const { postId } = useParams()

  const sessionUser = useSelector((state) => state?.session?.user)
  const allPosts = useSelector((state) => Object.values(state?.post?.allPosts))
  const allPostImages = useSelector((state) => Object.values(state?.post?.PostImages))

  const selectedPost = allPosts.find(post => post.id == postId)
  const selectedImages = allPostImages.filter(postImage => postImage.post_id == postId)

  return (
    <div className = "PostDetailPageContainer">
      <div className = "DetailTitle">
        {selectedPost.title}
      </div>
      <div className = "DetailImage">
        {selectedImages && selectedImages.map((image) => (
          <img className = "DetailImageOne" src={image.image_url} />
        ))}
      </div>
      <div className = "DetailBody">
        {selectedPost.body}
      </div>
      <div className = "DetailCreated">
        {selectedPost.created_at}
        {
          selectedPost.user_id == sessionUser.id ?
            <OpenModalButton
              className="DeletePostButton"
              buttonText="Delete Post"
              modalComponent={<DeletePostModal postId = {postId}/>}
            /> : ""
        }
      </div>

      {/* comment list */}
      <hr></hr>
      <CommentList postId={postId} />
    </div>
  )
}

export default PostDetailPage
