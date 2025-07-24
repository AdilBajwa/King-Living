import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider
} from '@mui/material';
import { 
  Close, 
  Person, 
  Email, 
  Phone, 
  Inventory,
  Schedule,
  Flag
} from '@mui/icons-material';
import { format } from 'date-fns';

const EnquiryDetailsModal = ({ enquiry, open, onClose }) => {
  if (!enquiry) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'error';
      case 'In Progress': return 'warning';
      case 'Responded': return 'info';
      case 'Closed': return 'success';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ff5722';
      case 'Medium': return '#ff9800';
      case 'Low': return '#4caf50';
      default: return '#757575';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h5" component="div">
            Enquiry Details
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            ID: {enquiry.id}
          </Typography>
        </Box>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Customer Information */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Customer Information</Typography>
                </Box>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                  {enquiry.customerName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Email sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2">{enquiry.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2">+1 (555) 123-4567</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Enquiry Information */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Inventory sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Enquiry Information</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">Product</Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                  {enquiry.product}
                </Typography>
                <Typography variant="body2" color="text.secondary">Enquiry Type</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>{enquiry.enquiryType}</Typography>
                <Typography variant="body2" color="text.secondary">Date</Typography>
                <Typography variant="body1">{format(enquiry.date, 'PPP')}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Status and Priority */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Schedule sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">Status & Priority</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Status</Typography>
                    <Chip 
                      label={enquiry.status} 
                      color={getStatusColor(enquiry.status)}
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Priority</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                      <Flag sx={{ 
                        mr: 1, 
                        fontSize: 16, 
                        color: getPriorityColor(enquiry.priority) 
                      }} />
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {enquiry.priority}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Enquiry Details
                </Typography>
                <Typography variant="body1">
                  Customer is interested in {enquiry.product} and has requested {enquiry.enquiryType.toLowerCase()}. 
                  They are looking for a custom configuration with specific color and material requirements. 
                  Follow-up required within 24 hours.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button variant="outlined" color="primary">
          Assign to Agent
        </Button>
        <Button variant="outlined" color="warning">
          Update Status
        </Button>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnquiryDetailsModal;