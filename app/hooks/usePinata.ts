export const usePinata = (setUploading: (uploading: boolean) => void) => {
  const uploadFiles = async (filesToUpload: File[]) => {
    let uploadedCids: string[] = [];

    try {
      setUploading(true);
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

      uploadedCids = await Promise.all(promises);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert('Trouble uploading files');
    }

    return { uploadedCids };
  };

  return { uploadFiles };
};
