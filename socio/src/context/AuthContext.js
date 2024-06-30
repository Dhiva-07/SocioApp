import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./Authreducer" ;
import axios from "axios";
const INITIAL_STATE = {
  user:JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    const fetchUser = async () => {
      if (state.user && state.user._id) {
        try {
          const res = await axios.get(`http://localhost:8800/api/users?userId=${state.user._id}`);
          const freshUser = res.data;
          localStorage.setItem("user", JSON.stringify(freshUser));
          dispatch({ type: "LOGIN_SUCCESS", payload: freshUser });
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};