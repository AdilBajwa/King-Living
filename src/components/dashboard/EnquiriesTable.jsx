import React from 'react';
import { useState } from 'react';
import { 
  Paper, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Chip,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';
import EnquiryDetailsModal from './EnquiryDetailsModal.jsx';

const generateEnquiries = () => {
  return Array.from({ length: 8 }, () => ({
    id: faker.string.alphanumeric({ length: 8, casing: 'upper' }),
    customerName: faker.person.fullName(),
    email: faker.internet.email(),
    product: faker.helpers.arrayElement([
      'Jasper Modular Sofa',
      'Felix Corner Lounge', 
      'Delta Modular System',
      'Tivoli Bed Frame',
      'Milano Storage Bed'
    ]),
    enquiryType: faker.helpers.arrayElement(['Product Info', 'Pricing', 'Availability', 'Customization']),
    status: faker.helpers.arrayElement(['New', 'In Progress', 'Responded', 'Closed']),
    date: faker.date.recent({ days: 7 }),
    priority: faker.helpers.arrayElement(['High', 'Medium', 'Low'])
  }));
};

const EnquiriesTable = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  const enquiries = generateEnquiries();

  const handleEnquiryClick = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedEnquiry(null);
  };

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
    <>
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">Recent Enquiries</Typography>
          <Chip label={`${enquiries.length} Active`} color="primary" size="small" />
        </Box>
        
        <TableContainer sx={{ maxHeight: isMobile ? 250 : 350 }}>
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                {!isMobile && <TableCell>Product</TableCell>}
                <TableCell>Type</TableCell>
                {!isMobile && <TableCell>Priority</TableCell>}
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enquiries.map((enquiry) => (
                <TableRow 
                  key={enquiry.id} 
                  hover 
                  sx={{ cursor: 'pointer' }}
                  onClick={() => handleEnquiryClick(enquiry)}
                >
                  <TableCell>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {enquiry.customerName}
                      </Typography>
                      {!isMobile && (
                        <Typography variant="caption" color="text.secondary">
                          {enquiry.email}
                        </Typography>
                      )}
                    </Box>
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <Typography variant="body2">{enquiry.product}</Typography>
                    </TableCell>
                  )}
                  <TableCell>
                    <Typography variant="body2">{enquiry.enquiryType}</Typography>
                  </TableCell>
                  {!isMobile && (
                    <TableCell>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: getPriorityColor(enquiry.priority),
                          display: 'inline-block',
                          mr: 1
                        }}
                      />
                      <Typography variant="body2" component="span">
                        {enquiry.priority}
                      </Typography>
                    </TableCell>
                  )}
                  <TableCell>
                    <Chip 
                      label={enquiry.status} 
                      size="small" 
                      color={getStatusColor(enquiry.status)}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {format(enquiry.date, 'MMM dd')}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      
      <EnquiryDetailsModal
        enquiry={selectedEnquiry}
        open={modalOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export default EnquiriesTable;