import React from 'react';
import { Paper, Typography, Box, useTheme, useMediaQuery } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { OrderStatus } from '../../models/Order.js';
import { REGION_COLORS } from './RegionalFilter.jsx';

const COLORS = {
  [OrderStatus.PENDING]: '#ffc658',
  [OrderStatus.IN_PRODUCTION]: '#8884d8',
  [OrderStatus.SHIPPED]: '#82ca9d',
  [OrderStatus.OUT_FOR_DELIVERY]: '#0088fe',
  [OrderStatus.DELIVERED]: '#00c49f',
  [OrderStatus.CANCELLED]: '#ff7c7c'
};

const OrderStatusChart = ({ orders }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
    percentage: Math.round((count / orders.length) * 100)
  }));

  const totalOngoing = chartData
    .filter(item => ![OrderStatus.DELIVERED, OrderStatus.CANCELLED].includes(item.name))
    .reduce((sum, item) => sum + item.value, 0);

  return (
    <Paper sx={{ p: 3, height: isMobile ? '350px' : '450px' }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Order Overview</Typography>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        height: isMobile ? '280px' : '350px' 
      }}>
        <Box sx={{ flex: 1, position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 40 : 70}
                outerRadius={isMobile ? 80 : 120}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} orders`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <Box sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <Typography variant={isMobile ? "h5" : "h4"} sx={{ fontWeight: 'bold' }}>
              {totalOngoing}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ongoing
            </Typography>
          </Box>
        </Box>
        <Box sx={{ 
          flex: 1, 
          pl: isMobile ? 0 : 2,
          pt: isMobile ? 2 : 0,
          minWidth: isMobile ? '100%' : 'auto'
        }}>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Ongoing / Total
          </Typography>
          {chartData.map((item, index) => (
            <Box key={item.name} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: COLORS[item.name],
                    mr: 1
                  }}
                />
                <Typography variant="body2">{item.name}</Typography>
              </Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {item.value} / {orders.length}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default OrderStatusChart;