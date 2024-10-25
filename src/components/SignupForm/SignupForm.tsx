import { FieldValues, useForm } from "react-hook-form";
import userService, { User } from "../../services/user-service";
import styles from "./SignupForm.module.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

interface FormData {
  email: string;
  password: number;
}

interface Props {
  seeLogin: boolean;
  loggedIn: boolean;
  setLoggedIn: (status: boolean) => void;
  setSessionEmail: (email: string) => void;
}

function SignupForm({
  seeLogin,
  loggedIn,
  setLoggedIn,
  setSessionEmail,
}: Props) {
  // Data/functions for using react-hook-form
  // register: registering form fields
  // handleSubmit: handling the form submission, wraps around our actual handler
  // errors: pulled from formState for getting/displaying error messages
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [customErrMsg, setCustomErrMsg] = useState("");

  // Handling the form submission
  const onSubmit = async (data: FieldValues) => {
    // First get the user if they exist
    const userExistsRequest = await userService.getOne<User>(data.email);
    const existingUser = userExistsRequest.data;
    // console.log(userExistsRequest);

    // Trying to sign up
    if (!seeLogin) {
      // User already exists => don't create new user with same email
      if (existingUser) {
        console.log("User already exists!");
        setCustomErrMsg("User already exists!");
        return;
      }

      const request = userService.create<User>({
        email: data.email,
        password: data.password,
        joinDate: new Date(),
      });
      request
        .then((res) => {
          if (res.request.status === 201) {
            setLoggedIn(true);
            setSessionEmail(data.email);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
        });
    } else if (existingUser) {
      // Trying to login and email exists
      if (
        data.email === existingUser.email &&
        data.password === existingUser.password
      ) {
        console.log("User validated");
        setLoggedIn(true);
        setSessionEmail(data.email);
      } else {
        console.log("Could not validate user");
        setCustomErrMsg("Incorrect password");
      }
    } else {
      console.log("Email does not exist");
      setCustomErrMsg("That email does not exist");
    }
  };

  return (
    <form
      className={"d-flex flex-column p-3 " + styles.signupForm}
      onSubmit={handleSubmit(onSubmit)}
      style={{ background: "black", borderRadius: "15px", color: "white" }}
    >
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          {...register("email", {
            required: "Email is required",
            minLength: 3,
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please enter a valid email address",
            },
          })}
          id="email"
          type="text"
          autoComplete="email"
          className="form-control"
        />
        {errors.email?.type === "required" && (
          <p className="text-danger">The email field is required</p>
        )}
        {errors.email?.type === "minLength" && (
          <p className="text-danger">The email must be at least 3 characters</p>
        )}
        {errors.email?.type === "pattern" && (
          <p className="text-danger">{errors.email.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          {...register("password", { required: true, minLength: 6 })}
          id="password"
          type="password"
          className="form-control"
        />
        {errors.password?.type === "required" && (
          <p className="text-danger">The password field is required</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-danger">Password must be at least 6 characters</p>
        )}
      </div>
      {loggedIn && (
        <div className="d-flex flex-row">
          <p className="text-success">{loggedIn}</p>
          <div
            className="mx-2 spinner-grow spinner-grow-sm text-success"
            role="status"
          ></div>
        </div>
      )}
      <button className="btn btn-light align-self-center" type="submit">
        {!seeLogin && <p style={{ margin: "0px" }}>Signup</p>}
        {seeLogin && <p style={{ margin: "0px" }}>Login</p>}
      </button>
      <p className="text-danger align-self-center">{customErrMsg}</p>
    </form>
  );
}

export default SignupForm;
