import { doc, updateDoc } from "firebase/firestore";
import { BsTrashFill } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { db } from "../../firebase/config";
import { useRef, useState } from "react";

const EditMode = ({
  isPicDeleting,
  setIsPicDeleting,
  close,
  id,
  text,
  isImage,
}) => {
  const inputRef = useRef();

  // Değişiklikleri kaydeder.
  const handleSave = async () => {
    const tweetRef = doc(db, "tweets", id);

    try {
        // yazı içeriğini günceller
      await updateDoc(tweetRef, {
        textContent: inputRef.current.value,
      });

      // resim silinecekse kaldırır.
      if (isPicDeleting) {
        await updateDoc(tweetRef, {
          imageContent: null,
        });
      }
    } catch (err) {
      console.log(err);
    }
    close();
  };

  // Tweet'in fotoğraf içeriğini sil
  const deletePic = async () => {
    setIsPicDeleting(!isPicDeleting);
  };
  return (
    <>
      <input
        ref={inputRef}
        className="rounded  p-1 px-3 mb-2 text-black"
        defaultValue={text}
        type="text"
      />

      <button
        onClick={handleSave}
        className="mx-3 p-1 rounded-full text-xl text-green-500 hover:bg-[#6b6b6b47]"
      >
        <TiTick />
      </button>

      <button
        onClick={close}
        className="p-2 rounded-full text-red-500 hover:bg-[#6b6b6b47]"
      >
        <ImCancelCircle />
      </button>

      {isImage && (
        <button
          onClick={deletePic}
          className="absolute right-0 top-[110px] p-2 text-xl rounded-full text-red-500 hover:bg-[#5d5d5d]"
        >
          <BsTrashFill />
        </button>
      )}
    </>
  );
};

export default EditMode;
