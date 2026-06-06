import React, { createContext, useContext, useState } from 'react';

type OrderStatus = 'pending' | 'picked_up' | 'delivered';

export type Order = {
  id: string;
  title: string;
  status: OrderStatus;

  merchantName: string;
  merchantPhone: string;
  customerName: string;
  customerPhone: string;

  pickupLocation: string;
  dropoffLocation: string;

  packageType: string;
  weight: string;
  distance: string;
  estimatedTime: string;

  // deliveryFee: number;
  codAmount: number;

  pickupPhoto?: string;
  deliveryPhoto?: string;
  pickupTime?: string;
  deliveryTime?: string;
};

type OrderContextType = {
  orders: Order[];
  addOrder: () => void;
  updateOrder: (id: string, data: Partial<Order>) => void;
};



const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
const [orders, setOrders] = useState<Order[]>([
  {
    id: 'ORD-20491',
    title: 'Current Order',

    merchantName: 'Fresh Mart',
    merchantPhone: '+966551234567',

    customerName: 'Mohammed Ali',
    customerPhone: '+966509876543',

    pickupLocation: 'Warehouse Gate 3',
    dropoffLocation: 'Customer Location',

    packageType: 'Small Parcel',
    weight: '2.5 kg',

    distance: '8.4 km',
    estimatedTime: '25 mins',

    // deliveryFee: 42,
    codAmount: 120,

    status: 'pending',
  },
]);


function updateOrder(id: string, data: Partial<Order>) {
  setOrders((prev) =>
    prev.map((order) =>
      order.id === id
        ? {
            ...order,
            ...data,
          }
        : order
    )
  );
}
  function addOrder() {
  const nextNumber = orders.length + 1;

  setOrders((prev) => [
    ...prev,
    {
      id: `ORD-${20491 + nextNumber}`,
      title: `Order ${nextNumber}`,

      merchantName: `Merchant ${nextNumber}`,
      merchantPhone: '+966500000000',

      customerName: `Customer ${nextNumber}`,
      customerPhone: '+966511111111',

      pickupLocation: `Pickup ${nextNumber}`,
      dropoffLocation: `Dropoff ${nextNumber}`,

      packageType: 'Electronics',
      weight: '1.5 kg',

      distance: `${5 + nextNumber} km`,
      estimatedTime: `${20 + nextNumber} mins`,

      // deliveryFee: 30 + nextNumber,
      codAmount: 100 + nextNumber * 10,

      status: 'pending',
    },
  ]);
}

  return (
    <OrderContext.Provider value={{ orders, addOrder , updateOrder}}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error('useOrders must be used inside OrderProvider');
  }

  return context;
}