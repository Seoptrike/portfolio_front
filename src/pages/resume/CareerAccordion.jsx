import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import SectionHeader from "./SectionHeader";
import DetailItem from "./DetailItem";
import AddDetailForm from "./AddDetailForm";


const CareerAccordion = ({ career, defaultExpanded, formatYM, editMode, onUpdateDetail, onCreateDetail, onDeleteDetail }) => {
    const [adding, setAdding] = useState(false);


    return (
        <Paper elevation={0} sx={{ borderRadius: 3, overflow: "hidden", border: 1, borderColor: "divider" }}>
            <Accordion defaultExpanded={defaultExpanded} disableGutters square={false} sx={{ boxShadow: "none" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <SectionHeader
                        company={career.companyName}
                        position={career.position}
                        start={formatYM(career.startDate)}
                        end={formatYM(career.endDate)}
                    />
                </AccordionSummary>
                <AccordionDetails>
                    <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
                        {(career.details ?? []).map((detail) => (
                            <DetailItem
                                key={detail.detailId}
                                detail={detail}
                                editMode={editMode}
                                onUpdate={onUpdateDetail}
                                onDelete={onDeleteDetail}
                            />
                        ))}
                    </Box>


                    {editMode && (
                        <Box sx={{ py: 2 }}>
                            {adding ? (
                                <AddDetailForm
                                    onSubmit={async ({ title, content }) => {
                                        await onCreateDetail({ workId: career.workId, title, content });
                                        setAdding(false);
                                    }}
                                    onCancel={() => setAdding(false)}
                                />
                            ) : (
                                <Button variant="outlined" fullWidth sx={{ borderStyle: "dashed" }} onClick={() => setAdding(true)} startIcon={<AddIcon />}>
                                    경력 상세 내용 추가하기
                                </Button>
                            )}
                        </Box>
                    )}
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
};


export default CareerAccordion;