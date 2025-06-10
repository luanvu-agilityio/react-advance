import type { OrderSummaryProps } from 'types/Order'

export const getOrderPrintTemplate = (
  customerData: OrderSummaryProps
): string => {
  return `
    <html>
      <head>
        <title>Order Summary</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
            margin: 40px;
          }
          h1 {
            font-size: 24px;
            text-align: center;
            margin-bottom: 20px;
            color: #23A26D;
          }
          h2 {
            font-size: 18px;
            margin-top: 30px;
            margin-bottom: 10px;
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
          }
          th {
            text-align: left;
            padding: 8px;
            background-color: #f5f5f5;
          }
          td {
            padding: 8px;
            border-bottom: 1px solid #eaeaea;
          }
          .summary-row {
            font-weight: bold;
          }
          .total-row {
            font-weight: bold;
            border-top: 2px solid #444;
            color: #23A26D;
            font-size: 18px;
          }
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px;
          }
          @media print {
            body {
              margin: 20px;
            }
          }
        </style>
      </head>
      <body>
        <h1>Order Summary</h1>
        
        <div class="info-grid">
          <div>
            <h2>Customer Information</h2>
            <p>Name: ${customerData.firstName ?? ''} ${customerData.lastName ?? ''}</p>
            <p>Email: ${customerData.email ?? ''}</p>
            <p>Phone: ${customerData.phone ?? ''}</p>
          </div>
          
          <div>
            <h2>Billing Address</h2>
            <p>${customerData.address ?? ''}</p>
            <p>${customerData.city ?? ''}, ${customerData.country ?? ''} ${customerData.zip ?? ''}</p>
          </div>
        </div>
        
        <h2>Order Details</h2>
        <p>Payment Method: ${customerData.paymentMethod ?? ''}</p>
        <p>Shipping Method: ${customerData.shippingMethod ?? ''}</p>
        <p>Order Date: ${new Date().toLocaleDateString()}</p>
        
        <h2>Items</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${(customerData.items ?? [])
              .map(
                (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.price.toFixed(2)}</td>
                  <td>$${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              `
              )
              .join('')}
          </tbody>
        </table>
        
        <h2>Order Summary</h2>
        <table>
          <tr>
            <td>Subtotal</td>
            <td>$${customerData.subtotal?.toFixed(2) ?? '0.00'}</td>
          </tr>
          <tr>
            <td>Tax</td>
            <td>$${customerData.tax?.toFixed(2) ?? '0.00'}</td>
          </tr>
          <tr>
            <td>Shipping</td>
            <td>$${customerData.shipping?.toFixed(2) ?? '0.00'}</td>
          </tr>
          <tr class="total-row">
            <td>Total</td>
            <td>$${customerData.total?.toFixed(2) ?? '0.00'}</td>
          </tr>
        </table>
        
        <div style="margin-top: 40px; text-align: center;">
          <p>Thank you for your order!</p>
          <p style="color: #777; font-size: 14px;">
            If you have any questions, please contact customer support.
          </p>
        </div>
      </body>
    </html>
  `
}
