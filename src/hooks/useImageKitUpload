import { useState } from "react";
import { upload } from "@imagekit/javascript";
import { getToken } from "../api/imageKitApi";

const useImageKitUpload = () => {
    const [busy, setBusy] = useState(false);
    const [progress, setProgress] = useState(0);

    const uploadImage = async (file, { userId, folder }) => {
        if (!file) return null;
        setBusy(true); setProgress(0);

        try {
            const { data } = await getToken(); // { token, expire, signature, publicKey }
            const { token, expire, signature, publicKey } = data;
            const envPrefix = import.meta.env.MODE === "production" ? "prod" : "dev";

            const res = await upload({
                file,
                fileName: `${Date.now()}_${file.name}`,
                token,
                expire,         // 서버에서 서명한 “초 단위” 값 그대로
                signature,
                publicKey,
                folder: `/${envPrefix}/${userId}/${folder}`,
                useUniqueFileName: true,
                onProgress: (e) => e.total && setProgress(Math.round((e.loaded / e.total) * 100)),
            });

            return res; // { url, ... }
        } finally {
            setBusy(false);
        }
    };

    return { uploadImage, busy, progress };
};

export default useImageKitUpload;