import { prepareExcelData } from '@utils/excelExport'
import { getOrderPrintTemplate } from '@utils/orderTemplate'
import { generateTextContent } from '@utils/textExport'
import type { OrderExportConfig } from 'types/Order'
import * as XLSX from 'xlsx'

/**
 * useOrderExport - A custom hook for exporting order data in multiple formats
 *
 * This hook provides utility functions to export customer order data in different formats:
 * - Print: Opens a printer window with formatted order details
 * - Excel: Downloads order data as an Excel
 * - Text: Downloads order data as a plain text
 *
 * @param {OrderExportConfig} config - Config object for the export
 * @param {CustomerData} config.customerData - Customer and order information to be exported
 *
 * @returns {Object} Export utility functions
 * @returns {Function} handlePrint - Opens a print dialog
 * @returns {Function} handleDownloadExcel - Downloads order data as an Excel spreadsheet
 * @returns {Function} handleDownloadText - Downloads order data as a text file
 */
export const useOrderExport = ({ customerData }: OrderExportConfig) => {
  const handlePrint = () => {
    const win = window.open('', '', 'height=700,width=700')

    if (win) {
      // Get the HTML content from template
      const htmlContent = getOrderPrintTemplate(customerData)

      win.document.documentElement.innerHTML = htmlContent
      win.focus()
      win.print()

      win.close()
    }
  }

  const handleDownloadExcel = () => {
    // Format date for the filename
    const dateStr = new Date().toISOString().split('T')[0]
    const filename = `order-details-${dateStr}.xlsx`

    const { wb } = prepareExcelData(customerData)
    XLSX.writeFile(wb, filename)
  }

  const handleDownloadText = () => {
    // Format date for the filename
    const dateStr = new Date().toISOString().split('T')[0]
    const filename = `order-details-${dateStr}.txt`

    // Create the text content
    const textContent = generateTextContent(customerData)

    // Create and trigger download
    const element = document.createElement('a')
    const file = new Blob([textContent], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = filename
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return { handlePrint, handleDownloadExcel, handleDownloadText }
}
