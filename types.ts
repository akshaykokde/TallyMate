export enum VoucherType {
  SALES = 'Sales',
  PURCHASE = 'Purchase',
  RECEIPT = 'Receipt',
  PAYMENT = 'Payment',
  JOURNAL = 'Journal'
}

export interface Ledger {
  id: string;
  name: string;
  group: string; // e.g., Sundry Debtors, Sundry Creditors
  balance: number;
  type: 'Dr' | 'Cr';
  contact: string;
  email: string;
}

export interface Voucher {
  id: string;
  date: string; // YYYY-MM-DD
  type: VoucherType;
  partyName: string;
  amount: number;
  referenceNo: string;
  status: 'Pending' | 'Overdue' | 'Paid';
}

export interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  rate: number;
  value: number;
  warehouse: string;
}

export interface Company {
  id: string;
  name: string;
  lastSync: string;
  gstIn: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface EWayBill {
  id: string;
  invoiceNo: string;
  date: string;
  partyName: string;
  gstin: string;
  amount: number;
  status: 'Active' | 'Cancelled';
  validUntil: string;
  distance: number;
  vehicleNo: string;
}