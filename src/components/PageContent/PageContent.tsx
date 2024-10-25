import MediaFeed from "../MediaFeed/MediaFeed";
import MyPosts from "../MyPosts/MyPosts";
import "bootstrap/dist/css/bootstrap.css";

interface Props {
  loggedIn: boolean;
  navigation: string;
  email: string;
}

function PageContent({ loggedIn, navigation, email }: Props) {
  console.log(email);
  return (
    <div className="d-flex justify-content-center p-5 mb-5">
      {loggedIn && navigation === "Home" && (
        <MediaFeed loggedIn={loggedIn}></MediaFeed>
      )}
      {loggedIn && navigation === "Posts" && (
        <MyPosts loggedIn={loggedIn} email={email}></MyPosts>
      )}
    </div>
  );
}

export default PageContent;
