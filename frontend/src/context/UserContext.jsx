import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const token = storedUser ? JSON.parse(storedUser).token : null;

        if (!token) {
          setLoading(false);
          return;
        }

        const API_URL =
          (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

        const res = await axios.get(`${API_URL}/api/auth/me`, {
          headers: {
            // Backend middleware expects "bearer " in lowercase
            Authorization: `bearer ${token}`,
          },
        });

        setUser(res.data.user);
        setIsPremium(res.data.user.isPremium === true);
      } catch (err) {
        console.error("User fetch failed", err);
        setUser(null);
        setIsPremium(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isPremium,
        setIsPremium,
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
