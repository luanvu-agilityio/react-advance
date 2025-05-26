import { prepareExcelData } from '@utils/excelExport'
import { getOrderPrintTemplate } from '@utils/orderTemplate'
import { generateTextContent } from '@utils/textExport'
import type { OrderExportConfig } from 'types/Order'
import * as XLSX from 'xlsx'

export const useOrderExport = ({
  orderDetailsRef,
  customerData,
}: OrderExportConfig) => {
  const handlePrint = () => {
    if (orderDetailsRef.current) {
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
