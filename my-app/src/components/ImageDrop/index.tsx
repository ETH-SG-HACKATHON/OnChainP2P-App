import React, { useCallback } from "react";
import { useDropzone, Accept } from "react-dropzone";

interface ImageUploaderProps {
  onImageChange: (imageFile: File) => void;
}

const ImageUploader = ({ onImageChange }: ImageUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Check if there is a file dropped
      if (acceptedFiles && acceptedFiles.length > 0) {
        const imageFile = acceptedFiles[0]; // Get the first dropped file (image)
        onImageChange(imageFile); // Pass the image file to the parent component
      }
    },
    [onImageChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  return (
    <div {...getRootProps()}>
      <div className="flex justify-center align-center px-[50px] h-[500px]">
        <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none h-[500px]">
          <span className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className="font-medium text-gray-600">
              Drag and drop an image here, or click to select a file{" "}
              <span className="text-blue-600 underline">browse</span>
            </span>
          </span>
          <input className="bg-white" {...getInputProps()} type="file" />
        </label>
      </div>
    </div>
  );
};

export default ImageUploader;
