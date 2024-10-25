import { useEffect, useState } from "react";
import postService, { PostInterface } from "../../services/post-service";
import Post from "../Post/Post";
import styles from "./MediaFeed.module.css";

interface Props {
  loggedIn: boolean;
}

function MediaFeed({ loggedIn }: Props) {
  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    if (loggedIn) {
      console.log("Want to render posts");
      const { request, cancel } = postService.getAll<PostInterface>();
      request
        .then((res) => {
          console.log(res);
          setPosts(
            res.data.map((post: PostInterface) => {
              return {
                postId: post.postId,
                email: post.email,
                description: post.description,
                mediaType: post.mediaType,
                mediaUri: post.mediaUri,
              };
            })
          );
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Cleanup posts");
      setPosts([]);
    }
  }, [loggedIn]);

  return (
    <div className={"d-flex flex-column " + styles.mediaFeed}>
      {posts.map((post) => {
        return (
          <div key={post.postId} className={styles.postWrapper}>
            <Post
              email={post.email}
              description={post.description}
              media={post.mediaType}
              uri={post.mediaUri}
            ></Post>
          </div>
        );
      })}
    </div>
  );
}

export default MediaFeed;
