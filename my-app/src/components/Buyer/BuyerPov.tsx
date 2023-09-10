import { useState } from "react";
import Image from "next/image";
import ImageUploader from "../ImageDrop";
import { Button } from "@chakra-ui/react";
import { addImageToSupabase } from "@/shared/utils";

export const BuyerPov = () => {
  const [imageFile, setImageFile] = useState<File>();
  const handleImageChange = (file: File) => {
    setImageFile(file);
  };

  const submitImage = async () => {
    const result = await addImageToSupabase(imageFile);
    console.log(result);
  };
  return (
    <div className="border-[10px]">
      <h1 className="text-[20px]">Buyer Details</h1>
      <div>
        <h1 className="text-[20px]">Transfer</h1>
        <hr></hr>
        <div>
          <p>Insert image</p>
        </div>
        <div>
          <p>insert the image once transfer to the bank is done</p>
        </div>
        <div className="flex flex-col align-center justify-center bg-white pt-[10px]">
          {!imageFile && (
            <div>
              <ImageUploader onImageChange={handleImageChange} />
            </div>
          )}
          {imageFile && (
            <div className="flex justify-center align-center">
              <Image
                src={URL.createObjectURL(imageFile)}
                alt="Selected Image"
                width={300}
                height={300}
              />
            </div>
          )}
        </div>
        <div className="flex justify-center mt-[10px]">
          <div>
            <Button onClick={submitImage}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
