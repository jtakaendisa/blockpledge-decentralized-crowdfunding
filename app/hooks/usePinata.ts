import { useState } from 'react';

export const usePinata = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImageFiles = async (filesToUpload: File[]) => {
    let uploadedImageCIDs: string[] = [];

    try {
      setIsUploading(true);

      const promises = filesToUpload.map(async (file) => {
        const data = new FormData();

        data.set('file', file);

        const res = await fetch('/api/pinata', {
          method: 'POST',
          body: data,
        });
        const resData = await res.json();

        return resData.IpfsHash;
      });

      uploadedImageCIDs = await Promise.all(promises);
    } catch (error) {
      throw new Error(`Failed to upload images: ${(error as Error).message}`);
    } finally {
      setIsUploading(false);
    }

    return { uploadedImageCIDs };
  };

  return { isUploading, uploadImageFiles };
};
