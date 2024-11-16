import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

export const uploadFileToStorage = async (
    userId: string,
    file: File
): Promise<string> => {
    const storage = getStorage();
    const fileRef = ref(storage, `profileImages/${userId}/${file.name}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
};
