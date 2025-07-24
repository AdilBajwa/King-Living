import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  format,
  subDays,
  eachDayOfInterval,
} from 'date-fns';
import { REGION_COLORS } from './RegionalFilter.jsx'; // Ensure this exports APAC, UK, US color codes

const RevenueChart = ({ orders, selectedRegion = 'all' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Generate last 30 days as date objects
  const last30Days = eachDayOfInterval({
    start: subDays(new Date(), 29),
    end: new Date(),
  });

  // Prepare chart data
  const chartData = last30Days.map(date => {
    const dateStr = format(date, 'yyyy-MM-dd');

    const dayOrders = orders.filter(order => {
      const orderDateStr = format(new Date(order.dateTime), 'yyyy-MM-dd');
      return orderDateStr === dateStr;
    });

    const revenueByRegion = {
      date: format(date, 'MMM dd'),
      APAC: 0,
      UK: 0,
      US: 0,
    };

    dayOrders.forEach(order => {
      if (selectedRegion === 'all' || order.region === selectedRegion) {
        revenueByRegion[order.region] += order.orderTotal;
      }
    });

    return revenueByRegion;
  });

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.orderTotal,
    0
  );

  const formatCurrency = amount => {
    return `$${(amount / 1000).toFixed(0)}k`;
  };

  const hasData = chartData.some(
    day => day.APAC > 0 || day.UK > 0 || day.US > 0
  );

  return (
    <Paper sx={{ p: 3, height: isMobile ? '350px' : '450px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="h6">Revenue Trend</Typography>
        <Chip
          label={`Total: $${totalRevenue.toLocaleString()}`}
          color="primary"
          sx={{ fontWeight: 600 }}
        />
      </Box>

      {hasData ? (
        <ResponsiveContainer width="100%" height={isMobile ? 250 : 350}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" fontSize={isMobile ? 10 : 12} />
            <YAxis
              tickFormatter={formatCurrency}
              fontSize={isMobile ? 10 : 12}
            />
            <Tooltip
              formatter={(value, name) => [`$${value.toLocaleString()}`, name]}
              labelStyle={{ color: '#333' }}
            />
            <Legend />

            {selectedRegion === 'all' ? (
              <>
                <Line
                  type="monotone"
                  dataKey="APAC"
                  stroke={REGION_COLORS.APAC}
                  strokeWidth={3}
                  dot={{
                    fill: REGION_COLORS.APAC,
                    strokeWidth: 2,
                    r: 4,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="UK"
                  stroke={REGION_COLORS.UK}
                  strokeWidth={3}
                  dot={{
                    fill: REGION_COLORS.UK,
                    strokeWidth: 2,
                    r: 4,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="US"
                  stroke={REGION_COLORS.US}
                  strokeWidth={3}
                  dot={{
                    fill: REGION_COLORS.US,
                    strokeWidth: 2,
                    r: 4,
                  }}
                />
              </>
            ) : (
              <Line
                type="monotone"
                dataKey={selectedRegion}
                stroke={REGION_COLORS[selectedRegion]}
                strokeWidth={3}
                dot={{
                  fill: REGION_COLORS[selectedRegion],
                  strokeWidth: 2,
                  r: 4,
                }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <Typography sx={{ mt: 5, textAlign: 'center', color: 'text.secondary' }}>
          No revenue data available for the selected date range or region.
        </Typography>
      )}
    </Paper>
  );
};

export default RevenueChart;
