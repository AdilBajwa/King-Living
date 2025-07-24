# King Living Employee Orders Dashboard

A comprehensive ReactJS-based Proof of Concept (POC) for King Living's Employee Orders Dashboard, designed for global operations management across APAC, UK, and US regions.

## Master Prompt

Build a complete ReactJS-based Proof of Concept (POC) for a King Living Employee Orders Dashboard. Follow these additional guidelines and context based on real-world King Living operations to improve realism and code quality.

### 1. Business Context & Application Overview
King Living is a global premium Australian furniture retailer, specializing in customizable and modular products, with APAC, UK, and US commerce operations. Their digital platform supports direct customer orders, detailed logistics, tailored experiences, and prompt after-sales support.

The official application provides robust order management, live delivery tracking, and integrates rich customer and product data. It supports real-time status updates, issue resolution tracking, summary dashboards, and uses industry best practices for maintainability and scalability.

### 2. Detailed Dashboard Features
- **Unified Order Table**: Show all orders from APAC, UK, and US mock "instances" in one searchable, filterable table
- **Order fields**: Order ID, Date/Time (ISO format), Region, Product SKU, Product Name, Product Category, Quantity, Order Total, Customer Name, Customer Email, Delivery Address, Status, Payment Method, Delivery Option, Delivery ETA, Last Status Update
- **Order Details Modal**: Product configuration, modular options selected, warranty status, customer service contact info
- **Summary Metrics**: Total orders per region, total revenue per region, material costs, % delivered on time, count of orders by status, rolling 7-day/30-day trends, next month's predicted output data
- **Order Status Pipeline**: Horizontal stepper indicating order stage (Production → Dispatched → Out for Delivery → Delivered)
- **Live Delivery Indicator**: For orders marked "Out for Delivery," simulate real-time progress
- **Customer Feedback Section**: Indicate if customer review/feedback has been received post-delivery

### 3. Data & Mock Services
- Uses faker-js to realistically simulate all fields
- Populated with 75 orders (25 per region) with distribution across multiple statuses
- Simulates plausible names, addresses, order totals, product SKUs/categories, and configuration settings
- Structured data with clear separation between Mock Data Layer and Domain Models

### 4. Clean Architecture & Design
- **Project Structure**: Smart folder organization with components/, services/, models/, utils/, data/
- **Design Patterns**: Container vs. Presentational Components, custom hooks for data-fetching
- **State Management**: React Redux Toolkit for centralized state management
- **Styling**: Material-UI with custom theme, responsive design, office-display-friendly layout

### 5. User Stories & Flow
- Staff members can view all region orders with toggle filters for region/status/date
- Click a row for full details in a modal including product configuration, delivery info, latest customer comment
- View key metrics on top for executive summary
- Simulate order status updates with color-coded badges and stepper for order progress

### 6. Extras Reflecting Official App Quality
- Export CSV and Print dashboard actions
- Simulated notification system for new or at-risk orders
- Rebook Delivery and Resolve Issue actions (placeholder)
- Accessibility best practices with proper semantic HTML and keyboard navigation


2. Move the Regional filters on top to get all the data relevant to that specific region too.
Move recent Enquiries on bottom and add popup to view relevant details for specific enquiry

and for Revenue by Region chart use a different chart to show 3 different lines pr each region on contrast to the date
Orders by Region chart should have different colors and those colors should be used every where for that region
create a side bar too , where the menu will be dashboard and some dummy empty other menus

3. Add option for This year and last year in date range filter
make this month as default and
on changing the date filter and all regions filter, the values like total orders total revenue etc should change to that of specific date range and and show for next month prediction text according to the date period selected like if it's in months the next month if it's in years then next year and if weeks then next week
and create a container where these filters are being applied and separate the UI for Regional performance in a way that it shows the filters are not applied on top of that container
The UI on big screen is not responsive it should fill the screen for bigger display to show the data in more detailed view instead of leaving extra white spaces around the container
revenue Chart is still showing blank

4. make the regional chart use 100% of the page width and make the charts bit wider and bars wider too




## Technical Architecture

