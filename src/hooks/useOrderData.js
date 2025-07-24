import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, fetchSummaryMetrics, fetchAtRiskOrders } from '../store/slices/orderSlice.js';

/**
 * Custom hook for order data management
 */
export const useOrderData = () => {
  const dispatch = useDispatch();
  const { 
    orders, 
    summaryMetrics, 
    atRiskOrders, 
    selectedOrder, 
    filters, 
    loading, 
    error 
  } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchAtRiskOrders());
  }, [dispatch]);

  // Recalculate metrics when orders or filters change
  useEffect(() => {
    if (orders.length > 0) {
      dispatch(fetchSummaryMetrics());
    }
  }, [dispatch, orders, filters]);

  // Filter orders based on current filters
  const filteredOrders = orders.filter(order => {
    if (filters.region !== 'all' && order.region !== filters.region) {
      return false;
    }
    if (filters.status !== 'all' && order.status !== filters.status) {
      return false;
    }
    if (filters.dateRange !== 'all') {
      const orderDate = new Date(order.dateTime);
      const now = new Date();
      const daysAgo = filters.dateRange === '7days' ? 7 : 30;
      const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
      if (orderDate < cutoffDate) {
        return false;
      }
    }
    return true;
  });

  return {
    orders: filteredOrders,
    allOrders: orders,
    summaryMetrics,
    atRiskOrders,
    selectedOrder,
    filters,
    loading,
    error
  };
};