import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../services/orderService.js';

// Async thunks
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await orderService.getAllOrders();
    return response;
  }
);

export const fetchSummaryMetrics = createAsyncThunk(
  'orders/fetchSummaryMetrics',
  async () => {
    const response = await orderService.getSummaryMetrics();
    return response;
  }
);

export const fetchAtRiskOrders = createAsyncThunk(
  'orders/fetchAtRiskOrders',
  async () => {
    const response = await orderService.getAtRiskOrders();
    return response;
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, newStatus }) => {
    const response = await orderService.updateOrderStatus(orderId, newStatus);
    return response;
  }
);

const initialState = {
  orders: [],
  summaryMetrics: null,
  atRiskOrders: [],
  selectedOrder: null,
  filters: {
    region: 'all',
    status: 'all',
    dateRange: 'all'
  },
  loading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Fetch summary metrics
      .addCase(fetchSummaryMetrics.fulfilled, (state, action) => {
        state.summaryMetrics = action.payload;
      })
      // Fetch at-risk orders
      .addCase(fetchAtRiskOrders.fulfilled, (state, action) => {
        state.atRiskOrders = action.payload;
      })
      // Update order status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      });
  }
});

export const { setSelectedOrder, clearSelectedOrder, setFilters, clearFilters } = orderSlice.actions;
export default orderSlice.reducer;