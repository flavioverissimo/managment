import { useEffect, useReducer } from "react";
import axios from "axios";
axios.defaults.validateStatus = (code) => code < 500;

const reducer = (state, action) => {
  if (action.type === "REQUEST") {
    return {
      ...state,
      status: true,
    };
  }

  if (action.type === "RESPONSE") {
    return {
      ...state,
      status: false,
      data: action.data,
    };
  }

  if (action.type === "FAILURE") {
    return {
      ...state,
      status: false,
      error: action.error,
    };
  }

  return state;
};

export const getAuth = () => {
  const token = localStorage.getItem("authToken");
  return "?auth=" + token;
};

const INITIAL_STATE = {
  status: false,
  data: {},
  error: "",
};

const baseURL = "https://firebaserealtime-url";

export const useGet = (resource) => {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

  const loadData = async () => {
    try {
      dispatch({ type: "REQUEST" });
      const res = await axios.get(baseURL + resource + ".json" + getAuth());
      if (res.data.error && Object.keys(res.data.error).length > 0) {
        dispatch({ type: "FAILURE", error: res.data.error });
      } else {
        dispatch({ type: "RESPONSE", data: res.data });
      }
    } catch (e) {
      dispatch({ type: "FAILURE", error: "Unknow error" });
    }
  };

  useEffect(() => {
    loadData();
  }, [resource]);

  return {
    data,
    refetch: loadData,
  };
};

const loginURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=ProjectKey";

export const Signin = () => {
  const [data, dispatch] = useReducer(reducer, INITIAL_STATE);

  const post = async (data) => {
    try {
      dispatch({ type: "REQUEST" });
      const res = await axios.post(loginURL, data);
      if (res.data.error && Object.keys(res.data.error).length > 0) {
        dispatch({ type: "FAILURE", error: res.data.error });
      } else {
        dispatch({ type: "RESPONSE", data: res.data });
      }
    } catch (e) {
      dispatch({ type: "FAILURE", error: "Unknow error" });
    }
  };

  return [data, post];
};
