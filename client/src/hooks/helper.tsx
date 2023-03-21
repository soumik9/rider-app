
export const handleFileChange = (setFile: any, e?: any, ) => {
    const files = e.target.files;
    if (files.length > 0) {
        setFile(files[0]);
    }
  };