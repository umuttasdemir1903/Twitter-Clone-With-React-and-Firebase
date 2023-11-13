import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import { FcLike} from "react-icons/fc";
import moment from "moment/moment";
import { auth, db } from "../../firebase/config";
import DropDown from "./DropDown";
import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import EditMode from "./EditMode";

const Post = ({ tweet }) => {
  // Tarih verisi şuandan ne kadar önce atılmış hesaplama

  const [isEditMode, setIsEditMode] = useState(false);
  const [isPicDeleting, setIsPicDeleting] = useState(false);
  const [isLiked, setIsLiked] = useState();

  const date = moment(tweet?.createdAt?.toDate()).fromNow();

  // kullanıcının like atıp atmadığını kontrol eder.
  useEffect(() => {
    const found = tweet.likes.find((id) => id === auth.currentUser.uid);
    setIsLiked(found)
  }, [tweet]);

  const handleDelete = async () => {
    if (confirm("Are you sure ?")) {
      // silinecek tweetin referansını alma
      const tweetRef = doc(db, "tweets", tweet.id);

      // Tweet'i silme işlemi
      await deleteDoc(tweetRef);
    }
  };

  // like yoksa atar yoksa kaldırır.
  const toggleLike = async () => {
    const tweetRef = doc(db, "tweets", tweet.id);

    await updateDoc(tweetRef, {
      likes: isLiked 
      // like'ı kaldırır
      ? arrayRemove(auth.currentUser.uid)
      // Like ekler
      : arrayUnion(auth.currentUser.uid)
    });
  };

  return (
    <div className="relative flex gap-3 p-3 border-b-[1px] border-[#38444d] ">
      <img className="w-12 h-12 rounded-full" src={tweet.user.photo} />

      <div className="w-full">
        {/* üst kısım > kullanıcı bilgileri */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.user.name}</p>
            <p className="text-gray-500">
              @{tweet.user.name?.toLowerCase().replace(" ", "_")}
            </p>
            <p className="text-gray-500">{date}</p>
          </div>

          {/* Ayarlar */}
          {tweet.user.id === auth.currentUser.uid && (
            <DropDown
              handleDelete={handleDelete}
              handleEdit={() => setIsEditMode(true)}
            />
          )}
        </div>
        {/* orta kısım > tweet içerikleri */}

        <div className="mt-3 ">
          {isEditMode ? (
            <EditMode
              close={() => {
                setIsEditMode(false);
                setIsPicDeleting(false);
              }}
              isPicDeleting={isPicDeleting}
              setIsPicDeleting={setIsPicDeleting}
              id={tweet.id}
              isImage={tweet.imageContent}
              tweet={tweet.textContent}
            />
          ) : (
            <p>{tweet.textContent}</p>
          )}
          {tweet.imageContent && (
            <img
              className={`${isPicDeleting ? "blur-sm" : ""} 
                my-1  w-full h-[340px] object-contain mx-auto `}
              src={tweet.imageContent}
            />
          )}
        </div>

        {/* alt kısım > etkileşim butonları */}
        <div className="flex justify-between mt-3 ">
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:text-[#6bc9fb] hover:bg-[#4d535857]">
            <BiMessageRounded />
          </div>
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:text-[#61d6a3] hover:bg-[#4d535857]">
            <FaRetweet />
          </div>
          <div
            onClick={toggleLike}
            className="flex items-center gap-2 p-2 px-3 rounded-full transition cursor-pointer hover:text-[#fb70b0] hover:bg-[#4d535857]"
          >
            {isLiked ? <FcLike/> : <AiOutlineHeart/>}
            {tweet.likes.length}
          </div>
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:text-[#6bc9fb] hover:bg-[#4d535857]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
