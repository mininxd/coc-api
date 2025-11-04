import axios from "axios";
const baseURL = import.meta.env.VITE_APIURL;
const savedTag = encodeURIComponent(localStorage.getItem("clanTag"));

export async function logs() {
  try {
    const { data } = await axios.get(`${baseURL}/clans/${savedTag}/warlog`);
    return {
      items : data.items
    }
  } catch (err) {
    console.error("Failed to fetch clan data:", err.message);
    return null;
  }
}

export async function war() {
}

