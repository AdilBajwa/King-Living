import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
  Box,
  Chip,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  Close, 
  Person, 
  LocalShipping, 
  Payment, 
  Inventory,
  Phone,
  Email,
  LocationOn,
  Schedule,
  Feedback
} from '@mui/icons-material';
import { format } from 'date-fns';
import { OrderStatus } from '../../models/Order.js';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    maxWidth: '900px',
    width: '100%',
    maxHeight: '90vh'
  }
}));

const InfoCard = styled(Card)(({ theme }) => ({
  height: '100%',
  '& .MuiCardContent-root': {
    padding: theme.spacing(2)
  }
}));

const formatCurrency = (amount, currency) => {
  const symbols = { AUD: '$', GBP: '£', USD: '$' };
  return `${symbols[currency] || '$'}${amount.toLocaleString()}`;
};

const getOrderSteps = () => [
  'Pending',
  'In Production',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

const getActiveStep = (status) => {
  const steps = getOrderSteps();
  const statusMap = {
    [OrderStatus.PENDING]: 0,
    [OrderStatus.IN_PRODUCTION]: 1,
    [OrderStatus.SHIPPED]: 2,
    [OrderStatus.OUT_FOR_DELIVERY]: 3,
    [OrderStatus.DELIVERED]: 4,
    [OrderStatus.CANCELLED]: -1
  };
  return statusMap[status] || 0;
};

const OrderDetailsModal = ({ order, open, onClose }) => {
  if (!order) return null;

  const activeStep = getActiveStep(order.status);
  const steps = getOrderSteps();

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="lg">
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" component="div">
            Order Details
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {order.id}
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Order Status Pipeline */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Order Progress</Typography>
          {order.status !== OrderStatus.CANCELLED ? (
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          ) : (
            <Chip label="Order Cancelled" color="error" size="large" />
          )}
        </Box>

        <Grid container spacing={3}>
          {/* Customer Information */}
          <Grid item xs={12} md={6}>
            <InfoCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Customer Information</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                  {order.customerName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Email sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2">{order.customerEmail}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    {order.deliveryAddress}, {order.city}, {order.country}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2">{order.customerServiceContact}</Typography>
                </Box>
              </CardContent>
            </InfoCard>
          </Grid>

          {/* Order Information */}
          <Grid item xs={12} md={6}>
            <InfoCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Inventory sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Order Information</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">Order Date</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {format(new Date(order.dateTime), 'PPP')}
                </Typography>
                <Typography variant="body2" color="text.secondary">Region</Typography>
                <Chip label={order.region} size="small" sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">Total Amount</Typography>
                <Typography variant="h6" color="primary.main" sx={{ mb: 1 }}>
                  {formatCurrency(order.orderTotal, order.currency)}
                </Typography>
                <Typography variant="body2" color="text.secondary">Payment Method</Typography>
                <Typography variant="body1">{order.paymentMethod}</Typography>
              </CardContent>
            </InfoCard>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12}>
            <InfoCard>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Product Details</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">Product Name</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                      {order.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">SKU</Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>{order.productSku}</Typography>
                    <Typography variant="body2" color="text.secondary">Category</Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>{order.productCategory}</Typography>
                    <Typography variant="body2" color="text.secondary">Quantity</Typography>
                    <Typography variant="body1">{order.quantity}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Product Configuration
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {Object.entries(order.productConfiguration).map(([key, value]) => (
                        <Chip 
                          key={key} 
                          label={`${key}: ${value}`} 
                          size="small" 
                          variant="outlined" 
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </InfoCard>
          </Grid>

          {/* Delivery Information */}
          <Grid item xs={12} md={6}>
            <InfoCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocalShipping sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Delivery Information</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">Delivery Option</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{order.deliveryOption}</Typography>
                <Typography variant="body2" color="text.secondary">Expected Delivery</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {format(new Date(order.deliveryEta), 'PPP')}
                </Typography>
                <Typography variant="body2" color="text.secondary">Current Status</Typography>
                <Chip 
                  label={order.status} 
                  color={order.status === OrderStatus.DELIVERED ? 'success' : 'primary'}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">Last Update</Typography>
                <Typography variant="body1">
                  {format(new Date(order.lastStatusUpdate), 'PPp')}
                </Typography>
              </CardContent>
            </InfoCard>
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12} md={6}>
            <InfoCard>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Schedule sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Additional Information</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">Warranty Status</Typography>
                <Chip 
                  label={order.warrantyStatus} 
                  size="small" 
                  color={order.warrantyStatus === 'Active' ? 'success' : 'default'}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">Customer Feedback</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Feedback sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body1">
                    {order.feedbackReceived ? 'Received' : 'Pending'}
                  </Typography>
                </Box>
                {order.notes && (
                  <>
                    <Typography variant="body2" color="text.secondary">Notes</Typography>
                    <Typography variant="body1">{order.notes}</Typography>
                  </>
                )}
              </CardContent>
            </InfoCard>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button variant="outlined" color="secondary">
          Rebook Delivery
        </Button>
        <Button variant="outlined" color="warning">
          Resolve Issue
        </Button>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default OrderDetailsModal;