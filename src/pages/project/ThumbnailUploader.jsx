import React, { useEffect, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import ImagePicker from "../../components/common/ImagePicker";

const ThumbnailUploader = ({ imageFile, setImageFile, form, uploading, progress }) => {

  const previewUrl = useMemo(() => {
    if (!imageFile) return null;
    return URL.createObjectURL(imageFile);
  }, [imageFile]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // ✅ src 미리 계산 (없으면 null)
  const src = imageFile
    ? previewUrl
    : form.thumbnailUrl
      ? `${form.thumbnailUrl}?tr=w-160,h-160,fo-auto,q=auto`
      : null;

  return (
    <Box>
      <Typography variant="subtitle2" fontWeight={600} mb={1} textAlign="center">
        썸네일 이미지
      </Typography>

      <Box display="flex" flexDirection="column" gap={1} alignItems="center" textAlign="center">
        {/* ✅ src가 있을 때만 img 렌더 */}
        {src ? (
          <Box
            component="img"
            src={src}
            alt="thumbnail preview"
            loading="lazy"
            decoding="async"
            sx={{ width: 96, height: 96, objectFit: "cover", borderRadius: 1 }}
          />
        ) : (
          // ✅ placeholder
          <Box
            sx={{
              width: 96,
              height: 96,
              borderRadius: 1,
              border: "1px dashed",
              borderColor: "divider",
              display: "grid",
              placeItems: "center",
              color: "text.secondary",
              fontSize: 12,
            }}
          >
            썸네일 없음
          </Box>
        )}

        <ImagePicker value={imageFile} onChange={setImageFile} hidePreview />

        {uploading && <Typography variant="caption">{progress}% 업로드 중…</Typography>}
      </Box>
    </Box>
  );
};

export default ThumbnailUploader;
