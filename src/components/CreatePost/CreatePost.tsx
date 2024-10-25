import { useForm } from "react-hook-form";
import { useState } from "react";
import postService from "../../services/post-service";
import styles from "../Post/Post.module.css";

interface Props {
  email: string; // Email of logged in user
  uploadSuccess: boolean;
  setSuccess: (flag: boolean) => void;
}

interface CreatePostData {
  description: string;
  mediaInput: FileList;
}

const CreatePost = ({ email, uploadSuccess, setSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostData>();

  const submitForm = (data: CreatePostData) => {
    setSuccess(false);
    const imageMedia = ["png", "jpg", "webp"];
    const videoMedia = ["mp4"];

    const formData = new FormData();
    const extension = data.mediaInput[0].name.split(".").pop();
    formData.append("mediaInput", data.mediaInput[0]);
    formData.append("email", email);
    if (imageMedia.includes(extension ? extension : "")) {
      formData.append("mediaType", "IMAGE");
    } else {
      formData.append("mediaType", "VIDEO");
    }
    formData.append("description", data.description);

    const request = postService.create(formData);
    request
      .then((res) => {
        console.log(res);
        setSuccess(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={"card m-1 " + styles.createPostClass}>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="card-img-top"></div>
        <div className="card-body">
          <h5 className="card-title">Create New Post</h5>
          <div className="form-group">
            <label htmlFor="postDescription">Description</label>
            <textarea
              style={{ fontSize: "x-large" }}
              className="form-control"
              id="postDescription"
              aria-describedby="description"
              placeholder="..."
              {...register("description")}
            />
          </div>
        </div>
        <div className="card-body">
          <label htmlFor="formFile" className="form-label">
            Select Media
          </label>
          <div className="input-group mb-3">
            <input
              className="form-control"
              type="file"
              id="formFile"
              accept="image/*,video/*"
              formEncType="multipart/form-data"
              {...register("mediaInput", {
                required: "Well you can't have a post without a picture!",
              })}
            ></input>
            <button className="btn btn-danger" type="submit" id="button-addon2">
              Post
            </button>
          </div>
          <div
            className="d-flex text-danger bg-light px-3 justify-content-center"
            style={{ borderRadius: "16px" }}
          >
            {errors.mediaInput?.message}
          </div>
          <div
            className="d-flex text-primary bg-light px-3 justify-content-center"
            style={{ borderRadius: "16px" }}
          >
            {uploadSuccess && <p>Success</p>}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
