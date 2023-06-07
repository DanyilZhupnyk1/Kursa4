import { useReducer } from "react";
import { AuthContext } from "./AuthContext";


const storedState = localStorage.getItem('user');

const initialState = storedState ? JSON.parse(storedState) : null;

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":

      state = action.payload;
      localStorage.setItem("user", JSON.stringify(state));

      return state;

    case 'UPDATE':
      state = action.payload;
      localStorage.setItem('user', JSON.stringify(state));

      return state;

    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        user: null,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const update = (user) => {
    dispatch({ type: "UPDATE", payload: user });
  };

  return (
    <AuthContext.Provider value={ { state, login, logout, update } }>
      { children }
    </AuthContext.Provider>
  );
}
