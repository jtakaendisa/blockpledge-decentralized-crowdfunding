import { useState } from 'react';

export const usePinata = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImageFiles = async (filesToUpload: File[]) => {
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

      const uploadedCids = await Promise.all(promises);

      return { uploadedCids };
    } catch (error) {
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return { isUploading, uploadImageFiles };
};
