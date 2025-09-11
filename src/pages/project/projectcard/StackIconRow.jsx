// components/ProjectCard/StackIconsRow.jsx
import React from "react";
import { Stack, Box, Tooltip, Typography } from "@mui/material";
import { ICON_MAP } from "../../../utils/iconMap";

const StackIconsRow = ({ names = [], max = 12, iconSize = 18, boxSize = 22 }) => {
    const items = names.slice(0, max);
    const remainingCount = names.length - max;
    const hasMore = remainingCount > 0;
    
    return (
        <Stack
            direction="row"
            spacing={0.5}
            sx={{
                alignItems: "center",
                flexWrap: "nowrap",
                overflow: "hidden",
                maskImage: "linear-gradient(to right, rgba(0,0,0,1) 85%, rgba(0,0,0,0))",
            }}
        >
            {items.map((name, i) => {
                const entry = ICON_MAP?.[name] || {};
                const Icon = entry.Icon || entry.icon || entry;
                const color = entry.color;
                return (
                    <Tooltip title={name} key={`${name}-${i}`} arrow>
                        <Box
                            component="span"
                            sx={{
                                width: boxSize,
                                height: boxSize,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flex: "0 0 auto",
                            }}
                        >
                            {Icon ? (
                                <Icon size={iconSize} color={color} />
                            ) : (
                                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                                    {String(name).charAt(0).toUpperCase()}
                                </Typography>
                            )}
                        </Box>
                    </Tooltip>
                );
            })}
            
            {/* 더 많은 스택이 있을 때 +N 표시 */}
            {hasMore && (
                <Tooltip title={`+${remainingCount}개 더`} arrow>
                    <Box
                        component="span"
                        sx={{
                            width: boxSize,
                            height: boxSize,
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flex: "0 0 auto",
                            borderRadius: "50%",
                            backgroundColor: "action.selected",
                            border: "1px solid",
                            borderColor: "divider"
                        }}
                    >
                        <Typography 
                            variant="caption" 
                            sx={{ 
                                fontWeight: 700,
                                fontSize: "0.6rem",
                                color: "text.secondary"
                            }}
                        >
                            +{remainingCount}
                        </Typography>
                    </Box>
                </Tooltip>
            )}
        </Stack>
    );
};

export default StackIconsRow;
