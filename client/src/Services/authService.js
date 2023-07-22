import axios from "axios";

export const login = async (Data) => {
  try {
    const response = await axios.post("http://localhost:8800/api/auth/login",Data);

    return { user: response.data.informations, token: response.data.token };
  } catch (error) {
    throw error.response.data.message;
  }
};



