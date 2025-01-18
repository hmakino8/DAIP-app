import { User } from "@/user/types";

export const authApi = {
  checkAuth: async (): Promise<User | null> => {
    const response = await fetch("http://localhost:8000/api/user/", {
      credentials: "include",
    });
    if (!response.ok) return null;
    return response.json();
  },

  login: async (username: string, password: string): Promise<User | null> => {
    const csrfResponse = await fetch(
      "http://localhost:8000/api/get-csrf-token/",
      {
        credentials: "include",
      }
    );
    const { csrfToken } = await csrfResponse.json();

    const response = await fetch("http://localhost:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (!response.ok) throw new Error("ERROR: login");
    return authApi.checkAuth();
  },

  logout: async (): Promise<void> => {
    const csrfResponse = await fetch(
      "http://localhost:8000/api/get-csrf-token/",
      {
        credentials: "include",
      }
    );
    const { csrfToken } = await csrfResponse.json();

    const response = await fetch("http://localhost:8000/api/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
    });

    if (!response.ok) throw new Error("ERROR: logout");
  },
};
