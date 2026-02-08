import { useState } from 'react'
import { FiDownload, FiPrinter, FiMail, FiCopy, FiCalendar, FiFileText } from 'react-icons/fi'

const Invoice = () => {
  const [invoice] = useState({
    id: 'INV-2024-001',
    date: '2024-03-15',
    dueDate: '2024-04-15',
    status: 'Paid',
    from: {
      name: 'QuantumDash Inc.',
      address: '123 Tech Street, Suite 500',
      city: 'San Francisco, CA 94107',
      email: 'billing@quantumdash.com',
      phone: '+1 (555) 123-4567'
    },
    to: {
      name: 'John Smith',
      company: 'Innovate Corp',
      address: '456 Business Ave',
      city: 'New York, NY 10001',
      email: 'john@innovatecorp.com'
    },
    items: [
      { id: 1, description: 'QuantumDash Pro License - Annual', quantity: 1, price: 2999.00 },
      { id: 2, description: 'Premium Support Package', quantity: 1, price: 499.00 },
      { id: 3, description: 'Custom Integration Services', quantity: 10, price: 150.00 }
    ]
  })

  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real app, this would generate a PDF
    alert('Invoice download started')
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">Invoice</h1>
        <p className="text-gray-400">View and manage your invoices</p>
      </div>

      {/* Invoice Actions */}
      <div className="glass-card p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400">Invoice #</div>
              <div className="font-bold">{invoice.id}</div>
            </div>
            <div className="px-4 py-2 bg-white/5 rounded-lg">
              <div className="text-sm text-gray-400">Status</div>
              <div className={`font-bold ${
                invoice.status === 'Paid' ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {invoice.status}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handlePrint}
              className="btn-secondary flex items-center"
            >
              <FiPrinter className="mr-2" />
              Print
            </button>
            <button 
              onClick={handleDownload}
              className="btn-secondary flex items-center"
            >
              <FiDownload className="mr-2" />
              Download PDF
            </button>
            <button className="btn-primary flex items-center">
              <FiMail className="mr-2" />
              Send Invoice
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="glass-card p-6 print:p-8 print:bg-white print:text-black">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                Q
              </div>
              <div>
                <h2 className="text-2xl font-bold">QuantumDash</h2>
                <div className="text-gray-400">Professional Dashboard System</div>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="font-semibold">{invoice.from.name}</div>
              <div className="text-gray-400">{invoice.from.address}</div>
              <div className="text-gray-400">{invoice.from.city}</div>
              <div className="text-gray-400">{invoice.from.email}</div>
              <div className="text-gray-400">{invoice.from.phone}</div>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 text-right">
            <h1 className="text-3xl font-bold mb-2">INVOICE</h1>
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-gray-400">Invoice #:</span>
                <span className="font-semibold">{invoice.id}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-400">Date:</span>
                <span>{invoice.date}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-400">Due Date:</span>
                <span>{invoice.dueDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bill To */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-3">Bill To:</h3>
            <div className="space-y-1">
              <div className="font-semibold">{invoice.to.name}</div>
              <div>{invoice.to.company}</div>
              <div>{invoice.to.address}</div>
              <div>{invoice.to.city}</div>
              <div>{invoice.to.email}</div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-3">Payment Details:</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Status:</span>
                <span className={`font-semibold ${
                  invoice.status === 'Paid' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {invoice.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Payment Method:</span>
                <span>Credit Card (Visa •••• 4242)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Paid Date:</span>
                <span>2024-03-16</span>
              </div>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 font-semibold">Description</th>
                <th className="text-left py-3 font-semibold">Quantity</th>
                <th className="text-left py-3 font-semibold">Unit Price</th>
                <th className="text-left py-3 font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-4">{item.description}</td>
                  <td className="py-4">{item.quantity}</td>
                  <td className="py-4">${item.price.toFixed(2)}</td>
                  <td className="py-4 font-semibold">
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-full md:w-1/3 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tax (8%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-3 border-t border-white/10">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <h3 className="text-lg font-bold mb-3">Notes</h3>
          <p className="text-gray-400">
            Thank you for your business. Please make payment within 30 days of the invoice date.
            For any questions regarding this invoice, contact our billing department at billing@quantumdash.com.
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .glass-card,
          .glass-card * {
            visibility: visible;
          }
          .glass-card {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none;
            background: white !important;
            color: black !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Invoice
