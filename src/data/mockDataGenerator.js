import { faker } from '@faker-js/faker';
import { OrderStatus, Region, ProductCategory, PaymentMethod, DeliveryOption } from '../models/Order.js';

/**
 * Mock data generator for King Living orders
 */

const KING_LIVING_PRODUCTS = {
  [ProductCategory.SOFA]: [
    { name: 'Jasper Modular Sofa', sku: 'KL-JMS-001' },
    { name: 'Felix Corner Lounge', sku: 'KL-FCL-002' },
    { name: 'Delta Modular System', sku: 'KL-DMS-003' },
    { name: 'Zara Sectional', sku: 'KL-ZS-004' }
  ],
  [ProductCategory.BED]: [
    { name: 'Tivoli Bed Frame', sku: 'KL-TBF-101' },
    { name: 'Milano Storage Bed', sku: 'KL-MSB-102' },
    { name: 'Capri Platform Bed', sku: 'KL-CPB-103' }
  ],
  [ProductCategory.CHAIR]: [
    { name: 'Luxe Recliner', sku: 'KL-LR-201' },
    { name: 'Swivel Armchair', sku: 'KL-SA-202' },
    { name: 'Dining Chair Set', sku: 'KL-DCS-203' }
  ],
  [ProductCategory.TABLE]: [
    { name: 'Marble Dining Table', sku: 'KL-MDT-301' },
    { name: 'Glass Coffee Table', sku: 'KL-GCT-302' },
    { name: 'Oak Side Table', sku: 'KL-OST-303' }
  ],
  [ProductCategory.ACCESSORY]: [
    { name: 'Luxury Cushion Set', sku: 'KL-LCS-401' },
    { name: 'Throw Blanket', sku: 'KL-TB-402' },
    { name: 'Floor Lamp', sku: 'KL-FL-403' }
  ],
  [ProductCategory.STORAGE]: [
    { name: 'Modular Shelving', sku: 'KL-MS-501' },
    { name: 'Entertainment Unit', sku: 'KL-EU-502' },
    { name: 'Wardrobe System', sku: 'KL-WS-503' }
  ]
};

const REGION_CONFIG = {
  [Region.APAC]: {
    currency: 'AUD',
    countries: ['Australia', 'New Zealand', 'Singapore', 'Hong Kong'],
    cities: ['Sydney', 'Melbourne', 'Auckland', 'Singapore', 'Hong Kong']
  },
  [Region.UK]: {
    currency: 'GBP',
    countries: ['United Kingdom'],
    cities: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol']
  },
  [Region.US]: {
    currency: 'USD',
    countries: ['United States'],
    cities: ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix']
  }
};

const generateProductConfiguration = (category) => {
  const baseConfig = {
    color: faker.helpers.arrayElement(['Charcoal', 'Cream', 'Navy', 'Taupe', 'Black', 'White']),
    material: faker.helpers.arrayElement(['Leather', 'Fabric', 'Velvet', 'Linen'])
  };

  switch (category) {
    case ProductCategory.SOFA:
      return {
        ...baseConfig,
        configuration: faker.helpers.arrayElement(['2-Seater', '3-Seater', 'Corner', 'Modular']),
        dimensions: `${faker.number.int({ min: 180, max: 320 })}cm x ${faker.number.int({ min: 90, max: 120 })}cm`,
        cushionFirmness: faker.helpers.arrayElement(['Soft', 'Medium', 'Firm']),
        armStyle: faker.helpers.arrayElement(['Low', 'High', 'Curved', 'Square'])
      };
    case ProductCategory.BED:
      return {
        ...baseConfig,
        size: faker.helpers.arrayElement(['Queen', 'King', 'Super King']),
        headboardStyle: faker.helpers.arrayElement(['Upholstered', 'Wooden', 'Metal']),
        storage: faker.datatype.boolean()
      };
    default:
      return baseConfig;
  }
};

const generateOrder = (region) => {
  const config = REGION_CONFIG[region];
  const category = faker.helpers.arrayElement(Object.values(ProductCategory));
  const product = faker.helpers.arrayElement(KING_LIVING_PRODUCTS[category]);
  const status = faker.helpers.arrayElement(Object.values(OrderStatus));
  const quantity = faker.number.int({ min: 1, max: 5 });
  const basePrice = faker.number.int({ min: 500, max: 8000 });
  const orderTotal = basePrice * quantity;
  
  const orderDate = faker.date.recent({ days: 90 });
  const deliveryEta = faker.date.future({ days: 30, refDate: orderDate });
  const lastUpdate = faker.date.between({ from: orderDate, to: new Date() });

  return {
    id: `KL-${region}-${faker.string.alphanumeric({ length: 8, casing: 'upper' })}`,
    dateTime: orderDate.toISOString(),
    region,
    productSku: product.sku,
    productName: product.name,
    productCategory: category,
    quantity,
    orderTotal,
    currency: config.currency,
    customerName: faker.person.fullName(),
    customerEmail: faker.internet.email(),
    deliveryAddress: faker.location.streetAddress({ useFullAddress: true }),
    city: faker.helpers.arrayElement(config.cities),
    country: faker.helpers.arrayElement(config.countries),
    status,
    paymentMethod: faker.helpers.arrayElement(Object.values(PaymentMethod)),
    deliveryOption: faker.helpers.arrayElement(Object.values(DeliveryOption)),
    deliveryEta: deliveryEta.toISOString().split('T')[0],
    lastStatusUpdate: lastUpdate.toISOString(),
    productConfiguration: generateProductConfiguration(category),
    warrantyStatus: faker.helpers.arrayElement(['Active', 'Expired', 'Pending']),
    customerServiceContact: faker.phone.number(),
    feedbackReceived: faker.datatype.boolean(),
    notes: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.3 }) || ''
  };
};

export const generateMockOrders = () => {
  const orders = [];
  
  // Generate 25 orders per region for better distribution
  Object.values(Region).forEach(region => {
    for (let i = 0; i < 25; i++) {
      orders.push(generateOrder(region));
    }
  });

  return orders.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
};

export const mockOrders = generateMockOrders();