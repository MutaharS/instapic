import create from "./http-service";

export interface User {
  id?: number;
  email: string;
  password: string;
  joinDate: Date;
}

export default create("/users");
