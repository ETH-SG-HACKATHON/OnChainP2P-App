import { useState } from "react";
import Image from "next/image";
import ImageUploader from "../ImageDrop";
import { Button, useToast } from "@chakra-ui/react";
import { addImageToSupabase } from "@/shared/utils";
import { Text } from '@chakra-ui/react'

export const BuyerPov = () => {
  const [imageFile, setImageFile] = useState<File>();
  const handleImageChange = (file: File) => {
    setImageFile(file);
  };
  const toast = useToast();

  const submitImage = async () => {
    const result = await addImageToSupabase(imageFile);
    console.log(result);
    toast({
      title: "Image Sent.",
      description: "Image has been successfully sent.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <div className="border-[10px] border-green-main w-[600px] h-[650px] rounded-3xl mt-4">
      <h1 className=" mx-8 mt-7 text-2xl font-bold"> Buyer Details </h1>
      <div className="container mx-auto w-11/12">
        <Text fontSize='lg' className="font-semibold mt-4">Proof of Transfer</Text>
        <hr></hr>
        <Text fontSize='md' className="italic mt-4">*Insert snap of transfer proof once transfer has been done</Text>
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
        <div className="flex justify-center mb-[10px]">
          <div>
            <button className='mb-5 bg-green-main w-24 h-10 font-semibold rounded-lg text-white' onClick={submitImage}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
