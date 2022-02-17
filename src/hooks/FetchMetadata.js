import axios from "axios";

export const FetchMetadata = async (uri) => {
  let tokenURI = "";
  try {
    const res = await axios.get(uri);
    tokenURI = res.data;
  } catch (error) {
    console.log("axios error:", error);
  }
  return tokenURI;
};
