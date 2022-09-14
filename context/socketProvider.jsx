import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = React.createContext({
  socket: {},
});

const ENDPOINT = "http://192.168.1.15:5000";

export default function SocketProvider({ children }) {
  const { userToken, setUserInfo, setUserClocking } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (userToken && !socket) {
      console.log("socket connection is ON");
      const newSocket = io(ENDPOINT, { query: { token: userToken } });
      newSocket.on("USER_STATUS_UPDATE", ({ user, pointage }) => {
        console.log("pointage", pointage);
        setUserInfo(user);
        setUserClocking((oldValue) => [...oldValue, pointage]);
      });
      setSocket(newSocket);
      return () => {
        console.log("socket connection is OFF");
        newSocket.close();
        setSocket(null);
      };
    }
  }, [userToken]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}
