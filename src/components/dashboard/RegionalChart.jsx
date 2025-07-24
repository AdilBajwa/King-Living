import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Cell,
} from 'recharts';
import { REGION_COLORS } from '../../util/constants';

const RegionalChart = ({ summaryMetrics }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!summaryMetrics?.ordersByRegion) return null;

  const regionData = Object.entries(summaryMetrics.ordersByRegion).map(
    ([region, data]) => ({
      region,
      orders: data.count,
      revenue: data.revenue,
      currency: region === 'UK' ? 'GBP' : region === 'US' ? 'USD' : 'AUD',
    })
  );

  const formatCurrency = (amount, currency) => {
    const symbols = { AUD: '$', GBP: '£', USD: '$' };
    return `${symbols[currency] || '$'}${(amount / 1000).toFixed(0)}k`;
  };

  return (
    <Paper sx={{ p: 3, width: '100%' }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Regional Performance
      </Typography>

      {/* Charts Layout */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          gap: 4,
          flexWrap: 'wrap',
          width: '100%',
          minWidth: 0,
        }}
      >
        {/* Orders by Region */}
        <Box
          sx={{
            flex: 1,
            minWidth: { xs: '100%', lg: '800px' },
            width: { xs: '100%', lg: '50%' },
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Orders by Region
          </Typography>
          <Box sx={{ width: '100%', height: isMobile ? 220 : 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={regionData}
                barCategoryGap="10%"
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" fontSize={isMobile ? 10 : 13} />
                <YAxis fontSize={isMobile ? 10 : 13} />
                <Tooltip formatter={(value) => [`${value} orders`, 'Orders']} />
                <Bar
                  dataKey="orders"
                  radius={[6, 6, 0, 0]}
                  barSize={isMobile ? 45 : 70}
                >
                  {regionData.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={REGION_COLORS[entry.region] || '#8884d8'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Box>

        {/* Revenue by Region */}
        <Box
          sx={{
            flex: 1,
            minWidth: { xs: '100%', lg: '800px' },
            width: { xs: '100%', lg: '50%' },
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            Revenue by Region
          </Typography>
          <Box sx={{ width: '100%', height: isMobile ? 220 : 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={regionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" fontSize={isMobile ? 10 : 13} />
                <YAxis
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                  fontSize={isMobile ? 10 : 13}
                />
                <Tooltip
                  formatter={(value, name, props) => [
                    formatCurrency(value, props.payload.currency),
                    'Revenue',
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#4facfe"
                  strokeWidth={4}
                  dot={{ fill: '#4facfe', strokeWidth: 3, r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>

      {/* Regional Summary Cards */}
      <Grid container spacing={3} sx={{ mt: isMobile ? 2 : 4 }}>
        {regionData.map((region) => (
          <Grid item xs={12} sm={4} key={region.region}>
            <Box
              sx={{
                p: isMobile ? 1.5 : 2,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                textAlign: 'center',
                background: `linear-gradient(135deg, ${
                  REGION_COLORS[region.region]
                }20 0%, ${REGION_COLORS[region.region]}10 100%)`,
                borderLeft: `4px solid ${REGION_COLORS[region.region]}`,
              }}
            >
              <Typography
                variant={isMobile ? 'h5' : 'h4'}
                sx={{
                  fontWeight: 600,
                  color: REGION_COLORS[region.region],
                  mb: 1,
                }}
              >
                {region.orders}
              </Typography>
              <Typography
                variant={isMobile ? 'subtitle1' : 'h6'}
                sx={{ fontWeight: 500, mb: 1 }}
              >
                {region.region}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(region.revenue, region.currency)} Revenue
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default RegionalChart;
