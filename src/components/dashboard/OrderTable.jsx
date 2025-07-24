import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Tooltip,
  Box,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Visibility, LocalShipping, Warning } from '@mui/icons-material';
import { format } from 'date-fns';
import { OrderStatus } from '../../models/Order.js';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  maxHeight: 600,
  '& .MuiTableHead-root': {
    backgroundColor: '#f5f5f5'
  }
}));

const StatusChip = styled(Chip)(({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case OrderStatus.PENDING:
        return { backgroundColor: '#fff3cd', color: '#856404' };
      case OrderStatus.IN_PRODUCTION:
        return { backgroundColor: '#d4edda', color: '#155724' };
      case OrderStatus.SHIPPED:
        return { backgroundColor: '#d1ecf1', color: '#0c5460' };
      case OrderStatus.OUT_FOR_DELIVERY:
        return { backgroundColor: '#cce5ff', color: '#004085' };
      case OrderStatus.DELIVERED:
        return { backgroundColor: '#d4edda', color: '#155724' };
      case OrderStatus.CANCELLED:
        return { backgroundColor: '#f8d7da', color: '#721c24' };
      default:
        return { backgroundColor: '#e2e3e5', color: '#383d41' };
    }
  };

  return getStatusColor(status);
});

const formatCurrency = (amount, currency) => {
  const symbols = { AUD: '$', GBP: '£', USD: '$' };
  return `${symbols[currency] || '$'}${amount.toLocaleString()}`;
};

const OrderTable = ({ orders, onOrderSelect }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isAtRisk = (order) => {
    const eta = new Date(order.deliveryEta);
    const now = new Date();
    return (
      (order.status === OrderStatus.SHIPPED || order.status === OrderStatus.OUT_FOR_DELIVERY) &&
      eta < now
    );
  };

  const paginatedOrders = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h6">Order Management</Typography>
        <Typography variant="body2" color="text.secondary">
          {orders.length} orders found
        </Typography>
      </Box>
      
      <StyledTableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delivery ETA</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              <TableRow 
                key={order.id} 
                hover
                sx={{ 
                  cursor: 'pointer',
                  backgroundColor: isAtRisk(order) ? '#fff3cd' : 'inherit'
                }}
                onClick={() => onOrderSelect(order)}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {order.id}
                    {isAtRisk(order) && (
                      <Tooltip title="At Risk - Overdue">
                        <Warning sx={{ ml: 1, color: '#ff9800', fontSize: 16 }} />
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  {format(new Date(order.dateTime), 'MMM dd, yyyy')}
                </TableCell>
                <TableCell>
                  <Chip 
                    label={order.region} 
                    size="small" 
                    variant="outlined"
                    color={order.region === 'APAC' ? 'primary' : order.region === 'UK' ? 'secondary' : 'default'}
                  />
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
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {order.productName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {order.productSku}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>
                  {formatCurrency(order.orderTotal, order.currency)}
                </TableCell>
                <TableCell>
                  <StatusChip 
                    label={order.status}
                    size="small"
                    status={order.status}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {format(new Date(order.deliveryEta), 'MMM dd')}
                    {order.status === OrderStatus.OUT_FOR_DELIVERY && (
                      <LocalShipping sx={{ ml: 1, color: '#1976d2', fontSize: 16 }} />
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Tooltip title="View Details">
                    <IconButton 
                      size="small" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onOrderSelect(order);
                      }}
                    >
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default OrderTable;