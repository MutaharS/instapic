import { useEffect, useState } from "react";
import { PostInterface } from "../../services/post-service";
import CreatePost from "../CreatePost/CreatePost";
import postService from "../../services/post-service";
import Post from "../Post/Post";

interface Props {
  email: string;
  loggedIn: boolean;
}

function MyPosts({ email, loggedIn }: Props) {
  const [uploadSuccess, setSuccess] = useState(false);
  const [userPosts, setUserPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    const { request, cancel } = postService.getAll<PostInterface>(email);
    request
      .then((res) => {
        const posts: PostInterface[] = res.data;
        setUserPosts([...posts]);
      })
      .catch((err) => console.log(err));
  }, [uploadSuccess]);

  return (
    <div className="d-flex flex-wrap">
      {userPosts.map((post) => {
        return (
          <div
            key={post.postId}
            className="d-flex justify-content-center m-5"
            style={{ width: "18vw" }}
          >
            <Post
              email={post.email}
              media={post.mediaType}
              uri={post.mediaUri}
              description={post.description}
            ></Post>
          </div>
        );
      })}
      <div
        className="d-flex justify-content-start m-5"
        // style={{ width: "18vw" }}
      >
        <CreatePost
          uploadSuccess={uploadSuccess}
          email={email}
          setSuccess={setSuccess}
        ></CreatePost>
      </div>
    </div>
  );
}

export default MyPosts;
