import axios from "axios";

const GetImageByQuery = async ({ query }: any) => {
  console.log("query : ", query);
  try {
    const res = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=hW-wwN9YutgOsD3t0ksmoiPH2KEcKfJ6cP8cqdjT9Oc`
    );
    console.log(res);
    if (res.data.results && res.data.results.length > 0) {
      return {
        results: res.data.results,
      };
    } else {
      console.log("No results found");
      return {
        results: [],
      };
    }
  } catch (error) {
    console.error("Something went wrong", error);
    return {
      results: [],
    };
  }
};

export default GetImageByQuery;
