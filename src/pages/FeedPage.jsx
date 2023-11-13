import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Main from "../components/Main";
import Aside from "../components/Aside";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const FeedPage = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    // Oturumu açık olan kullanıcının
    // Hesap bilgilerine erişme
    onAuthStateChanged(auth, (res) => {
      setUser(res)
    });
  }, []);
  return (
    <div className="feed h-screen  overflow-hidden">
      <Nav user={user}/>
      <Main user={user}/>
      <Aside />
    </div>
  );
};

export default FeedPage;
