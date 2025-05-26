import type { OrderSummaryProps } from 'types/Order'
import * as XLSX from 'xlsx'

export const prepareExcelData = (customerData: OrderSummaryProps) => {
  const wscols = [
    { wch: 20 }, // Column A width
    { wch: 50 }, // Column B width
  ]

  // Customer information section
  const customerInfoData = [
    [
      {
        v: 'ORDER SUMMARY',
        s: {
          font: { bold: true, sz: 16 },
          fill: { fgColor: { rgb: 'E2F0D9' } },
        },
      },
    ],
    [
      { v: 'Order Date', s: { font: { bold: true } } },
      new Date().toLocaleDateString(),
    ],
    [
      {
        v: 'CUSTOMER INFORMATION',
        s: { font: { bold: true }, fill: { fgColor: { rgb: 'F2F2F2' } } },
      },
    ],
    ['First Name', customerData.firstName ?? 'N/A'],
    ['Last Name', customerData.lastName ?? 'N/A'],
    ['Email', customerData.email ?? 'N/A'],
    ['Phone', customerData.phone ?? 'N/A'],
    [
      {
        v: 'BILLING ADDRESS',
        s: { font: { bold: true }, fill: { fgColor: { rgb: 'F2F2F2' } } },
      },
    ],
    ['Address', customerData.address ?? 'N/A'],
    ['City', customerData.city ?? 'N/A'],
    ['State', customerData.state ?? 'N/A'],
    ['Zip Code', customerData.zipCode ?? 'N/A'],
    [
      {
        v: 'ORDER DETAILS',
        s: { font: { bold: true }, fill: { fgColor: { rgb: 'F2F2F2' } } },
      },
    ],
    ['Shipping Method', customerData.shippingMethod ?? 'N/A'],
    ['Payment Method', customerData.paymentMethod ?? 'N/A'],
  ]

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.aoa_to_sheet(customerInfoData)

  // Set column widths
  ws['!cols'] = wscols

  // Add order summary section
  const startRow = customerInfoData.length + 2

  XLSX.utils.sheet_add_aoa(
    ws,
    [
      [
        {
          v: 'ORDER SUMMARY',
          s: { font: { bold: true }, fill: { fgColor: { rgb: 'F2F2F2' } } },
        },
      ],
      ['Subtotal', `$${customerData.subtotal?.toFixed(2) ?? '0.00'}`],
      ['Tax', `$${customerData.tax?.toFixed(2) ?? '0.00'}`],
      ['Shipping', `$${customerData.shipping?.toFixed(2) ?? '0.00'}`],
      [
        { v: 'Total', s: { font: { bold: true } } },
        {
          v: `$${customerData.total?.toFixed(2) ?? '0.00'}`,
          s: { font: { bold: true, color: { rgb: '23A26D' } } },
        },
      ],
    ],
    { origin: { r: startRow, c: 0 } }
  )

  // Add items section on a separate sheet
  if (customerData.items && customerData.items.length > 0) {
    const itemsData = [
      [
        {
          v: 'ORDERED ITEMS',
          s: {
            font: { bold: true, sz: 14 },
            fill: { fgColor: { rgb: 'E2F0D9' } },
          },
        },
      ],
      [
        { v: 'Item', s: { font: { bold: true } } },
        { v: 'Quantity', s: { font: { bold: true } } },
        { v: 'Unit Price', s: { font: { bold: true } } },
        { v: 'Total', s: { font: { bold: true } } },
      ],
    ]

    // Add each item as a row
    customerData.items.forEach((item) => {
      itemsData.push([
        { v: item.name, s: { font: { bold: false } } },
        { v: String(item.quantity), s: { font: { bold: false } } },
        { v: `$${item.price.toFixed(2)}`, s: { font: { bold: false } } },
        {
          v: `$${(item.quantity * item.price).toFixed(2)}`,
          s: { font: { bold: false } },
        },
      ])
    })

    const itemsWs = XLSX.utils.aoa_to_sheet(itemsData)
    itemsWs['!cols'] = [
      { wch: 30 }, // Item name
      { wch: 10 }, // Quantity
      { wch: 12 }, // Unit price
      { wch: 12 }, // Total
    ]

    // Add sheets to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Order Details')
    XLSX.utils.book_append_sheet(wb, itemsWs, 'Order Items')
  } else {
    XLSX.utils.book_append_sheet(wb, ws, 'Order Details')
  }

  return { wb }
}
