import create from "./http-service";

export interface PostInterface {
  postId: string;
  email: string;
  description: string;
  mediaType: string;
  mediaUri: string;
}

export default create("/posts");
