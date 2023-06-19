import axios from "axios";

const BASE_API_URL = "https://www.thecolorapi.com/id?rgb=";

const api = axios.create();

export const findNameByRGB = async (red, green, blue) => {
  const response = await api.get(`${BASE_API_URL}${red},${green},${blue}`);
  return response.data.name.value;
};

export const findImageByRGB = async (red, green, blue) => {
  const response = await api.get(`${BASE_API_URL}${red},${green},${blue}`);
  return response.data.image.bare;
};
