import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from '@root/firebase/firebaseConfig';

export const uploadFileToStorage = async (
    userId: string,
    file: File
): Promise<string> => {
    const storageRef = ref(storage, `profileImages/${userId}/${file.name}`);

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);
};
