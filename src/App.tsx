import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/common/CartDrawer';
import { SearchModal } from './components/common/SearchModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { Chatbot } from './components/common/Chatbot';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { InvoicePage } from './pages/InvoicePage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { RoutineQuizPage } from './pages/RoutineQuizPage';
import { FlashDealsPage } from './pages/FlashDealsPage';
import { BundlesPage } from './pages/BundlesPage';
import { PreOrdersPage } from './pages/PreOrdersPage';
import { CustomerStoriesPage } from './pages/CustomerStoriesPage';
import { GiftCardsPage } from './pages/GiftCardsPage';
import { JournalPage } from './pages/JournalPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PolicyPage } from './pages/PolicyPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboard } from './pages/AdminDashboard';

const AppContent: React.FC = () => {
  const { currentRoute, toastMessage } = useStore();

  const renderRoute = () => {
    switch (currentRoute) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-success':
        return <OrderSuccessPage />;
      case 'invoice':
        return <InvoicePage />;
      case 'track-order':
        return <TrackOrderPage />;
      case 'routine-quiz':
        return <RoutineQuizPage />;
      case 'deals':
        return <FlashDealsPage />;
      case 'bundles':
        return <BundlesPage />;
      case 'pre-orders':
        return <PreOrdersPage />;
      case 'customer-stories':
        return <CustomerStoriesPage />;
      case 'gift-cards':
        return <GiftCardsPage />;
      case 'journal':
      case 'journal-detail':
        return <JournalPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'policy':
        return <PolicyPage />;
      case 'account':
        return <AccountPage />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFAF7] text-[#514950]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-[#211D20] text-white px-4 py-2.5 rounded-2xl shadow-xl border border-[#B74764] text-xs font-semibold animate-fadeIn flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B74764]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Header */}
      <Header />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Floating Modals and Drawers */}
      <CartDrawer />
      <SearchModal />
      <QuickViewModal />
      <Chatbot />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
