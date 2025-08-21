import React, { useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import ImagePicker from "../../components/common/ImagePicker";
import useIsMobile from "../../hooks/useIsMobile";

const ThumbnailUploader = ({ imageFile, setImageFile, form, uploading, progress }) => {
    const isMobile = useIsMobile();

    // ✅ File 객체를 blob URL로 변환 (렌더링마다 새로 만들지 않게 메모이제이션)
    const previewUrl = useMemo(() => {
        if (!imageFile) return null;
        return URL.createObjectURL(imageFile);
    }, [imageFile]);

    // ✅ 컴포넌트 언마운트 or imageFile 변경 시 blob URL 해제
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const previewBox = (
        <Box>
            <img
                src={
                    imageFile
                        ? previewUrl
                        : form.thumbnailUrl
                            ? `${form.thumbnailUrl}?tr=w-160,h-160,fo-auto,q=auto`
                            : ""
                }
                alt="thumbnail preview"
                style={{
                    width: 96,
                    height: 96,
                    objectFit: "cover",
                    borderRadius: 8,
                }}
            />
        </Box>
    );

    return (
        <Box>
            <Typography variant="subtitle2" fontWeight={600} mb={1} textAlign="center">
                썸네일 이미지
            </Typography>

            <Box
                display="flex"
                flexDirection="column"
                gap={1}
                alignItems="center"
                textAlign="center"
            >
                {previewBox}
                <ImagePicker
                    value={imageFile}
                    onChange={setImageFile}
                    hidePreview={true}
                />
                {uploading && (
                    <Typography variant="caption">
                        {progress}% 업로드 중…
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default ThumbnailUploader;
