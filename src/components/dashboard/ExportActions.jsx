import React from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Download, Print, Notifications } from '@mui/icons-material';
import { CSVLink } from 'react-csv';

const ExportActions = ({ orders, summaryMetrics }) => {
  const csvHeaders = [
    { label: 'Order ID', key: 'id' },
    { label: 'Date', key: 'dateTime' },
    { label: 'Region', key: 'region' },
    { label: 'Customer Name', key: 'customerName' },
    { label: 'Customer Email', key: 'customerEmail' },
    { label: 'Product Name', key: 'productName' },
    { label: 'Product SKU', key: 'productSku' },
    { label: 'Category', key: 'productCategory' },
    { label: 'Quantity', key: 'quantity' },
    { label: 'Order Total', key: 'orderTotal' },
    { label: 'Currency', key: 'currency' },
    { label: 'Status', key: 'status' },
    { label: 'Payment Method', key: 'paymentMethod' },
    { label: 'Delivery Option', key: 'deliveryOption' },
    { label: 'Delivery ETA', key: 'deliveryEta' },
    { label: 'City', key: 'city' },
    { label: 'Country', key: 'country' }
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleNotifications = () => {
    // Simulate notification system
    alert('Notification system activated! You will be notified of any at-risk orders.');
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Dashboard Actions</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <CSVLink
            data={orders}
            headers={csvHeaders}
            filename={`king-living-orders-${new Date().toISOString().split('T')[0]}.csv`}
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="outlined"
              startIcon={<Download />}
              size="small"
            >
              Export CSV
            </Button>
          </CSVLink>
          
          <Button
            variant="outlined"
            startIcon={<Print />}
            onClick={handlePrint}
            size="small"
          >
            Print Dashboard
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Notifications />}
            onClick={handleNotifications}
            size="small"
            color="warning"
          >
            Enable Notifications
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ExportActions;