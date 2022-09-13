import axios from "axios";

const BASE_URL = "http://192.168.1.215:5000";

const fetchData = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/api/employee/${userToken}`);
    setloggedInUserInfo(res.data);
    setUserInfo(res.data);

    console.log(res.data.status);
  } catch (error) {
    console.log(error);
  }
};
