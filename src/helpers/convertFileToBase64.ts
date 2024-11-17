import imageCompression from 'browser-image-compression';

const compressImage = async (file: File): Promise<File> => {
    const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 800,
        useWebWorker: true
    };
    return await imageCompression(file, options);
};

export const convertFileToBase64 = async (file: File): Promise<string> => {
    const compressedFile = await compressImage(file);

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
};
