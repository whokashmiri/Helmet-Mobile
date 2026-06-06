import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Card } from '../src/components/Card';
import { Button } from '../src/components/Button';
import { colors } from '../src/constants/colors';

const weeklyData = [
  { day: 'Mon', orders: 8, hours: 6.5, earning: 210 },
  { day: 'Tue', orders: 11, hours: 7.2, earning: 295 },
  { day: 'Wed', orders: 7, hours: 5.8, earning: 180 },
  { day: 'Thu', orders: 13, hours: 8.1, earning: 360 },
  { day: 'Fri', orders: 10, hours: 6.9, earning: 275 },
  { day: 'Sat', orders: 6, hours: 4.5, earning: 150 },
  { day: 'Sun', orders: 0, hours: 0, earning: 0 },
];

export default function RiderDashboardScreen() {
  const totalOrders = weeklyData.reduce((sum, item) => sum + item.orders, 0);
  const totalHours = weeklyData.reduce((sum, item) => sum + item.hours, 0);
  const totalEarning = weeklyData.reduce((sum, item) => sum + item.earning, 0);
  const avgPerOrder = Math.round(totalEarning / totalOrders);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <View style={styles.profileRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>TR</Text>
            </View>

            <View>
              <Text style={styles.name}>Test Rider</Text>
              <Text style={styles.muted}>Rider ID: 123456</Text>
              <Text style={styles.muted}>Online Status: Active</Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.title}>Today Overview</Text>

          <View style={styles.grid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>6</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>4.5h</Text>
              <Text style={styles.statLabel}>Hours</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>SAR 150</Text>
              <Text style={styles.statLabel}>Earning</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statValue}>92%</Text>
              <Text style={styles.statLabel}>Success</Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.title}>Weekly Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Orders</Text>
            <Text style={styles.summaryValue}>{totalOrders}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Working Hours</Text>
            <Text style={styles.summaryValue}>{totalHours.toFixed(1)}h</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Earnings</Text>
            <Text style={styles.earning}>SAR {totalEarning}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Average Per Order</Text>
            <Text style={styles.summaryValue}>SAR {avgPerOrder}</Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.title}>Daily Performance</Text>

          {weeklyData.map((item) => (
            <View key={item.day} style={styles.dayRow}>
              <Text style={styles.day}>{item.day}</Text>

              <View style={styles.dayInfo}>
                <Text style={styles.dayText}>{item.orders} orders</Text>
                <Text style={styles.dayText}>{item.hours}h</Text>
              </View>

              <Text style={styles.dayEarning}>SAR {item.earning}</Text>
            </View>
          ))}
        </Card>

        <Card>
          <Text style={styles.title}>Order Status</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Completed</Text>
            <Text style={styles.summaryValue}>52</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Cancelled</Text>
            <Text style={styles.summaryValue}>3</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Pending</Text>
            <Text style={styles.summaryValue}>1</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Late Deliveries</Text>
            <Text style={styles.warning}>2</Text>
          </View>
        </Card>

        <Card>
          <Text style={styles.title}>Rider Metrics</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Rating</Text>
            <Text style={styles.summaryValue}>4.8 ⭐</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Acceptance Rate</Text>
            <Text style={styles.summaryValue}>96%</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>On-time Delivery</Text>
            <Text style={styles.summaryValue}>94%</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Avg Delivery Time</Text>
            <Text style={styles.summaryValue}>27 mins</Text>
          </View>
        </Card>

        <Button title="Go Online" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 18,
  },
  scroll: {
    gap: 14,
    paddingBottom: 24,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '900',
  },
  name: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.text,
  },
  muted: {
    color: colors.muted,
    fontSize: 11,
    lineHeight: 17,
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statBox: {
    width: '48%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#fff',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
  statLabel: {
    marginTop: 4,
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryLabel: {
    color: colors.muted,
    fontWeight: '700',
    fontSize: 12,
  },
  summaryValue: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 12,
  },
  earning: {
    color: colors.success,
    fontWeight: '900',
    fontSize: 13,
  },
  warning: {
    color: colors.danger,
    fontWeight: '900',
    fontSize: 12,
  },
  dayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  day: {
    width: 42,
    fontWeight: '900',
    color: colors.text,
    fontSize: 12,
  },
  dayInfo: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  dayText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
  },
  dayEarning: {
    color: colors.success,
    fontWeight: '900',
    fontSize: 12,
  },
});