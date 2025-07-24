import React from 'react';
import {
  Paper,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Chip
} from '@mui/material';
import { Public } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../store/slices/orderSlice.js';
import { Region } from '../../models/Order.js';
import { REGION_COLORS } from '../../util/constants'

const RegionalFilter = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector(state => state.orders);

  const handleRegionChange = (value) => {
    dispatch(setFilters({ region: value }));
  };

  return (
    <Paper sx={{ p: 3, mb: 3, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Public sx={{ mr: 1 }} />
          <Typography variant="h6">Regional Filter</Typography>
          <Chip 
            label={filters.region === 'all' ? 'All Regions' : filters.region}
            sx={{ 
              ml: 2, 
              backgroundColor: REGION_COLORS[filters.region],
              color: 'white',
              fontWeight: 600
            }}
          />
        </Box>
        
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Select Region</InputLabel>
          <Select
            value={filters.region}
            label="Select Region"
            onChange={(e) => handleRegionChange(e.target.value)}
            sx={{
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255,255,255,0.3)'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white'
              },
              '& .MuiSvgIcon-root': {
                color: 'white'
              }
            }}
          >
            <MenuItem value="all">All Regions</MenuItem>
            {Object.values(Region).map(region => (
              <MenuItem key={region} value={region}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: REGION_COLORS[region],
                      mr: 1
                    }}
                  />
                  {region}
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Paper>
  );
};

export { REGION_COLORS };
export default RegionalFilter;