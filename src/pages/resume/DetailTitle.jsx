import React from "react";
import { Typography } from "@mui/material";


const DetailTitle = ({ title }) => (
    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>{title}</Typography>
);


export default DetailTitle;