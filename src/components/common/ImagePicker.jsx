// src/components/ImagePicker.jsx
import { useEffect, useRef, useState } from "react";

const ImagePicker = ({ value, onChange, accept = "image/*", maxSize = 5 * 1024 * 1024 }) => {
    const [preview, setPreview] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (value instanceof File) {
            const url = URL.createObjectURL(value);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        }
        setPreview(null);
    }, [value]);

    return (
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    if (!f) return onChange?.(null);
                    if (!f.type.startsWith("image/")) return alert("이미지 파일만 가능");
                    if (f.size > maxSize) return alert("최대 5MB까지 업로드 가능");
                    onChange?.(f);
                }}
            />
            {preview && (
                <img
                    src={preview}
                    alt="preview"
                    style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 8 }}
                />
            )}
        </div>
    );
};

export default ImagePicker;
