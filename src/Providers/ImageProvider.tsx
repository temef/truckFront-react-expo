import React, { useContext, useState } from "react";

export type ImageContextType = {
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
};

export const ImageProvider = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState<null | string>(null);
  console.log(selectedImage);
  const memoedValues = React.useMemo(
    () => ({
      selectedImage,
      setSelectedImage,
    }),
    [selectedImage],
  );

  return (
    <ImageContext.Provider value={memoedValues}>
      {children}
    </ImageContext.Provider>
  );
};

export const ImageContext = React.createContext<null | ImageContextType>(null);

export const useImageContext = () => {
  const data = useContext(ImageContext);
  console.log(data);
  if (!data) throw new Error("No image data found");
  return data;
};
