import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const post = async (data: FormData) => {
  return await client({
    method: "POST",
    url: "/api/r2",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data,
  });
};
