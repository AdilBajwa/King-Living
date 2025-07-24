import React from 'react';
import { Box, Paper, Typography, Button, ButtonGroup } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { CalendarToday } from '@mui/icons-material';
import dayjs from 'dayjs';

const DateRangePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange, onPresetSelect }) => {
  const presets = [
    { label: 'Last 7 Days', value: 'last7days' },
    { label: 'Last 30 Days', value: 'last30days' },
    { label: 'This Month', value: 'thismonth' },
    { label: 'Last Month', value: 'lastmonth' },
    { label: 'This Year', value: 'thisyear' },
    { label: 'Last Year', value: 'lastyear' },
    { label: 'Custom', value: 'custom' }
  ];

  return (
    <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <CalendarToday sx={{ mr: 1 }} />
          <Typography variant="h6">Date Range Filter</Typography>
        </Box>
        <ButtonGroup variant="outlined" size="small">
          {presets.map((preset) => (
            <Button
              key={preset.value}
              onClick={() => onPresetSelect(preset.value)}
              sx={{ 
                color: 'white', 
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              {preset.label}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={onStartDateChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              },
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
              '& .MuiInputLabel-root.Mui-focused': { color: 'white' }
            }}
          />
          <Typography variant="body1" sx={{ mx: 1 }}>→</Typography>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={onEndDateChange}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.3)' },
                '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' }
              },
              '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.7)' },
              '& .MuiInputLabel-root.Mui-focused': { color: 'white' }
            }}
          />
        </Box>
      </LocalizationProvider>
    </Paper>
  );
};

export default DateRangePicker;