import React, { useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SectionHeader from "./SectionHeader";
import DetailItem from "./DetailItem";
import AddDetailForm from "./AddDetailForm";

const TOSS_BLUE = "#3182f6";

const CareerAccordion = ({
    career,
    defaultExpanded,
    formatYM,
    editMode,
    onUpdateDetail,
    onCreateDetail,
    onDeleteDetail,
}) => {
    const [adding, setAdding] = useState(false);

    return (
        <Accordion
            defaultExpanded={defaultExpanded}
            disableGutters
            square={false}
            sx={{
                borderRadius: "16px",
                boxShadow: "none",
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
                transition: "box-shadow .2s ease, border-color .2s ease",
                "&:hover": {
                    boxShadow:
                        "0 1px 0 rgba(0,0,0,0.04), 0 10px 32px rgba(0,0,0,0.08)",
                    borderColor: "rgba(0,0,0,0.08)",
                },
                // Summary/Details 간 디바이더
                "& .MuiAccordionSummary-root": {
                    borderBottom: "1px solid",
                    borderColor: "divider",
                },
            }}
        >
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon
                        sx={{ color: "text.secondary", "&:hover": { color: TOSS_BLUE } }}
                    />
                }
                sx={{
                    px: { xs: 1, sm: 1.5, md: 2 },
                    py: { xs: 0.75, sm: 1 },
                    pr: { xs: 1, sm: 1.5, md: 2.5 }, // 우측 아이콘 여유
                    minHeight: 56,
                    "& .MuiAccordionSummary-content": {
                        my: 0.25,
                        mr: 1,
                    },
                }}
            >
                <SectionHeader
                    company={career.companyName}
                    position={career.position}
                    start={formatYM(career.startDate)}
                    end={formatYM(career.endDate)}
                />
            </AccordionSummary>

            <AccordionDetails
                sx={{
                    px: { xs: 1, sm: 1.5, md: 2 },
                    py: { xs: 1, sm: 1.25 },
                }}
            >
                <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
                    {(career.details ?? []).map((detail, i) => (
                        <React.Fragment
                            key={`${detail.detailId}-${detail.updatedAt ?? detail.content?.length ?? 0}`}
                        >
                            <DetailItem
                                detail={detail}
                                editMode={editMode}
                                onUpdate={onUpdateDetail}
                                onDelete={onDeleteDetail}
                            />
                            {i < (career.details?.length ?? 0) - 1 && (
                                <Divider component="li" />
                            )}
                        </React.Fragment>
                    ))}
                </Box>

                {editMode && (
                    <Box sx={{ pt: 1.5 }}>
                        {adding ? (
                            <AddDetailForm
                                onSubmit={async ({ title, content }) => {
                                    await onCreateDetail({ workId: career.workId, title, content });
                                    setAdding(false);
                                }}
                                onCancel={() => setAdding(false)}
                            />
                        ) : (
                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={() => setAdding(true)}
                                sx={{
                                    mt: 0.5,
                                    borderRadius: 999,
                                    borderStyle: "solid",
                                    borderColor: "divider",
                                    textTransform: "none",
                                    fontWeight: 700,
                                    letterSpacing: "-0.01em",
                                    py: 1,
                                    "&:hover": {
                                        backgroundColor: "rgba(49,130,246,0.06)",
                                        borderColor: "rgba(49,130,246,0.35)",
                                    },
                                }}
                            >
                                경력 상세 내용 추가하기
                            </Button>
                        )}
                    </Box>
                )}
            </AccordionDetails>
        </Accordion>
    );
};

export default CareerAccordion;
