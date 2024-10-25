import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { TfiCommentsSmiley } from "react-icons/tfi";

import "bootstrap/dist/css/bootstrap.css";
import styles from "./Post.module.css";
import { useRef, useState } from "react";

interface Props {
  email: string;
  media: string;
  description: string;
  uri: string;
}

function Post({ email, media, description, uri }: Props) {
  const vidRef = useRef<HTMLVideoElement>(null);
  const [liked, setLiked] = useState(false);

  return (
    <div className={"card " + styles.postClass}>
      <div className={"card-header " + styles.userName}>({email})</div>
      <div className="card-body">
        {media === "VIDEO" && (
          <div
            className="card-img-top"
            onMouseLeave={() =>
              vidRef.current ? vidRef.current.pause() : null
            }
            onMouseEnter={() => {
              vidRef.current ? vidRef.current.play() : null;
            }}
          >
            <video className={styles.videoClass} controls ref={vidRef}>
              <source src={uri}></source>
            </video>
          </div>
        )}
        {media === "IMAGE" && <img className={"card-img-top"} src={uri}></img>}
        {description && (
          <div
            className="d-flex p-2 mt-2"
            style={{ backgroundColor: "rgb(63,94,251)", borderRadius: "15px" }}
          >
            <p className="card-text">{description}</p>
          </div>
        )}
        <div className="d-flex pt-3 mx-2 interactive-bar">
          {!liked && (
            <CiHeart
              className={styles.heartOpen}
              style={{ transform: "scale(2)" }}
              onClick={() => setLiked(!liked)}
            />
          )}
          {liked && (
            <FaHeart
              className={styles.heartFull}
              style={{ transform: "scale(1.5)" }}
              onClick={() => setLiked(!liked)}
            />
          )}
          <TfiCommentsSmiley
            className={styles.commentClass}
          ></TfiCommentsSmiley>
        </div>
      </div>
    </div>
  );
}

export default Post;
