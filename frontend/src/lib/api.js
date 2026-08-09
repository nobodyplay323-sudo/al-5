import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const fetchPosts = async (category) => {
  const params = category && category !== "Toate" ? { category } : {};
  const { data } = await axios.get(`${API}/posts`, { params });
  return data;
};

export const fetchPost = async (slug) => {
  const { data } = await axios.get(`${API}/posts/${slug}`);
  return data;
};

export const fetchCategories = async () => {
  const { data } = await axios.get(`${API}/categories`);
  return data.categories;
};

export const subscribe = async (email) => {
  const { data } = await axios.post(`${API}/newsletter`, { email });
  return data;
};
