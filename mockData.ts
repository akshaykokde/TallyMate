import { Company, Ledger, StockItem, Voucher, VoucherType, EWayBill } from '../types';

export const mockCompany: Company = {
  id: '1',
  name: 'Global Traders Pvt Ltd',
  lastSync: new Date().toISOString(),
  gstIn: '29ABCDE1234F1Z5'
};

export const mockLedgers: Ledger[] = [
  { id: 'l1', name: 'Alpha Corp', group: 'Sundry Debtors', balance: 45000, type: 'Dr', contact: '+919876543210', email: 'accounts@alpha.com' },
  { id: 'l2', name: 'Beta Solutions', group: 'Sundry Debtors', balance: 12000, type: 'Dr', contact: '+919876543211', email: 'billing@beta.com' },
  { id: 'l3', name: 'Gamma Supplies', group: 'Sundry Creditors', balance: 8000, type: 'Cr', contact: '+919876543212', email: 'sales@gamma.com' },
  { id: 'l4', name: 'Delta Logistics', group: 'Sundry Creditors', balance: 25000, type: 'Cr', contact: '+919876543213', email: 'info@delta.com' },
];

export const mockVouchers: Voucher[] = [
  { id: 'v1', date: '2023-10-25', type: VoucherType.SALES, partyName: 'Alpha Corp', amount: 25000, referenceNo: 'INV-001', status: 'Overdue' },
  { id: 'v2', date: '2023-10-26', type: VoucherType.SALES, partyName: 'Beta Solutions', amount: 12000, referenceNo: 'INV-002', status: 'Pending' },
  { id: 'v3', date: '2023-10-27', type: VoucherType.PURCHASE, partyName: 'Gamma Supplies', amount: 8000, referenceNo: 'PUR-101', status: 'Pending' },
  { id: 'v4', date: '2023-10-24', type: VoucherType.RECEIPT, partyName: 'Alpha Corp', amount: 5000, referenceNo: 'REC-501', status: 'Paid' },
  { id: 'v5', date: '2023-10-28', type: VoucherType.PAYMENT, partyName: 'Electricity Board', amount: 1500, referenceNo: 'PAY-202', status: 'Paid' },
  { id: 'v6', date: '2023-10-28', type: VoucherType.SALES, partyName: 'Alpha Corp', amount: 20000, referenceNo: 'INV-003', status: 'Pending' },
];

export const mockStock: StockItem[] = [
  { id: 's1', name: 'Dell XPS 13', category: 'Electronics', quantity: 5, unit: 'Nos', rate: 120000, value: 600000, warehouse: 'Main Store' },
  { id: 's2', name: 'Logitech Mouse', category: 'Accessories', quantity: 50, unit: 'Nos', rate: 800, value: 40000, warehouse: 'Main Store' },
  { id: 's3', name: 'HP Monitor 24"', category: 'Electronics', quantity: -2, unit: 'Nos', rate: 15000, value: -30000, warehouse: 'Showroom' }, // Negative stock
  { id: 's4', name: 'HDMI Cable', category: 'Accessories', quantity: 100, unit: 'Nos', rate: 250, value: 25000, warehouse: 'Main Store' },
];

export const mockEWayBills: EWayBill[] = [
  { id: 'ew1', invoiceNo: 'INV-001', date: '2023-10-25', partyName: 'Alpha Corp', gstin: '29AAACA1234A1Z5', amount: 25000, status: 'Active', validUntil: '2023-10-30', distance: 450, vehicleNo: 'KA-01-AB-1234' },
  { id: 'ew2', invoiceNo: 'INV-003', date: '2023-10-28', partyName: 'Alpha Corp', gstin: '29AAACA1234A1Z5', amount: 20000, status: 'Active', validUntil: '2023-11-02', distance: 120, vehicleNo: 'KA-52-C-9999' },
];

export const getFinancialSummary = () => {
  return {
    cashBank: 145000,
    salesTotal: mockVouchers.filter(v => v.type === VoucherType.SALES).reduce((acc, curr) => acc + curr.amount, 0),
    purchaseTotal: mockVouchers.filter(v => v.type === VoucherType.PURCHASE).reduce((acc, curr) => acc + curr.amount, 0),
    receivables: mockLedgers.filter(l => l.group === 'Sundry Debtors').reduce((acc, curr) => acc + curr.balance, 0),
    payables: mockLedgers.filter(l => l.group === 'Sundry Creditors').reduce((acc, curr) => acc + curr.balance, 0),
  };
};