// components/ProjectCard/StackButtons.jsx - 데스크톱용 스택 버튼
import React from "react";
import { Stack, Button } from "@mui/material";
import { ICON_MAP } from "../../../utils/iconMap";

const StackButtons = ({ names = [], max = 8 }) => {
    const items = names.slice(0, max);
    const remainingCount = names.length - max;
    const hasMore = remainingCount > 0;
    
    // 더 컴팩트한 크기로 조정
    const maxTextLength = Math.max(...items.map(name => String(name).length), 0);
    const minWidth = Math.max(60, maxTextLength * 6 + 32); // 최소 60px, 더 작게 조정

    return (
        <Stack
            direction="row"
            spacing={0.5}
            sx={{
                alignItems: "center",
                flexWrap: "wrap",
                gap: 0.5,
                maxWidth: "100%"
            }}
        >
            {items.map((name, i) => {
                const entry = ICON_MAP?.[name] || {};
                const Icon = entry.Icon || entry.icon || entry;
                const color = entry.color;
                
                return (
                    <Button
                        key={`${name}-${i}`}
                        variant="outlined"
                        size="small"
                        disabled // 클릭 불가능하게
                        startIcon={
                            Icon ? (
                                <Icon size={16} color={color} />
                            ) : (
                                <span style={{ 
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    width: 16,
                                    height: 16,
                                    fontSize: '10px',
                                    fontWeight: 700
                                }}>
                                    {String(name).charAt(0).toUpperCase()}
                                </span>
                            )
                        }
                        sx={{
                            minWidth: `${minWidth}px`, // 동일한 최소 너비
                            height: 24, // 고정 높이 축소
                            borderColor: "text.secondary",
                            color: "text.primary",
                            backgroundColor: "transparent",
                            fontSize: "0.7rem", // 폰트 크기 축소
                            fontWeight: 500,
                            textTransform: "none", // 대소문자 변환 없음
                            cursor: "default", // 기본 커서
                            px: 0.75, // 패딩 축소
                            py: 0.25,
                            "&.Mui-disabled": {
                                borderColor: "text.secondary",
                                color: "text.primary",
                                opacity: 1
                            },
                            "&:hover": {
                                borderColor: "text.primary",
                                backgroundColor: "action.hover"
                            },
                            "& .MuiButton-startIcon": {
                                marginRight: 0.4, // 아이콘 마진 축소
                                marginLeft: 0
                            }
                        }}
                    >
                        {name}
                    </Button>
                );
            })}
            
            {/* 더 많은 스택이 있을 때 +N개 표시 */}
            {hasMore && (
                <Button
                    variant="outlined"
                    size="small"
                    disabled
                    sx={{
                        minWidth: `${minWidth}px`,
                        height: 24,
                        borderColor: "text.disabled",
                        color: "text.disabled",
                        backgroundColor: "transparent",
                        fontSize: "0.7rem",
                        fontWeight: 500,
                        textTransform: "none",
                        cursor: "default",
                        px: 0.75,
                        py: 0.25,
                        "&.Mui-disabled": {
                            borderColor: "text.disabled",
                            color: "text.disabled",
                            opacity: 0.7
                        }
                    }}
                >
                    +{remainingCount}개
                </Button>
            )}
        </Stack>
    );
};

export default StackButtons;