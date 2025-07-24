import { mockOrders } from '../data/mockDataGenerator.js';
import { OrderStatus, Region } from '../models/Order.js';

/**
 * Order service layer for data operations
 */

class OrderService {
  constructor() {
    this.orders = mockOrders;
  }

  // Get all orders
  getAllOrders() {
    return Promise.resolve([...this.orders]);
  }

  // Get orders by region
  getOrdersByRegion(region) {
    return Promise.resolve(
      this.orders.filter(order => order.region === region)
    );
  }

  // Get orders by status
  getOrdersByStatus(status) {
    return Promise.resolve(
      this.orders.filter(order => order.status === status)
    );
  }

  // Get order by ID
  getOrderById(id) {
    return Promise.resolve(
      this.orders.find(order => order.id === id)
    );
  }

  // Get summary metrics
  getSummaryMetrics() {
    const metrics = {
      totalOrders: this.orders.length,
      totalRevenue: 0,
      onTimeDeliveryRate: 0,
      ordersByRegion: {},
      ordersByStatus: {},
      recentTrends: this.calculateTrends(),
      nextMonthPrediction: this.predictNextMonth()
    };

    // Calculate totals and distributions
    this.orders.forEach(order => {
      metrics.totalRevenue += order.orderTotal;

      // Count by region
      if (!metrics.ordersByRegion[order.region]) {
        metrics.ordersByRegion[order.region] = { count: 0, revenue: 0 };
      }
      metrics.ordersByRegion[order.region].count++;
      metrics.ordersByRegion[order.region].revenue += order.orderTotal;

      // Count by status
      if (!metrics.ordersByStatus[order.status]) {
        metrics.ordersByStatus[order.status] = 0;
      }
      metrics.ordersByStatus[order.status]++;
    });

    // Calculate on-time delivery rate (mock calculation)
    const deliveredOrders = this.orders.filter(order => order.status === OrderStatus.DELIVERED);
    metrics.onTimeDeliveryRate = deliveredOrders.length > 0 
      ? Math.round((deliveredOrders.length * 0.85) / deliveredOrders.length * 100) // Assume 85% on-time
      : 0;

    return Promise.resolve(metrics);
  }

  // Calculate filtered metrics based on date range and region
  getFilteredSummaryMetrics(orders) {
    const metrics = {
      totalOrders: orders.length,
      totalRevenue: 0,
      onTimeDeliveryRate: 0,
      ordersByRegion: {},
      ordersByStatus: {},
      recentTrends: this.calculateFilteredTrends(orders),
      nextMonthPrediction: this.predictNextPeriod(orders)
    };

    // Calculate totals and distributions
    orders.forEach(order => {
      metrics.totalRevenue += order.orderTotal;

      // Count by region
      if (!metrics.ordersByRegion[order.region]) {
        metrics.ordersByRegion[order.region] = { count: 0, revenue: 0 };
      }
      metrics.ordersByRegion[order.region].count++;
      metrics.ordersByRegion[order.region].revenue += order.orderTotal;

      // Count by status
      if (!metrics.ordersByStatus[order.status]) {
        metrics.ordersByStatus[order.status] = 0;
      }
      metrics.ordersByStatus[order.status]++;
    });

    // Calculate on-time delivery rate
    const deliveredOrders = orders.filter(order => order.status === OrderStatus.DELIVERED);
    metrics.onTimeDeliveryRate = deliveredOrders.length > 0 
      ? Math.round((deliveredOrders.length * 0.85) / deliveredOrders.length * 100)
      : 0;

    return Promise.resolve(metrics);
  }

  // Calculate trends for filtered orders
  calculateFilteredTrends(orders) {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const last7Days = orders.filter(order => 
      new Date(order.dateTime) >= sevenDaysAgo
    );
    const last30Days = orders.filter(order => 
      new Date(order.dateTime) >= thirtyDaysAgo
    );

    return {
      last7Days: {
        count: last7Days.length,
        revenue: last7Days.reduce((sum, order) => sum + order.orderTotal, 0)
      },
      last30Days: {
        count: last30Days.length,
        revenue: last30Days.reduce((sum, order) => sum + order.orderTotal, 0)
      }
    };
  }

  // Predict next period based on filtered data
  predictNextPeriod(orders) {
    if (orders.length === 0) {
      return {
        predictedOrders: 0,
        predictedRevenue: 0,
        confidence: 0
      };
    }

    const avgDailyOrders = orders.length / 30; // Assuming 30 days of data
    const avgDailyRevenue = orders.reduce((sum, order) => sum + order.orderTotal, 0) / 30;

    return {
      predictedOrders: Math.round(avgDailyOrders * 30),
      predictedRevenue: Math.round(avgDailyRevenue * 30),
      confidence: 0.75
    };
  }

  // Calculate 7-day and 30-day trends
  calculateTrends() {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const last7Days = this.orders.filter(order => 
      new Date(order.dateTime) >= sevenDaysAgo
    );
    const last30Days = this.orders.filter(order => 
      new Date(order.dateTime) >= thirtyDaysAgo
    );

    return {
      last7Days: {
        count: last7Days.length,
        revenue: last7Days.reduce((sum, order) => sum + order.orderTotal, 0)
      },
      last30Days: {
        count: last30Days.length,
        revenue: last30Days.reduce((sum, order) => sum + order.orderTotal, 0)
      }
    };
  }

  // Predict next month's output
  predictNextMonth() {
    const avgDailyOrders = this.orders.length / 90; // Assuming 90 days of data
    const avgDailyRevenue = this.orders.reduce((sum, order) => sum + order.orderTotal, 0) / 90;

    return {
      predictedOrders: Math.round(avgDailyOrders * 30),
      predictedRevenue: Math.round(avgDailyRevenue * 30),
      confidence: 0.75 // 75% confidence level
    };
  }

  // Simulate order status update
  updateOrderStatus(orderId, newStatus) {
    const orderIndex = this.orders.findIndex(order => order.id === orderId);
    if (orderIndex !== -1) {
      this.orders[orderIndex].status = newStatus;
      this.orders[orderIndex].lastStatusUpdate = new Date().toISOString();
      return Promise.resolve(this.orders[orderIndex]);
    }
    return Promise.reject(new Error('Order not found'));
  }

  // Get at-risk orders (overdue or delayed)
  getAtRiskOrders() {
    const now = new Date();
    return Promise.resolve(
      this.orders.filter(order => {
        const eta = new Date(order.deliveryEta);
        return (
          (order.status === OrderStatus.SHIPPED || order.status === OrderStatus.OUT_FOR_DELIVERY) &&
          eta < now
        );
      })
    );
  }
}

export const orderService = new OrderService();