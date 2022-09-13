import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();

export default AuthProvider = ({ children }) => {
  const BASE_URL = "http://192.168.1.215:5000";
  const [isLoading, setisloading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userClocking, setUserClocking] = useState([]);

  const login = (values) => {
    try {
      setisloading(true);
      axios
        .post(`${BASE_URL}/api/employee/login`, { ...values })
        .then((res) => {
          console.log(res.data);
          let userInfo = res.data;
          setUserInfo(userInfo);
          setUserToken(userInfo.token);
          AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          AsyncStorage.setItem("userToken", userInfo.token);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
    setisloading(false);
  };

  const logout = async () => {
    try {
      setisloading(true);
      setUserToken(null);
      await AsyncStorage.removeItem("userInfo");
      await AsyncStorage.removeItem("userToken");
      setisloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const isLoggedIn = async () => {
    try {
      setisloading(true);
      let userInfo = await AsyncStorage.getItem("userInfo");
      let userToken = await AsyncStorage.getItem("userToken");
      userInfo = JSON.parse(userInfo);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }

      setisloading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLoading,
        userToken,
        userInfo,
        setUserInfo,
        userClocking,
        setUserClocking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//by the context provider we can pass any value to any screen of our app
