import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  IconButton,
  Paper
} from '@mui/material';
import { Close, Warning, LocalShipping } from '@mui/icons-material';
import { format } from 'date-fns';
import { OrderStatus } from '../../models/Order.js';

const formatCurrency = (amount, currency) => {
  const symbols = { AUD: '$', GBP: '£', USD: '$' };
  return `${symbols[currency] || '$'}${amount.toLocaleString()}`;
};

const AtRiskOrdersModal = ({ open, onClose, atRiskOrders, onOrderSelect }) => {
  const getDaysOverdue = (eta) => {
    const etaDate = new Date(eta);
    const now = new Date();
    const diffTime = now - etaDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Warning sx={{ mr: 1, color: '#ff9800' }} />
          <Typography variant="h6">At-Risk Orders</Typography>
          <Chip 
            label={`${atRiskOrders.length} Orders`} 
            color="warning" 
            size="small" 
            sx={{ ml: 2 }} 
          />
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {atRiskOrders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No at-risk orders found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All orders are on track for delivery
            </Typography>
          </Box>
        ) : (
          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Region</TableCell>
                  <TableCell>Order Total</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Expected ETA</TableCell>
                  <TableCell>Days Overdue</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {atRiskOrders.map((order) => (
                  <TableRow 
                    key={order.id} 
                    hover
                    sx={{ backgroundColor: '#fff3cd' }}
                  >
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {order.customerName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.city}, {order.country}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="body2">{order.productName}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {order.productSku}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={order.region} 
                        size="small" 
                        variant="outlined"
                        color={order.region === 'APAC' ? 'primary' : order.region === 'UK' ? 'secondary' : 'default'}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      {formatCurrency(order.orderTotal, order.currency)}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip 
                          label={order.status}
                          size="small"
                          color={order.status === OrderStatus.SHIPPED ? 'info' : 'primary'}
                        />
                        {order.status === OrderStatus.OUT_FOR_DELIVERY && (
                          <LocalShipping sx={{ ml: 1, color: '#1976d2', fontSize: 16 }} />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {format(new Date(order.deliveryEta), 'MMM dd, yyyy')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={`${getDaysOverdue(order.deliveryEta)} days`}
                        size="small"
                        color="error"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={() => {
                          onOrderSelect(order);
                          onClose();
                        }}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button variant="outlined" color="warning">
          Export At-Risk Orders
        </Button>
        <Button variant="outlined" color="primary">
          Send Notifications
        </Button>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AtRiskOrdersModal;