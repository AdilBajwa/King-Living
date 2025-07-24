import React from 'react';
import { Box, Container, AppBar, Toolbar, Typography, Paper, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import Sidebar from './Sidebar.jsx';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#1a1a1a',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
}));

const MainContent = styled(Box)(({ theme, ismobile }) => ({
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  marginLeft: ismobile === 'true' ? 0 : 240,
  transition: theme.transitions.create(['margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  })
}));

const DashboardLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box>
      {!isMobile && <Sidebar />}
      
      <StyledAppBar position="static">
        <Toolbar>
          <Typography 
            variant={isMobile ? "subtitle1" : "h6"} 
            component="div" 
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            King Living - Employee Orders Dashboard
          </Typography>
          {!isMobile && (
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Global Operations Center
            </Typography>
          )}
        </Toolbar>
      </StyledAppBar>
      
      <MainContent ismobile={isMobile.toString()}>
        <Container maxWidth={false} sx={{ px: isMobile ? 1 : 2, maxWidth: '100%' }}>
          {children}
        </Container>
      </MainContent>
    </Box>
  );
};

export default DashboardLayout;