import React from "react";
import {
    Box,
    FormGroup,
    Chip,
    Tooltip,
} from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import { ICON_MAP } from "../../utils/iconMap";

const StackCheckboxGroup = ({ stacks, selectedIds, onChange }) => {
    const isMobile = useIsMobile();

    if (!stacks || stacks.length === 0) return null;

    return (
        <FormGroup
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "repeat(4, 1fr)",
                    md: "repeat(8, 1fr)",
                },
                gap: 1,
            }}
        >
            {stacks.map((stack) => {
                const selected = selectedIds.includes(stack.stackId);
                const iconData = ICON_MAP[stack.name];

                return isMobile && iconData ? (
                    <Tooltip key={stack.stackId} title={stack.name} arrow>
                        <Box
                            onClick={() => onChange(stack.stackId)}
                            sx={{
                                width: "100%",
                                height: 40,
                                borderRadius: 1,
                                backgroundColor: "#fff", // ✅ 흰 배경 고정
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                border: selected ? "2px solid #212529" : "1px solid #ddd", // ✅ 강조 테두리
                                boxShadow: selected ? "0 0 0 1px #212529" : "none",
                                "&:hover": {
                                    backgroundColor: "#f5f5f5", // ✅ 밝은 회색 on hover
                                },
                            }}
                        >
                            <iconData.Icon size={20} color={iconData.color} />
                        </Box>
                    </Tooltip>
                ) : (
                    <Chip
                        key={stack.stackId}
                        label={stack.name}
                        clickable
                        onClick={() => onChange(stack.stackId)}
                        variant={selected ? "filled" : "outlined"}
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                            borderRadius: 1.5,
                            px: { xs: 1.5, sm: 1.5 },
                            py: { xs: 1, sm: 0.5 },
                            fontSize: { xs: "0.5rem", sm: "0.85rem" },
                            fontWeight: 500,
                            minHeight: { xs: 40, sm: 32 },
                            backgroundColor: selected ? "#212529" : undefined,
                            color: selected ? "#fff" : undefined,
                            borderColor: selected ? "#212529" : undefined,
                            "&:hover": {
                                backgroundColor: selected ? "#1c1f23" : "#e0e0e0",
                            },
                        }}
                    />
                );
            })}
        </FormGroup>
    );
};

export default StackCheckboxGroup;
