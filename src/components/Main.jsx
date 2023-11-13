import React, { useEffect, useState } from "react";
import Form from "./Form";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import Loader from "./Post/Loader";
import Post from "./Post";

const Main = ({ user }) => {
  const tweetCol = collection(db, "tweets");
  const [tweets, setTweets] = useState(null);
  // Atılan tweetler'i useEffect ile çekicez.
  useEffect(() => {
    // verileri alırken devereye giricek ayarları belirleme.
  const options = query(tweetCol,orderBy("createdAt" , "desc"))
    onSnapshot(options, (snapshot) => {
      const tempTweets = [];
      snapshot.forEach((doc) => tempTweets.push({ id: doc.id, ...doc.data() }));
      setTweets(tempTweets);
    });
  }, []);
  return (
    <main className="border border-[#38444d] overflow-y-auto">
      <header className="font-bold p-4 border-b-[1px] border-[#38444d]">
        Home
      </header>

      <Form user={user} />

      {!tweets ? (
        <Loader />
      ) : (
        tweets.map((tweet) => <Post key={tweet.id} tweet={tweet} />)
      )}
    </main>
  );
};

export default Main;