### Folder Structure
```
src/
├── components/
│   ├── dashboard/
│   │   ├── Dashboard.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── OrderTable.jsx
│   │   ├── OrderFilters.jsx
│   │   ├── OrderDetailsModal.jsx
│   │   └── ExportActions.jsx
│   └── layout/
│       └── DashboardLayout.jsx
├── data/
│   └── mockDataGenerator.js
├── hooks/
│   └── useOrderData.js
├── models/
│   └── Order.js
├── services/
│   └── orderService.js
├── store/
│   ├── store.js
│   └── slices/
│       └── orderSlice.js
├── util/
│   └── constants.js
├── App.jsx
└── main.jsx
```

### Key Technologies
- **React 18** - Modern React with hooks and functional components
- **Redux Toolkit** - State management with modern Redux patterns
- **Material-UI** - Professional UI component library
- **Faker.js** - Realistic mock data generation
- **Date-fns** - Date formatting and manipulation
- **React-CSV** - CSV export functionality

### Design Patterns Used
1. **Container/Presentational Pattern** - Separation of data logic and UI components
2. **Custom Hooks** - `useOrderData` for centralized data management
3. **Redux Toolkit** - Modern Redux with slices and async thunks
4. **Composition Pattern** - Modular, reusable components
5. **Service Layer** - Abstracted data operations in `orderService`

### State Management
- **Redux Store** - Centralized application state
- **Order Slice** - Orders, filters, selected order, loading states
- **Async Thunks** - Asynchronous data fetching operations
- **Selectors** - Efficient state selection and filtering

## Setup and Installation

### Prerequisites
- Node.js (v20 or higher)
- npm or yarn

### Installation Steps
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser to `http://localhost:5173`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features Implemented

### Dashboard Components
- **Summary Cards** - Key metrics with gradient backgrounds and icons
- **Regional Performance** - Breakdown by APAC, UK, US regions
- **Order Table** - Sortable, filterable table with pagination
- **Order Filters** - Region, status, and date range filtering
- **Order Details Modal** - Comprehensive order information with stepper
- **Export Actions** - CSV export, print functionality, notifications

### Data Features
- **75 Mock Orders** - Realistic data across all regions
- **Product Catalog** - King Living product categories and SKUs
- **Order Status Pipeline** - Visual progress tracking
- **At-Risk Order Detection** - Overdue delivery identification
- **Predictive Analytics** - Next month's predicted output

### UI/UX Features
- **Responsive Design** - Works on desktop and tablet
- **Professional Styling** - Material-UI with custom theme
- **Accessibility** - Semantic HTML, keyboard navigation
- **Visual Feedback** - Loading states, error handling
- **Office Display Ready** - Large, clear metrics for monitors

## Major Assumptions

1. **No Authentication Required** - Dashboard is for internal use only
2. **Mock Data Only** - No real customer data or external API calls
3. **Simulated Real-time Updates** - Status changes are simulated
4. **Internal Display Purpose** - Designed for King Living office use
5. **High-level Company Processes** - Assumes best-in-class logistics operations

## AI Enhancement Reflection

The AI-assisted development process significantly enhanced the workflow by:

### Positive Impacts
- **Rapid Prototyping** - Quick generation of comprehensive component structure
- **Consistent Patterns** - Maintained architectural consistency across components
- **Realistic Data Generation** - Created believable mock data with proper relationships
- **Best Practices** - Implemented modern React patterns and Redux Toolkit
- **Professional UI** - Generated polished Material-UI components with proper styling

### Challenges Addressed
- **Complex State Management** - AI helped structure Redux store with proper async handling
- **Component Composition** - Balanced component granularity and reusability
- **Data Relationships** - Ensured mock data integrity across different entities
- **Responsive Design** - Created layouts that work across different screen sizes

### Workflow Enhancement
- **Iterative Development** - AI enabled rapid iteration on component design
- **Documentation** - Generated comprehensive documentation and comments
- **Error Handling** - Implemented proper loading states and error boundaries
- **Accessibility** - Ensured semantic HTML and keyboard navigation support

The AI assistance was particularly valuable in maintaining consistency across the large codebase while implementing industry best practices for React development, Redux state management, and Material-UI styling.

## Future Enhancements

- Real-time WebSocket integration for live updates
- Advanced analytics and reporting features
- Mobile-responsive design improvements
- Integration with actual King Living APIs
- Enhanced accessibility features
- Performance optimizations for large datasets