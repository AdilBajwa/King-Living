/**
 * Order domain models and TypeScript-like interfaces for King Living
 */

export const OrderStatus = {
  PENDING: 'Pending',
  IN_PRODUCTION: 'In Production',
  SHIPPED: 'Shipped',
  OUT_FOR_DELIVERY: 'Out for Delivery',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
};

export const Region = {
  APAC: 'APAC',
  UK: 'UK',
  US: 'US'
};

export const ProductCategory = {
  SOFA: 'Sofa',
  BED: 'Bed',
  CHAIR: 'Chair',
  TABLE: 'Table',
  ACCESSORY: 'Accessory',
  STORAGE: 'Storage'
};

export const PaymentMethod = {
  CREDIT_CARD: 'Credit Card',
  PAYPAL: 'PayPal',
  BANK_TRANSFER: 'Bank Transfer',
  FINANCING: 'Financing'
};

export const DeliveryOption = {
  STANDARD: 'Standard',
  DELUXE: 'Deluxe'
};

/**
 * Order interface structure
 * @typedef {Object} Order
 * @property {string} id - Order ID
 * @property {string} dateTime - ISO format date/time
 * @property {string} region - APAC, UK, or US
 * @property {string} productSku - Product SKU
 * @property {string} productName - Product name
 * @property {string} productCategory - Product category
 * @property {number} quantity - Quantity ordered
 * @property {number} orderTotal - Order total amount
 * @property {string} currency - Currency code
 * @property {string} customerName - Customer full name
 * @property {string} customerEmail - Customer email
 * @property {string} deliveryAddress - Full delivery address
 * @property {string} city - Delivery city
 * @property {string} country - Delivery country
 * @property {string} status - Order status
 * @property {string} paymentMethod - Payment method
 * @property {string} deliveryOption - Delivery option
 * @property {string} deliveryEta - Expected delivery date
 * @property {string} lastStatusUpdate - Last status update timestamp
 * @property {Object} productConfiguration - Product customization details
 * @property {string} warrantyStatus - Warranty status
 * @property {string} customerServiceContact - Customer service contact info
 * @property {boolean} feedbackReceived - Whether customer feedback received
 * @property {string} notes - Additional notes
 */