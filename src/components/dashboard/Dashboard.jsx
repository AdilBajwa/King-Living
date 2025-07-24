import React, { useState } from 'react';
import { Box, CircularProgress, Alert, Grid, useTheme, useMediaQuery, Paper, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { useOrderData } from '../../hooks/useOrderData.js';
import { setSelectedOrder } from '../../store/slices/orderSlice.js';
import RegionalFilter from './RegionalFilter.jsx';
import DateRangePicker from './DateRangePicker.jsx';
import SummaryCards from './SummaryCards.jsx';
import OrderStatusChart from './OrderStatusChart.jsx';
import RevenueChart from './RevenueChart.jsx';
import RegionalChart from './RegionalChart.jsx';
import EnquiriesTable from './EnquiriesTable.jsx';
import OrderFilters from './OrderFilters.jsx';
import OrderTable from './OrderTable.jsx';
import OrderDetailsModal from './OrderDetailsModal.jsx';
import AtRiskOrdersModal from './AtRiskOrdersModal.jsx';
import ExportActions from './ExportActions.jsx';
import { DATE_RANGE_LABELS } from '../../util/constants'

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const { 
    orders, 
    summaryMetrics, 
    atRiskOrders, 
    selectedOrder, 
    filters,
    loading, 
    error 
  } = useOrderData();

  const [modalOpen, setModalOpen] = useState(false);
  const [atRiskModalOpen, setAtRiskModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(dayjs().subtract(30, 'day'));
  const [endDate, setEndDate] = useState(dayjs());
  const [currentDateRange, setCurrentDateRange] = useState('thismonth');

  // Filter orders by date range
  const filteredOrders = orders.filter(order => {
    const orderDate = dayjs(order.dateTime);
    return orderDate.isAfter(startDate.subtract(1, 'day')) && orderDate.isBefore(endDate.add(1, 'day'));
  });

  const handleOrderSelect = (order) => {
    dispatch(setSelectedOrder(order));
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    dispatch(setSelectedOrder(null));
  };

  const handleAtRiskClick = () => {
    setAtRiskModalOpen(true);
  };

  const handleAtRiskModalClose = () => {
    setAtRiskModalOpen(false);
  };

  const handleDatePresetSelect = (preset) => {
    const now = dayjs();
    setCurrentDateRange(preset);
    switch (preset) {
      case 'last7days':
        setStartDate(now.subtract(7, 'day'));
        setEndDate(now);
        break;
      case 'last30days':
        setStartDate(now.subtract(30, 'day'));
        setEndDate(now);
        break;
      case 'lastmonth':
        setStartDate(now.subtract(1, 'month').startOf('month'));
        setEndDate(now.subtract(1, 'month').endOf('month'));
        break;
      case 'thismonth':
        setStartDate(now.startOf('month'));
        setEndDate(now);
        break;
      case 'thisyear':
        setStartDate(now.startOf('year'));
        setEndDate(now);
        break;
      case 'lastyear':
        setStartDate(now.subtract(1, 'year').startOf('year'));
        setEndDate(now.subtract(1, 'year').endOf('year'));
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        Error loading dashboard data: {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Regional Filter */}
      <RegionalFilter />
      
      {/* Date Range Picker */}
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onPresetSelect={handleDatePresetSelect}
      />

      {/* Filtered Data Container */}
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#f8f9fa' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#666' }}>
           {DATE_RANGE_LABELS[currentDateRange] || 'Custom Range'}
        </Typography>
        
        {/* Summary Metrics */}
        <SummaryCards 
          metrics={summaryMetrics} 
          atRiskOrders={atRiskOrders} 
          onAtRiskClick={handleAtRiskClick}
          dateRange={currentDateRange}
        />

        {/* Charts Section */}
<Box
  sx={{
    display: 'flex',
    flexWrap:'wrap',
    gap: 3,
    mb: 3,
  }}
>
  <Box
    sx={{
      minWidth:800,
      flexGrow:1
    }}
  >
    <OrderStatusChart orders={filteredOrders} />
  </Box>
  <Box
    sx={{
      minWidth:800,
      flexGrow:1
    }}
  >
    <RevenueChart 
      orders={filteredOrders} 
      selectedRegion={filters.region}
    />
  </Box>
</Box>

Ï
        
        {/* Export Actions */}
        <ExportActions orders={filteredOrders} summaryMetrics={summaryMetrics} />
        
        {/* Filters */}
        <OrderFilters />
        
        {/* Orders Table */}
        <OrderTable orders={filteredOrders} onOrderSelect={handleOrderSelect} />
      </Paper>

      {/* Unfiltered Regional Performance */}
      <Paper sx={{ p: 3, mb: 3, width: '100%' }}>
        <Typography variant="h6" sx={{ mb: 2, color: '#666' }}>
          Overall Regional Performance (All Time)
        </Typography>
        <Box sx={{ mt: 3, width: '100%' }}>
            <RegionalChart summaryMetrics={summaryMetrics} />
          </Box>
      </Paper>
      
      {/* Recent Enquiries */}
      <Box sx={{ mt: 3 }}>
        <EnquiriesTable />
      </Box>
      
      {/* Order Details Modal */}
      <OrderDetailsModal 
        order={selectedOrder}
        open={modalOpen}
        onClose={handleModalClose}
      />

      {/* At-Risk Orders Modal */}
      <AtRiskOrdersModal
        open={atRiskModalOpen}
        onClose={handleAtRiskModalClose}
        atRiskOrders={atRiskOrders}
        onOrderSelect={handleOrderSelect}
      />
    </Box>
  );
};

export default Dashboard;