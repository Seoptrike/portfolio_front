import React from 'react';
import { TextField } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import useIsMobile from '../../hooks/useIsMobile.js';

const DateInput = ({ label, value, onChange, name }) => {
    const isMobile = useIsMobile();

    return isMobile ? (
        <input
            type="date"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={label}
            style={{
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                boxSizing: 'border-box',
            }}
        />
    ) : (
        <TextField
            type="date"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
        />
    );
};

export default DateInput;
