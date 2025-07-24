import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  TrendingUp, 
  ShoppingCart, 
  AttachMoney, 
  LocalShipping,
  Warning,
  Visibility
} from '@mui/icons-material';

const MetricCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  '&.revenue': {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  '&.delivery': {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  '&.materials': {
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  '&.prediction': {
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  '&.risk': {
    background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  marginBottom: theme.spacing(2)
}));

const formatCurrency = (amount, currency) => {
  const symbols = { AUD: '$', GBP: '£', USD: '$' };
  return `${symbols[currency] || '$'}${amount.toLocaleString()}`;
};

const SummaryCards = ({ metrics, atRiskOrders, onAtRiskClick, dateRange }) => {
  if (!metrics) return null;

  const getPredictionText = (dateRange) => {
    switch (dateRange) {
      case 'last7days':
      case 'last30days':
        return 'Next Week Prediction';
      case 'thismonth':
      case 'lastmonth':
        return 'Next Month Prediction';
      case 'thisyear':
      case 'lastyear':
        return 'Next Year Prediction';
      default:
        return 'Next Period Prediction';
    }
  };

  const cards = [
    {
      title: 'Total Orders',
      value: metrics.totalOrders.toLocaleString(),
      icon: <ShoppingCart />,
      className: '',
      subtitle: 'All Regions'
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(metrics.totalRevenue, 'AUD'),
      icon: <AttachMoney />,
      className: 'revenue',
      subtitle: 'Combined Revenue'
    },
    {
      title: 'On-Time Delivery',
      value: `${metrics.onTimeDeliveryRate}%`,
      icon: <LocalShipping />,
      className: 'delivery',
      subtitle: 'Delivery Performance'
    },
    {
      title: getPredictionText(dateRange),
      value: metrics.nextMonthPrediction.predictedOrders.toLocaleString(),
      icon: <TrendingUp />,
      className: 'prediction',
      subtitle: `${Math.round(metrics.nextMonthPrediction.confidence * 100)}% Confidence`
    },
    {
      title: 'At-Risk Orders',
      value: atRiskOrders.length.toString(),
      icon: <Warning />,
      className: 'risk',
      subtitle: 'Require Attention',
      clickable: true,
      onClick: onAtRiskClick
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Grid container spacing={3} sx={{ mb: 3 }}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={4} lg={card.clickable ? 3 : 2.4} key={index}>
          <MetricCard 
            className={card.className}
            sx={{ 
              cursor: card.clickable ? 'pointer' : 'default',
              '&:hover': card.clickable ? { transform: 'translateY(-2px)' } : {}
            }}
            onClick={card.onClick}
          >
            <CardContent>
              <IconWrapper>
                {card.icon}
                {card.clickable && (
                  <Visibility sx={{ position: 'absolute', top: 2, right: 2, fontSize: 16 }} />
                )}
              </IconWrapper>
              <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1 }}>
                {card.value}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1, opacity: 0.9 }}>
                {card.title}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {card.subtitle}
              </Typography>
            </CardContent>
          </MetricCard>
        </Grid>
      ))}
      </Grid>
    </Box>
  );
};

export default SummaryCards;