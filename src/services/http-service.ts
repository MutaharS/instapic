import apiClient from "./api-client";

interface Entity {
  id: number;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // All posts | All posts for a User
  getAll<T>(email?: string) {
    // Configure abort controller for cancelling API requests
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
      params: {
        email: email,
      },
    });
    return { request, cancel: () => controller.abort() };
  }

  // Retrieves a single entity based on param (single user from Users)
  getOne<T>(email?: string) {
    const request = apiClient.get<T>(this.endpoint, {
      params: {
        email: email,
      },
    });

    return request;
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint + "/" + id);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint + "/", entity);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch(this.endpoint + "/" + entity.id, entity);
  }
}

const create = (endpoint: string) => new HttpService(endpoint);

export default create;
