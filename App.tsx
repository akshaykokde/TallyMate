import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import { OutstandingReport, StockReport, VoucherReport } from './components/Reports';
import DataEntry from './components/DataEntry';
import EInvoice from './components/EInvoice';
import BillScanner from './components/BillScanner';
import { HashRouter } from 'react-router-dom';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={setActiveTab} />;
      case 'data-entry':
        return <DataEntry />;
      case 'einvoice':
        return <EInvoice />;
      case 'outstanding':
        return <OutstandingReport />;
      case 'stock':
        return <StockReport />;
      case 'reports':
        return <VoucherReport />;
      case 'bills':
        return <BillScanner />;
      default:
        return <Dashboard onNavigate={setActiveTab} />;
    }
  };

  return (
    <HashRouter>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <div className="fade-in">
          {renderContent()}
        </div>
      </Layout>
    </HashRouter>
  );
};

export default App;