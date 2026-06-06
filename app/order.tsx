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

import { AppScreen } from '../src/components/AppScreen';
import { Button } from '../src/components/Button';
import { Card } from '../src/components/Card';
import { colors } from '../src/constants/colors';
import { useOrders } from '../src/store/orderStore';

type TabType = 'today' | 'daily' | 'weekly' | 'monthly';

export default function OrderScreen() {
  const { orders, updateOrder } = useOrders();

 const dailySummary = [
  { day: 'Friday', orders: 12, hours: '7.5h', earning: 420 },
  { day: 'Thursday', orders: 10, hours: '6.8h', earning: 360 },
  { day: 'Wednesday', orders: 8, hours: '5.5h', earning: 290 },
  { day: 'Tuesday', orders: 15, hours: '8.2h', earning: 510 },
  { day: 'Monday', orders: 9, hours: '6.1h', earning: 330 },
];

const weeklySummary = [
  { week: 'Week 1', orders: 100, hours: '48h', earning: 3200 },
  { week: 'Week 2', orders: 86, hours: '42h', earning: 2860 },
  { week: 'Week 3', orders: 94, hours: '45h', earning: 3050 },
  { week: 'Week 4', orders: 110, hours: '52h', earning: 3520 },
  { week: 'Week 5', orders: 72, hours: '34h', earning: 2300 },
];

const monthlySummary = [
  { month: 'January', orders: 500, hours: '210h', earning: 16200 },
  { month: 'February', orders: 460, hours: '198h', earning: 14800 },
  { month: 'March', orders: 520, hours: '222h', earning: 17100 },
  { month: 'April', orders: 490, hours: '205h', earning: 15850 },
  { month: 'May', orders: 540, hours: '230h', earning: 18000 },
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

  return (
    <AppScreen>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <View style={styles.tabContainer}>
  {(['today', 'daily', 'weekly', 'monthly'] as TabType[]).map((tab) => (
    <Pressable
      key={tab}
      style={styles.tabItem}
      onPress={() => setActiveTab(tab)}
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

                    <Text style={styles.price}>
                      {/* SAR {order.deliveryFee} */}
                    </Text>
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

                  <View style={styles.timeBox}>
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
                      Total Time:{' '}
                      {getDurationText(
                        order.pickupTime,
                        order.deliveryTime
                      )}
                    </Text>
                  </View>

                  <Text style={styles.muted}>
                    Tap card to view full order details
                  </Text>
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

                    <View style={styles.quickActions}>
                      <Button
                        title="📞 Call"
                        onPress={() =>
                          Linking.openURL(`tel:${order.merchantPhone}`)
                        }
                      />

                      <Button
                        title="💬 Chat"
                        variant="ghost"
                        onPress={() =>
                          Linking.openURL(`sms:${order.merchantPhone}`)
                        }
                      />

                      <Button
                        title="View Location"
                        variant="ghost"
                        onPress={() =>
                          Linking.openURL(
                            `https://www.google.com/maps/search/?api=1&query=${order.pickupLocation}`
                          )
                        }
                      />
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

    {dailySummary.map((item) => (
      <View key={item.day} style={styles.summaryRow}>
        <View>
          <Text style={styles.summaryTitle}>{item.day}</Text>
          <Text style={styles.muted}>{item.hours} working hours</Text>
        </View>

        <View style={styles.summaryRight}>
          <Text style={styles.summaryOrders}>{item.orders} Orders</Text>
          <Text style={styles.summaryEarning}>SAR {item.earning}</Text>
        </View>
      </View>
    ))}
  </Card>
)}

{activeTab === 'weekly' && (
  <Card>
    <Text style={styles.sectionTitle}>Weekly Orders</Text>

    {weeklySummary.map((item) => (
      <View key={item.week} style={styles.summaryRow}>
        <View>
          <Text style={styles.summaryTitle}>{item.week}</Text>
          <Text style={styles.muted}>{item.hours} working hours</Text>
        </View>

        <View style={styles.summaryRight}>
          <Text style={styles.summaryOrders}>{item.orders} Orders</Text>
          <Text style={styles.summaryEarning}>SAR {item.earning}</Text>
        </View>
      </View>
    ))}
  </Card>
)}

{activeTab === 'monthly' && (
  <Card>
    <Text style={styles.sectionTitle}>Monthly Orders</Text>

    {monthlySummary.map((item) => (
      <View key={item.month} style={styles.summaryRow}>
        <View>
          <Text style={styles.summaryTitle}>{item.month}</Text>
          <Text style={styles.muted}>{item.hours} working hours</Text>
        </View>

        <View style={styles.summaryRight}>
          <Text style={styles.summaryOrders}>{item.orders} Orders</Text>
          <Text style={styles.summaryEarning}>SAR {item.earning}</Text>
        </View>
      </View>
    ))}
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
    gap: 12,
  },
tabContainer: {
  flexDirection: 'row',
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
    fontWeight: '900',
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
    gap: 10,
    marginTop: 12,
  },
  proofBox: {
    flex: 1,
    height: 58,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  proofImage: {
    width: '100%',
    height: '100%',
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
    fontSize: 13,
    fontWeight: '900',
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
    fontSize: 12,
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
  fontSize: 14,
  fontWeight: '900',
  color: colors.text,
},
summaryRight: {
  alignItems: 'flex-end',
},
summaryOrders: {
  fontSize: 13,
  fontWeight: '900',
  color: colors.primary,
},
summaryEarning: {
  marginTop: 3,
  fontSize: 12,
  fontWeight: '900',
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