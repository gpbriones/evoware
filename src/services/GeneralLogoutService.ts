import { useNavigate } from "react-router-dom";
import { logOutRequest } from "./LogoutService";

export const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
  const access_token = localStorage.getItem("token");

    try {
      if (access_token) {
        await logOutRequest({
          deviceNumber: "WEB",
                access_token
        });
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");

      navigate("/", {replace: true});
    }
  };

  return { handleLogout };
};

