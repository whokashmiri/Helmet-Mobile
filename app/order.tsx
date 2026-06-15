import React, { useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

import { AppScreen } from '../src/components/AppScreen';
import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { colors } from '../src/constants/colors';
import { useOrders } from '../src/store/orderStore';

type TabType = 'today' | 'daily' | 'weekly' | 'monthly';

type SummarySelection = {
  type: 'daily' | 'weekly' | 'monthly';
  label: string;
  orders: Array<{
    id: string;
    title: string;
    merchantName: string;
    dropoffLocation: string;
    status: string;
    codAmount: number;
    customerName: string;
    customerPhone: string;
    pickupLocation: string;
    packageType: string;
    weight: string;
    distance: string;
    estimatedTime: string;
  }>;
};

export default function OrderScreen() {

  const [selectedSummary, setSelectedSummary] = useState<SummarySelection | null>(null);
  const { orders, updateOrder } = useOrders();

 const dailySummary = [
  {
    day: 'Friday',
    orders: 12,
    hours: '7.5h',
    earning: 420,
    details: [
      {
        id: 'ORD-30511',
        title: 'Fresh Delivery',
        merchantName: 'Al-Madina Grocer',
        dropoffLocation: 'Al Nakheel, Riyadh',
        status: 'delivered',
        codAmount: 85,
        customerName: 'Sara Ahmed',
        customerPhone: '+966501234987',
        pickupLocation: 'Al-Madina Store',
        packageType: 'Groceries',
        weight: '3.2 kg',
        distance: '10.5 km',
        estimatedTime: '35 mins',
      },
      {
        id: 'ORD-30512',
        title: 'Lunch Package',
        merchantName: 'Tasty Bites',
        dropoffLocation: 'Olaya District',
        status: 'picked_up',
        codAmount: 62,
        customerName: 'Faisal Khan',
        customerPhone: '+966504567890',
        pickupLocation: 'Tasty Bites Kitchen',
        packageType: 'Food',
        weight: '2.0 kg',
        distance: '6.2 km',
        estimatedTime: '22 mins',
      },
    ],
  },
  {
    day: 'Thursday',
    orders: 10,
    hours: '6.8h',
    earning: 360,
    details: [
      {
        id: 'ORD-30513',
        title: 'Office Supplies',
        merchantName: 'Stationery Pro',
        dropoffLocation: 'King Fahd Road',
        status: 'pending',
        codAmount: 52,
        customerName: 'Nora Saleh',
        customerPhone: '+966505678321',
        pickupLocation: 'Stationery Pro Warehouse',
        packageType: 'Stationery',
        weight: '4.5 kg',
        distance: '12 km',
        estimatedTime: '40 mins',
      },
    ],
  },
  {
    day: 'Wednesday',
    orders: 8,
    hours: '5.5h',
    earning: 290,
    details: [
      {
        id: 'ORD-30514',
        title: 'Flower Delivery',
        merchantName: 'Rose Garden',
        dropoffLocation: 'Al Malaz',
        status: 'delivered',
        codAmount: 120,
        customerName: 'Lama Hasan',
        customerPhone: '+966509876210',
        pickupLocation: 'Rose Garden Shop',
        packageType: 'Bouquet',
        weight: '1.1 kg',
        distance: '8.8 km',
        estimatedTime: '30 mins',
      },
    ],
  },
  {
    day: 'Tuesday',
    orders: 15,
    hours: '8.2h',
    earning: 510,
    details: [
      {
        id: 'ORD-30515',
        title: 'Pharmacy Request',
        merchantName: 'Health Hub',
        dropoffLocation: 'Diplomatic Quarter',
        status: 'picked_up',
        codAmount: 70,
        customerName: 'Hassan Ali',
        customerPhone: '+966507891234',
        pickupLocation: 'Health Hub Branch',
        packageType: 'Medicines',
        weight: '2.8 kg',
        distance: '7.1 km',
        estimatedTime: '28 mins',
      },
    ],
  },
  {
    day: 'Monday',
    orders: 9,
    hours: '6.1h',
    earning: 330,
    details: [
      {
        id: 'ORD-30516',
        title: 'Gadget Shipping',
        merchantName: 'Tech Corner',
        dropoffLocation: 'King Abdullah Road',
        status: 'pending',
        codAmount: 140,
        customerName: 'Rana Saad',
        customerPhone: '+966508765432',
        pickupLocation: 'Tech Corner Store',
        packageType: 'Electronics',
        weight: '5.0 kg',
        distance: '15 km',
        estimatedTime: '55 mins',
      },
    ],
  },
];

const weeklySummary = [
  {
    week: 'Week 1',
    orders: 100,
    hours: '48h',
    earning: 3200,
    details: [
      {
        id: 'ORD-30517',
        title: 'Medical Supplies',
        merchantName: 'Care Pharmacy',
        dropoffLocation: 'Riyadh Front',
        status: 'delivered',
        codAmount: 200,
        customerName: 'Aya Zaki',
        customerPhone: '+966501112223',
        pickupLocation: 'Care Pharmacy',
        packageType: 'Medicines',
        weight: '3.5 kg',
        distance: '14 km',
        estimatedTime: '45 mins',
      },
      {
        id: 'ORD-30518',
        title: 'Lunch Order',
        merchantName: 'Urban Kitchen',
        dropoffLocation: 'Olaya',
        status: 'picked_up',
        codAmount: 65,
        customerName: 'Fahad Sami',
        customerPhone: '+966503334445',
        pickupLocation: 'Urban Kitchen',
        packageType: 'Food',
        weight: '2.2 kg',
        distance: '5.8 km',
        estimatedTime: '23 mins',
      },
    ],
  },
  {
    week: 'Week 2',
    orders: 86,
    hours: '42h',
    earning: 2860,
    details: [
      {
        id: 'ORD-30519',
        title: 'Snack Delivery',
        merchantName: 'Snack Shack',
        dropoffLocation: 'King Salman Park',
        status: 'pending',
        codAmount: 45,
        customerName: 'Sara Noor',
        customerPhone: '+966504556677',
        pickupLocation: 'Snack Shack',
        packageType: 'Snacks',
        weight: '1.4 kg',
        distance: '9.3 km',
        estimatedTime: '29 mins',
      },
    ],
  },
  {
    week: 'Week 3',
    orders: 94,
    hours: '45h',
    earning: 3050,
    details: [
      {
        id: 'ORD-30520',
        title: 'Fresh Fruit',
        merchantName: 'Green Basket',
        dropoffLocation: 'Al Olaya',
        status: 'delivered',
        codAmount: 90,
        customerName: 'Nasser Omar',
        customerPhone: '+966509990011',
        pickupLocation: 'Green Basket',
        packageType: 'Fruit',
        weight: '4.0 kg',
        distance: '11.7 km',
        estimatedTime: '38 mins',
      },
    ],
  },
  {
    week: 'Week 4',
    orders: 110,
    hours: '52h',
    earning: 3520,
    details: [
      {
        id: 'ORD-30521',
        title: 'Dinner Set',
        merchantName: 'Chef Express',
        dropoffLocation: 'Al Nakheel',
        status: 'picked_up',
        codAmount: 110,
        customerName: 'Amal Faris',
        customerPhone: '+966507777888',
        pickupLocation: 'Chef Express',
        packageType: 'Food',
        weight: '3.8 kg',
        distance: '10 km',
        estimatedTime: '33 mins',
      },
    ],
  },
  {
    week: 'Week 5',
    orders: 72,
    hours: '34h',
    earning: 2300,
    details: [
      {
        id: 'ORD-30522',
        title: 'Beverage Run',
        merchantName: 'Cool Drinks',
        dropoffLocation: 'Al Malaz',
        status: 'pending',
        codAmount: 75,
        customerName: 'Khalid Abdallah',
        customerPhone: '+966506543210',
        pickupLocation: 'Cool Drinks',
        packageType: 'Beverages',
        weight: '4.7 kg',
        distance: '13.5 km',
        estimatedTime: '42 mins',
      },
    ],
  },
];

const monthlySummary = [
  {
    month: 'January',
    orders: 500,
    hours: '210h',
    earning: 16200,
    details: [
      {
        id: 'ORD-30523',
        title: 'Winter Essentials',
        merchantName: 'Home Goods',
        dropoffLocation: 'Riyadh Season',
        status: 'delivered',
        codAmount: 150,
        customerName: 'Nada Al-Harbi',
        customerPhone: '+966502334455',
        pickupLocation: 'Home Goods Warehouse',
        packageType: 'Household',
        weight: '6.0 kg',
        distance: '18 km',
        estimatedTime: '50 mins',
      },
       {
        id: 'ORD-30524',
        title: ' Things',
        merchantName: 'Kitchenware',
        dropoffLocation: 'Al Olaya',
        status: 'delivered',
        codAmount: 10,
        customerName: 'Ada Al-Qahtani',
        customerPhone: '+966502334455',
        pickupLocation: 'Home Goods Warehouse',
        packageType: 'Household',
        weight: '6.0 kg',
        distance: '18 km',
        estimatedTime: '50 mins',
      },
       {
        id: 'ORD-30525',
        title: 'Winter Essentials',
        merchantName: 'Spark Vision',
        dropoffLocation: 'Laban',
        status: 'delivered',
        codAmount: 200,
        customerName: 'Shahrat Al-Somathing',
        customerPhone: '+966502334455',
        pickupLocation: 'Home Goods Warehouse',
        packageType: 'Household',
        weight: '6.0 kg',
        distance: '18 km',
        estimatedTime: '50 mins',
      },
       {
        id: 'ORD-30526',
        title: ' Chai Karak',
        merchantName: 'Bombaclat',
        dropoffLocation: 'Al Naseem',
        status: 'delivered',
        codAmount: 520,
        customerName: 'Puda Al-Maghrabi',
        customerPhone: '+966502334400',
        pickupLocation: 'Centai Mall',
        packageType: 'Household',
        weight: '6.0 kg',
        distance: '18 km',
        estimatedTime: '50 mins',
      },
    ],
  },
  {
    month: 'February',
    orders: 460,
    hours: '198h',
    earning: 14800,
    details: [
      {
        id: 'ORD-30524',
        title: 'Valentine Gift',
        merchantName: 'Sweet Bloom',
        dropoffLocation: 'Olaya',
        status: 'picked_up',
        codAmount: 180,
        customerName: 'Maha Saeed',
        customerPhone: '+966504778899',
        pickupLocation: 'Sweet Bloom Shop',
        packageType: 'Gifts',
        weight: '1.6 kg',
        distance: '8.9 km',
        estimatedTime: '26 mins',
      },
    ],
  },
  {
    month: 'March',
    orders: 520,
    hours: '222h',
    earning: 17100,
    details: [
      {
        id: 'ORD-30525',
        title: 'Spring Order',
        merchantName: 'Garden Fresh',
        dropoffLocation: 'Al Nakheel',
        status: 'pending',
        codAmount: 95,
        customerName: 'Ali Hassan',
        customerPhone: '+966503221100',
        pickupLocation: 'Garden Fresh Store',
        packageType: 'Produce',
        weight: '3.0 kg',
        distance: '12.3 km',
        estimatedTime: '36 mins',
      },
    ],
  },
  {
    month: 'April',
    orders: 490,
    hours: '205h',
    earning: 15850,
    details: [
      {
        id: 'ORD-30526',
        title: 'Fresh Drinks',
        merchantName: 'Hydrate Store',
        dropoffLocation: 'King Abdullah Rd',
        status: 'delivered',
        codAmount: 130,
        customerName: 'Laila Saleh',
        customerPhone: '+966506666777',
        pickupLocation: 'Hydrate Store',
        packageType: 'Beverages',
        weight: '5.5 kg',
        distance: '16 km',
        estimatedTime: '48 mins',
      },
    ],
  },
  {
    month: 'May',
    orders: 540,
    hours: '230h',
    earning: 18000,
    details: [
      {
        id: 'ORD-30527',
        title: 'Weekend Box',
        merchantName: 'Box Express',
        dropoffLocation: 'Al Malaz',
        status: 'picked_up',
        codAmount: 160,
        customerName: 'Huda Nasser',
        customerPhone: '+966505888999',
        pickupLocation: 'Box Express Hub',
        packageType: 'Mixed Items',
        weight: '6.8 kg',
        distance: '17 km',
        estimatedTime: '52 mins',
      },
    ],
  },
];

  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Camera Required', 'Please allow camera access.');
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.75,
      allowsEditing: false,
    });

    if (result.canceled) return null;

    return result.assets[0]?.uri ?? null;
  }

  async function handlePickup(orderId: string) {
    const photoUri = await takePhoto();

    if (!photoUri) return;

    updateOrder(orderId, {
      pickupPhoto: photoUri,
      pickupTime: new Date().toISOString(),
      status: 'picked_up',
    });
  }

  async function handleDelivery(orderId: string) {
    const order = orders.find((item) => item.id === orderId);

    if (!order?.pickupTime) {
      Alert.alert('Pickup Required', 'Please upload pickup proof first.');
      return;
    }

    const photoUri = await takePhoto();

    if (!photoUri) return;

    updateOrder(orderId, {
      deliveryPhoto: photoUri,
      deliveryTime: new Date().toISOString(),
      status: 'delivered',
    });
  }

  function getDurationText(pickupTime?: string, deliveryTime?: string) {
    if (!pickupTime || !deliveryTime) return 'Not completed';

    const diffMs =
      new Date(deliveryTime).getTime() - new Date(pickupTime).getTime();

    const minutes = Math.floor(diffMs / 1000 / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }

const filteredOrders = orders;

function getSummaryOrders() {
  if (!selectedSummary || selectedSummary.type !== activeTab) return [];
  return selectedSummary.orders;
}

  return (
    <AppScreen>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <View style={styles.tabContainer}>
  {(['today', 'daily', 'weekly', 'monthly'] as TabType[]).map((tab) => (
    <Pressable
      key={tab}
      style={styles.tabItem}
      onPress={() => {
        setActiveTab(tab);
        setSelectedSummary(null);
      }}
    >
      <Text
        style={[
          styles.tabText,
          activeTab === tab && styles.activeTabText,
        ]}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </Text>

      {activeTab === tab && <View style={styles.tabIndicator} />}
    </Pressable>
  ))}
</View>
        </Card>

        {activeTab === 'today' &&
  filteredOrders.map((order) => {
          const expanded = expandedOrderId === order.id;

          return (
            <View key={order.id} style={styles.orderWrapper}>
              <Pressable
                onPress={() =>
                  setExpandedOrderId(expanded ? null : order.id)
                }
              >
                <Card>
                  <View style={styles.orderHeader}>
                    <View>
                      <Text style={styles.title}>{order.title}</Text>
                      <Text style={styles.orderId}>Order #{order.id}</Text>
                      <Text style={styles.muted}>
                        {order.merchantName} → {order.dropoffLocation}
                      </Text>
                    </View>

                    <View style={styles.topDetailsRow}>
                      <View style={styles.topTimes}>
                        <Text style={styles.timeSmall}>
                          Pickup:{' '}
                          {order.pickupTime
                            ? new Date(order.pickupTime).toLocaleTimeString()
                            : 'Not picked'}
                        </Text>
                        <Text style={styles.timeSmall}>
                          Delivered:{' '}
                          {order.deliveryTime
                            ? new Date(order.deliveryTime).toLocaleTimeString()
                            : 'Not delivered'}
                        </Text>
                        <Text style={styles.durationSmall}>
                        {getDurationText(order.pickupTime, order.deliveryTime)}
                      </Text>
                      </View>
                      
                    </View>
                  </View>

                  <View style={styles.miniInfoRow}>
                    <Text style={styles.miniInfo}>{order.distance}</Text>
                    <Text style={styles.miniInfo}>
                      {order.estimatedTime}
                    </Text>
                    <Text style={styles.miniInfo}>
                      {order.status.replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>

                  <View style={styles.proofRow}>
                    <Pressable
                      style={styles.proofBox}
                      onPress={() => handlePickup(order.id)}
                    >
                      {order.pickupPhoto ? (
                        <Image
                          source={{ uri: order.pickupPhoto }}
                          style={styles.proofImage}
                        />
                      ) : (
                        <Text style={styles.proofText}>📸 Pickup</Text>
                      )}
                    </Pressable>

                    <Pressable
                      style={styles.proofBox}
                      onPress={() => handleDelivery(order.id)}
                    >
                      {order.deliveryPhoto ? (
                        <Image
                          source={{ uri: order.deliveryPhoto }}
                          style={styles.proofImage}
                        />
                      ) : (
                        <Text style={styles.proofText}>📸 Delivery</Text>
                      )}
                    </Pressable>
                  </View>
                </Card>
              </Pressable>

              {expanded && (
                <>
                  <Card>
                    <Text style={styles.sectionTitle}>
                      Merchant Details
                    </Text>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Merchant</Text>
                      <Text style={styles.detailValue}>
                        {order.merchantName}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Phone</Text>
                      <Text style={styles.detailValue}>
                        {order.merchantPhone}
                      </Text>
                    </View>

                    <View style={styles.inlineActions}>
                    <Pressable
                      style={styles.iconAction}
                      onPress={() => Linking.openURL(`tel:${order.merchantPhone}`)}
                    >
                      <MaterialIcons name="call" size={18} color={colors.primary} />
                      <Text style={styles.iconText}>Call</Text>
                    </Pressable>

                    <Pressable
                      style={styles.iconAction}
                      onPress={() => Linking.openURL(`sms:${order.merchantPhone}`)}
                    >
                      <MaterialIcons name="chat" size={18} color={colors.primary} />
                      <Text style={styles.iconText}>Chat</Text>
                    </Pressable>

                    <Pressable
                      style={styles.iconAction}
                      onPress={() =>
                        Linking.openURL(
                          `https://www.google.com/maps/search/?api=1&query=${order.pickupLocation}`
                        )
                      }
                    >
                      <MaterialIcons name="location-on" size={18} color={colors.primary} />
                      <Text style={styles.iconText}>Location</Text>
                    </Pressable>
                  </View>
                  </Card>

                  <Card>
                    <Text style={styles.sectionTitle}>Order Details</Text>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Pickup</Text>
                      <Text style={styles.detailValue}>
                        {order.pickupLocation}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Drop-off</Text>
                      <Text style={styles.detailValue}>
                        {order.dropoffLocation}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Customer</Text>
                      <Text style={styles.detailValue}>
                        {order.customerName}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Customer Phone</Text>
                      <Text style={styles.detailValue}>
                        {order.customerPhone}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Package</Text>
                      <Text style={styles.detailValue}>
                        {order.packageType}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Weight</Text>
                      <Text style={styles.detailValue}>
                        {order.weight}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>COD Amount</Text>
                      <Text style={styles.detailPrice}>
                        SAR {order.codAmount}
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>Delivery Fee</Text>
                      <Text style={styles.detailPrice}>
                        {/* SAR {order.deliveryFee} */}
                      </Text>
                    </View>
                  </Card>

                  <Card style={styles.actions}>
                    {order.status === 'pending' && (
                      <Button
                        title="Pick Up Package"
                        onPress={() => handlePickup(order.id)}
                      />
                    )}

                    {order.status === 'picked_up' && (
                      <Button
                        title="Deliver Package"
                        onPress={() => handleDelivery(order.id)}
                      />
                    )}

                    {order.status === 'delivered' && (
                      <Button
                        title="Completed"
                        variant="ghost"
                      />
                    )}
                  </Card>
                </>
              )}
            </View>
          );
        })}

        {activeTab === 'daily' && (
  <Card>
    <Text style={styles.sectionTitle}>Daily Orders</Text>

   {dailySummary.map((item) => {
      const open = selectedSummary?.type === 'daily' && selectedSummary.label === item.day;
      return (
        <View key={item.day}>
          <Pressable
            style={[
              styles.summaryRow,
              open ? styles.summarySelectedRow : null,
            ]}
            onPress={() =>
              setSelectedSummary(open
                ? null
                : {
                    type: 'daily',
                    label: item.day,
                    orders: item.details,
                  }
              )
            }
          >
            <View>
              <Text style={styles.summaryTitle}>{item.day}</Text>
              <Text style={styles.muted}>{item.hours} working hours</Text>
            </View>

            <View style={styles.summaryRight}>
              <Text style={styles.summaryOrders}>{item.orders} Orders</Text>
              <Text style={styles.summaryEarning}>SAR {item.earning}</Text>
            </View>
          </Pressable>

          {open && (
            <View style={styles.summaryDetails}>
              {item.details.map((order) => (
                <View key={order.id} style={styles.summaryDetailItem}>
                  <View>
                    <Text style={styles.summaryTitle}>{order.title}</Text>
                    <Text style={styles.muted}>
                      {order.merchantName} → {order.dropoffLocation}
                    </Text>
                    <Text style={styles.muted}>
                      Status: {order.status.replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.detailPrice}>SAR {order.codAmount}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      );
    })}
   
  </Card>
)}

{activeTab === 'weekly' && (
  <Card>
    <Text style={styles.sectionTitle}>Weekly Orders</Text>

    {weeklySummary.map((item) => {
      const open = selectedSummary?.type === 'weekly' && selectedSummary.label === item.week;
      return (
        <View key={item.week}>
          <Pressable
            style={[
              styles.summaryRow,
              open ? styles.summarySelectedRow : null,
            ]}
            onPress={() =>
              setSelectedSummary(open
                ? null
                : {
                    type: 'weekly',
                    label: item.week,
                    orders: item.details,
                  }
              )
            }
          >
            <View>
              <Text style={styles.summaryTitle}>{item.week}</Text>
              <Text style={styles.muted}>{item.hours} working hours</Text>
            </View>

            <View style={styles.summaryRight}>
              <Text style={styles.summaryOrders}>{item.orders} Orders</Text>
              <Text style={styles.summaryEarning}>SAR {item.earning}</Text>
            </View>
          </Pressable>

          {open && (
            <View style={styles.summaryDetails}>
              {item.details.map((order) => (
                <View key={order.id} style={styles.summaryDetailItem}>
                  <View>
                    <Text style={styles.summaryTitle}>{order.title}</Text>
                    <Text style={styles.muted}>
                      {order.merchantName} → {order.dropoffLocation}
                    </Text>
                    <Text style={styles.muted}>
                      Status: {order.status.replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.detailPrice}>SAR {order.codAmount}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      );
    })}
  </Card>
)}

{activeTab === 'monthly' && (
  <Card>
    <Text style={styles.sectionTitle}>Monthly Orders</Text>

    {monthlySummary.map((item) => {
      const open = selectedSummary?.type === 'monthly' && selectedSummary.label === item.month;
      return (
        <View key={item.month}>
          <Pressable
            style={[
              styles.summaryRow,
              open ? styles.summarySelectedRow : null,
            ]}
            onPress={() =>
              setSelectedSummary(open
                ? null
                : {
                    type: 'monthly',
                    label: item.month,
                    orders: item.details,
                  }
              )
            }
          >
            <View>
              <Text style={styles.summaryTitle}>{item.month}</Text>
              <Text style={styles.muted}>{item.hours} working hours</Text>
            </View>

            <View style={styles.summaryRight}>
              <Text style={styles.summaryOrders}>{item.orders} Orders</Text>
              <Text style={styles.summaryEarning}>SAR {item.earning}</Text>
            </View>
          </Pressable>

          {open && (
            <View style={styles.summaryDetails}>
              {item.details.map((order) => (
                <View key={order.id} style={styles.summaryDetailItem}>
                  <View>
                    <Text style={styles.summaryTitle}>{order.title}</Text>
                    <Text style={styles.muted}>
                      {order.merchantName} → {order.dropoffLocation}
                    </Text>
                    <Text style={styles.muted}>
                      Status: {order.status.replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.detailPrice}>SAR {order.codAmount}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      );
    })}
  </Card>
)}
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  scroll: {
    gap: 14,
    padding: 18,
    paddingBottom: 24,
  },
  orderWrapper: {
    gap: 10,
  },
tabContainer: {
  flexDirection: 'row',
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
},

summaryOrderCard: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
},
summarySelectedRow: {
  backgroundColor: '#eef7ff',
},
summaryDetails: {
  paddingHorizontal: 14,
  paddingVertical: 10,
  backgroundColor: '#fafbff',
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  borderTopWidth: 1,
  borderTopColor: colors.border,
  gap: 10,
},
summaryDetailItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 8,
  paddingVertical: 5,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
},
tabItem: {
  flex: 1,
  alignItems: 'center',
  paddingVertical: 10,
},
tabText: {
  fontSize: 12,
  fontWeight: '800',
  color: colors.muted,
},
activeTabText: {
  color: colors.primary,
},
tabIndicator: {
  marginTop: 8,
  height: 3,
  width: 28,
  borderRadius: 99,
  backgroundColor: colors.primary,
},

  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  orderId: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.text,
    marginTop: 4,
  },
  muted: {
    color: colors.muted,
    fontSize: 9,
    lineHeight: 15,
  },
  price: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.success,
  },
  topDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  topTimes: {
    alignItems: 'flex-end',
  },
  inlineActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 8,
  },
  iconAction: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.primary,
  },
  miniInfoRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    flexWrap: 'wrap',
  },
  miniInfo: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 5,
    fontSize: 10,
    fontWeight: '800',
    color: colors.text,
  },
  proofRow: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 8,
  },
  proofBox: {
    flex: 1,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  proofImage: {
    width: '70%',
    height: '70%',
  },
  proofText: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.text,
  },
  timeBox: {
    marginTop: 10,
    gap: 3,
  },
  timeSmall: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.muted,
  },
  durationSmall: {
    fontSize: 11,
    fontWeight: '900',
    color: colors.success,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    color: colors.muted,
    fontWeight: '700',
    fontSize: 11,
  },
  detailValue: {
    color: colors.text,
    fontWeight: '800',
    flex: 1,
    textAlign: 'right',
    fontSize: 11,
  },
  detailPrice: {
    color: colors.success,
    fontWeight: '900',
    fontSize: 10,
  },

  summaryRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 12,
  borderBottomWidth: 1,
  borderBottomColor: colors.border,
},
summaryTitle: {
  fontSize: 8,
  fontWeight: '600',
  color: colors.text,
},
summaryRight: {
  alignItems: 'flex-end',
},
summaryOrders: {
  fontSize: 9,
  fontWeight: '700',
  color: colors.primary,
},
summaryEarning: {
  marginTop: 3,
  fontSize: 10,
  fontWeight: '700',
  color: colors.success,
},
  quickActions: {
    gap: 10,
    marginTop: 12,
  },
  actions: {
    gap: 10,
  },
});