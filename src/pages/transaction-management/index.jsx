import React, { useState, useEffect } from 'react';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import { useNotifications } from '../../components/ui/NotificationBadge';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TransactionCard from './components/TransactionCard';
import TransactionFilters from './components/TransactionFilters';
import DisputeModal from './components/DisputeModal';
import TransactionStats from './components/TransactionStats';
import TransactionTabs from './components/TransactionTabs';

const TransactionManagement = () => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState('all');
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDisputeModalOpen, setIsDisputeModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    type: 'all',
    amountRange: 'all',
    dateRange: { start: '', end: '' },
    showDisputed: false,
    highRiskOnly: false
  });

  // Mock transaction data
  const mockTransactions = [
    {
      id: 'SW-2024-001',
      product: {
        name: 'iPhone 12 Pro - 128GB',
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400'
      },
      amount: 650.00,
      fee: 19.50,
      status: 'delivered',
      userRole: 'buyer',
      otherParty: {
        name: 'Sarah Johnson',
        avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
        rating: 4.8,
        reviewCount: 127
      },
      escrowStatus: 'secured',
      aiScamRisk: 'low',
      paymentMethod: 'Credit Card',
      trackingNumber: 'TRK123456789',
      createdAt: new Date('2024-01-15T10:30:00'),
      hasMessages: true,
      notes: 'Item in excellent condition as described',
      timeline: [
        { status: 'pending', completed: true, current: false },
        { status: 'processing', completed: true, current: false },
        { status: 'shipped', completed: true, current: false },
        { status: 'delivered', completed: true, current: true }
      ]
    },
    {
      id: 'SW-2024-002',
      product: {
        name: 'MacBook Air M2',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400'
      },
      amount: 1200.00,
      fee: 36.00,
      status: 'shipped',
      userRole: 'seller',
      otherParty: {
        name: 'Michael Chen',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        rating: 4.9,
        reviewCount: 89
      },
      escrowStatus: 'secured',
      aiScamRisk: 'low',
      paymentMethod: 'Bank Transfer',
      trackingNumber: 'TRK987654321',
      createdAt: new Date('2024-01-14T14:20:00'),
      hasMessages: false,
      timeline: [
        { status: 'pending', completed: true, current: false },
        { status: 'processing', completed: true, current: false },
        { status: 'shipped', completed: false, current: true },
        { status: 'delivered', completed: false, current: false }
      ]
    },
    {
      id: 'SW-2024-003',
      product: {
        name: 'Sony WH-1000XM4 Headphones',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400'
      },
      amount: 280.00,
      fee: 8.40,
      status: 'disputed',
      userRole: 'buyer',
      otherParty: {
        name: 'Alex Rodriguez',
        avatar: 'https://randomuser.me/api/portraits/men/28.jpg',
        rating: 3.2,
        reviewCount: 23
      },
      escrowStatus: 'held',
      aiScamRisk: 'medium',
      paymentMethod: 'PayPal',
      createdAt: new Date('2024-01-12T09:15:00'),
      hasMessages: true,
      notes: 'Dispute opened due to item condition mismatch',
      timeline: [
        { status: 'pending', completed: true, current: false },
        { status: 'processing', completed: true, current: false },
        { status: 'shipped', completed: true, current: false },
        { status: 'disputed', completed: false, current: true }
      ]
    },
    {
      id: 'SW-2024-004',
      product: {
        name: 'Nintendo Switch OLED',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400'
      },
      amount: 320.00,
      fee: 9.60,
      status: 'pending',
      userRole: 'seller',
      otherParty: {
        name: 'Emma Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        rating: 4.6,
        reviewCount: 156
      },
      escrowStatus: 'processing',
      aiScamRisk: 'low',
      paymentMethod: 'Credit Card',
      createdAt: new Date('2024-01-16T16:45:00'),
      hasMessages: false,
      timeline: [
        { status: 'pending', completed: false, current: true },
        { status: 'processing', completed: false, current: false },
        { status: 'shipped', completed: false, current: false },
        { status: 'delivered', completed: false, current: false }
      ]
    },
    {
      id: 'SW-2024-005',
      product: {
        name: 'iPad Pro 11" 2022',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400'
      },
      amount: 850.00,
      fee: 25.50,
      status: 'completed',
      userRole: 'buyer',
      otherParty: {
        name: 'David Kim',
        avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
        rating: 4.9,
        reviewCount: 203
      },
      escrowStatus: 'released',
      aiScamRisk: 'low',
      paymentMethod: 'Apple Pay',
      createdAt: new Date('2024-01-10T11:30:00'),
      hasMessages: true,
      timeline: [
        { status: 'pending', completed: true, current: false },
        { status: 'processing', completed: true, current: false },
        { status: 'shipped', completed: true, current: false },
        { status: 'completed', completed: true, current: true }
      ]
    }
  ];

  const mockStats = {
    total: 47,
    totalChange: 12,
    active: 8,
    activeChange: -5,
    completed: 35,
    completedChange: 18,
    totalValue: 15420,
    valueChange: 23
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [transactions, filters, activeTab]);

  const loadTransactions = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTransactions(mockTransactions);
    } catch (error) {
      console.error('Failed to load transactions:', error);
      addNotification({
        type: 'system',
        title: 'Error Loading Transactions',
        message: 'Failed to load transaction data. Please try again.',
        priority: 'high'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...transactions];

    // Filter by tab
    if (activeTab !== 'all') {
      if (activeTab === 'active') {
        filtered = filtered?.filter(t => ['pending', 'processing', 'shipped']?.includes(t?.status));
      } else {
        filtered = filtered?.filter(t => t?.status === activeTab);
      }
    }

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(t =>
        t?.id?.toLowerCase()?.includes(searchTerm) ||
        t?.product?.name?.toLowerCase()?.includes(searchTerm) ||
        t?.otherParty?.name?.toLowerCase()?.includes(searchTerm)
      );
    }

    // Apply status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(t => t?.status === filters?.status);
    }

    // Apply type filter
    if (filters?.type !== 'all') {
      filtered = filtered?.filter(t => t?.userRole === (filters?.type === 'buying' ? 'buyer' : 'seller'));
    }

    // Apply amount range filter
    if (filters?.amountRange !== 'all') {
      const [min, max] = filters?.amountRange?.split('-')?.map(v => v === '' ? Infinity : parseFloat(v?.replace('+', '')));
      filtered = filtered?.filter(t => {
        if (max === Infinity) return t?.amount >= min;
        return t?.amount >= min && t?.amount <= max;
      });
    }

    // Apply date range filter
    if (filters?.dateRange?.start) {
      const startDate = new Date(filters.dateRange.start);
      filtered = filtered?.filter(t => new Date(t.createdAt) >= startDate);
    }
    if (filters?.dateRange?.end) {
      const endDate = new Date(filters.dateRange.end);
      endDate?.setHours(23, 59, 59, 999);
      filtered = filtered?.filter(t => new Date(t.createdAt) <= endDate);
    }

    // Apply advanced filters
    if (filters?.highRiskOnly) {
      filtered = filtered?.filter(t => t?.aiScamRisk === 'high');
    }

    if (!filters?.showDisputed) {
      // This filter is inverted - when unchecked, show disputed
      // When checked, don't filter out disputed
    }

    setFilteredTransactions(filtered);
  };

  const getTabCounts = () => {
    return {
      all: transactions?.length,
      active: transactions?.filter(t => ['pending', 'processing', 'shipped']?.includes(t?.status))?.length,
      completed: transactions?.filter(t => t?.status === 'completed')?.length,
      disputed: transactions?.filter(t => t?.status === 'disputed')?.length,
      cancelled: transactions?.filter(t => t?.status === 'cancelled')?.length
    };
  };

  const handleTransactionAction = async (transactionId, action) => {
    try {
      switch (action) {
        case 'confirm':
          addNotification({
            type: 'transaction',
            title: 'Order Confirmed',
            message: `Order ${transactionId} has been confirmed and is being processed.`,
            priority: 'normal'
          });
          break;
        case 'ship':
          addNotification({
            type: 'transaction',
            title: 'Order Shipped',
            message: `Order ${transactionId} has been marked as shipped.`,
            priority: 'normal'
          });
          break;
        case 'confirm_receipt':
          addNotification({
            type: 'escrow',
            title: 'Payment Released',
            message: `Funds for order ${transactionId} have been released to the seller.`,
            priority: 'high'
          });
          break;
        case 'dispute':
          setSelectedTransaction(transactions?.find(t => t?.id === transactionId));
          setIsDisputeModalOpen(true);
          break;
        case 'cancel':
          addNotification({
            type: 'transaction',
            title: 'Order Cancelled',
            message: `Order ${transactionId} has been cancelled.`,
            priority: 'normal'
          });
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Transaction action failed:', error);
      addNotification({
        type: 'system',
        title: 'Action Failed',
        message: 'Failed to perform the requested action. Please try again.',
        priority: 'high'
      });
    }
  };

  const handleSubmitDispute = async (transactionId, disputeData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      addNotification({
        type: 'transaction',
        title: 'Dispute Submitted',
        message: `Your dispute for order ${transactionId} has been submitted and is under review.`,
        priority: 'high'
      });
      
      // Update transaction status
      setTransactions(prev =>
        prev?.map(t =>
          t?.id === transactionId
            ? { ...t, status: 'disputed', escrowStatus: 'held' }
            : t
        )
      );
    } catch (error) {
      console.error('Failed to submit dispute:', error);
      throw error;
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      search: '',
      status: 'all',
      type: 'all',
      amountRange: 'all',
      dateRange: { start: '', end: '' },
      showDisputed: false,
      highRiskOnly: false
    };
    setFilters(clearedFilters);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center animate-pulse">
                  <Icon name="ArrowLeftRight" size={24} className="text-primary-foreground" />
                </div>
                <div className="text-text-secondary font-caption">Loading transactions...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                Transaction Management
              </h1>
              <p className="text-text-secondary">
                Monitor and manage all your marketplace transactions with AI-powered security
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button variant="outline" iconName="Download">
                Export Data
              </Button>
              <Button variant="default" iconName="Plus">
                New Transaction
              </Button>
            </div>
          </div>

          {/* Transaction Stats */}
          <TransactionStats stats={mockStats} />

          {/* Transaction Tabs */}
          <TransactionTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            counts={getTabCounts()}
          />

          {/* Filters */}
          <TransactionFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />

          {/* Transactions List */}
          <div className="space-y-4">
            {filteredTransactions?.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-12 text-center">
                <Icon name="ArrowLeftRight" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-heading font-semibold text-card-foreground mb-2">
                  No transactions found
                </h3>
                <p className="text-text-secondary mb-6">
                  {activeTab === 'all' ? "You haven't made any transactions yet. Start buying or selling to see them here."
                    : `No ${activeTab} transactions match your current filters.`
                  }
                </p>
                {activeTab === 'all' && (
                  <Button variant="default" iconName="Search">
                    Browse Marketplace
                  </Button>
                )}
              </div>
            ) : (
              filteredTransactions?.map((transaction) => (
                <TransactionCard
                  key={transaction?.id}
                  transaction={transaction}
                  onAction={handleTransactionAction}
                />
              ))
            )}
          </div>

          {/* Load More */}
          {filteredTransactions?.length > 0 && filteredTransactions?.length >= 10 && (
            <div className="text-center mt-8">
              <Button variant="outline" iconName="ChevronDown">
                Load More Transactions
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Dispute Modal */}
      <DisputeModal
        isOpen={isDisputeModalOpen}
        onClose={() => {
          setIsDisputeModalOpen(false);
          setSelectedTransaction(null);
        }}
        transaction={selectedTransaction}
        onSubmitDispute={handleSubmitDispute}
      />
    </div>
  );
};

export default TransactionManagement;