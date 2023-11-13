//* Kullanıcının yetkisi varsa alt route'lara erişim izni ver
//* Yoksa login sayfasına yönlendir

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    // Kullanıcı oturumu her değiştiğinde çalışır.
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    });
  }, []);

  //* Kullanıcın yetkisi yoksa login'e yönlendir.
  if (isAuth === false) {
    return <Navigate to={"/"} replace />;
  }
  //* Yetkisi yoksa alt route'u göster.
  return <Outlet/>; //* outlet'in içeriğini ekrana basar.
};

export default ProtectedRoute;
