import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { BsCardImage } from "react-icons/bs";
import { db, storage } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useState } from "react";
import Spinner from './Spinner';
const Form = ({ user }) => {
const [isLoading,setIsLoading] = useState(false)

  // kolleksiyonun referansını alma
  const tweetCol = collection(db, "tweets");
  // Resmi storage' yğkler ve url'i döndürür.
  const uploadImage = async (file) => {
    if (!file) {
      return null;
    }

    // dosyayı yükleyeceğimiz konumun referansını alma
    const fileRef = ref(storage, file.name.concat(v4()));

    // referansını aldığımız konuma dosyayı yükleme

    return await uploadBytes(fileRef, file)
      // yükleme başarılı olursa
      .then((res) => getDownloadURL(res.ref))
  };

  // Formun gönderilmesi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    // yazı veya resim içeriği var mı ?
    if (!textContent && !imageContent) {
      return toast.error("You need to write something!");
    }
    
    // fonksiyonu storage'a yükler ve urlini alır
   const imageURL = await uploadImage(imageContent);
    // koleksiyona tweet'i kaydet
    await addDoc(tweetCol, {
      textContent,
      imageContent: imageURL,
      createdAt: serverTimestamp(),
      user: {
        id: user.uid,
        name: user.displayName,
        photo: user.photoURL,
      },
      likes: [],
      isEdited: false,
    });
    setIsLoading(false)
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 p-4 border-b-[1px] border-[#38444d]"
    >
      <img
        className="rounded-full h-[45px] md:h-[55px] mt-2"
        src={user?.photoURL}
        alt="user-photo"
      />
      <div className="w-full">
        <input
          className="w-full bg-transparent my-2 outline-none md:text-xl"
          type="text"
          placeholder="What is happening?!"
        />
        <div className="flex justify-between items-center">
          {/* icon'a tıklanılınca input devreye girmesi için label ile inputa aynı 
            id verdik ve inputu gizledik.
            */}
          <label
            className="hover:bg-[#6b6b6b47] text-[#61d6a3] text-xl transition p-3 cursor-pointer rounded-full"
            htmlFor="image"
          >
            <BsCardImage />
          </label>
          <input className="hidden" id="image" type="file" />
          <button disabled={isLoading} className="bg-[#61d6a3] hover:bg-[#61d6a3a8] text-gray-900 font-bold flex items-center px-5 py-2 rounded-full transition ">
            {isLoading ? <Spinner/> : 'Post'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
