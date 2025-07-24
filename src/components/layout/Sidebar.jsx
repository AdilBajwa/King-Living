import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Dashboard,
  Inventory,
  People,
  Assessment,
  Settings,
  LocalShipping,
  Support
} from '@mui/icons-material';

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
    backgroundColor: '#1a1a1a',
    color: 'white',
    borderRight: 'none'
  },
}));

const Logo = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3, 2),
  textAlign: 'center',
  borderBottom: '1px solid rgba(255,255,255,0.1)'
}));

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, active: true },
  { text: 'Orders', icon: <Inventory />, active: false },
  { text: 'Customers', icon: <People />, active: false },
  { text: 'Products', icon: <LocalShipping />, active: false },
  { text: 'Reports', icon: <Assessment />, active: false },
  { text: 'Support', icon: <Support />, active: false },
  { text: 'Settings', icon: <Settings />, active: false }
];

const Sidebar = () => {
  return (
    <StyledDrawer variant="permanent" anchor="left">
      <Logo>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#4facfe' }}>
          King Living
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
          Operations Center
        </Typography>
      </Logo>
      
      <List sx={{ pt: 2 }}>
        {menuItems.map((item, index) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              sx={{
                mx: 1,
                borderRadius: 2,
                mb: 0.5,
                backgroundColor: item.active ? 'rgba(79, 172, 254, 0.2)' : 'transparent',
                '&:hover': {
                  backgroundColor: item.active ? 'rgba(79, 172, 254, 0.3)' : 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <ListItemIcon sx={{ color: item.active ? '#4facfe' : 'rgba(255,255,255,0.7)' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text}
                sx={{ 
                  '& .MuiListItemText-primary': { 
                    color: item.active ? '#4facfe' : 'rgba(255,255,255,0.9)',
                    fontWeight: item.active ? 600 : 400
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;