import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Card } from '../src/components/Card';
import { colors } from '../src/constants/colors';

const zones = [
  {
    area: 'Olaya',
    demand: 'High Demand',
    icon: '🔥',
    orders: 42,
    avgEarning: 'SAR 38',
    color: '#EF4444',
  },
  {
    area: 'Al Malqa',
    demand: 'High Demand',
    icon: '🔥',
    orders: 35,
    avgEarning: 'SAR 41',
    color: '#EF4444',
  },
  {
    area: 'Al Nakheel',
    demand: 'Medium Demand',
    icon: '🟡',
    orders: 22,
    avgEarning: 'SAR 30',
    color: '#F59E0B',
  },
  {
    area: 'Al Yasmin',
    demand: 'Medium Demand',
    icon: '🟡',
    orders: 18,
    avgEarning: 'SAR 28',
    color: '#F59E0B',
  },
  {
    area: 'Al Rawdah',
    demand: 'Low Demand',
    icon: '⚪',
    orders: 8,
    avgEarning: 'SAR 20',
    color: '#9CA3AF',
  },
  {
    area: 'Al Aziziyah',
    demand: 'Low Demand',
    icon: '⚪',
    orders: 5,
    avgEarning: 'SAR 18',
    color: '#9CA3AF',
  },
];

export default function DemandScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Riyadh Demand Map</Text>
        <Text style={styles.subtitle}>
          Choose areas with higher demand to get more orders.
        </Text>

        <Card>
          <View style={styles.legendRow}>
            <Text style={styles.legend}>🔥 High Demand</Text>
            <Text style={styles.legend}>🟡 Medium Demand</Text>
            <Text style={styles.legend}>⚪ Low Demand</Text>
          </View>
        </Card>

        {zones.map((zone) => (
          <Card key={zone.area}>
            <View style={styles.zoneHeader}>
              <View>
                <Text style={styles.area}>{zone.area}</Text>
                <Text style={[styles.demand, { color: zone.color }]}>
                  {zone.icon} {zone.demand}
                </Text>
              </View>

              <View style={styles.badge}>
                <Text style={styles.badgeText}>{zone.orders}</Text>
                <Text style={styles.badgeLabel}>orders</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Average Earning</Text>
              <Text style={styles.infoValue}>{zone.avgEarning}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Recommended Action</Text>
              <Text style={styles.infoValue}>
                {zone.demand === 'High Demand'
                  ? 'Go online now'
                  : zone.demand === 'Medium Demand'
                    ? 'Good backup area'
                    : 'Wait or move nearby'}
              </Text>
            </View>
          </Card>
        ))}
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
  title: {
    fontSize: 26,
    fontWeight: '900',
    color: colors.text,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  legendRow: {
    gap: 8,
  },
  legend: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.text,
  },
  zoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  area: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
  },
  demand: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '900',
  },
  badge: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.primary,
  },
  badgeLabel: {
    fontSize: 10,
    color: colors.muted,
    fontWeight: '700',
  },
  infoRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  infoLabel: {
    color: colors.muted,
    fontWeight: '700',
    fontSize: 12,
  },
  infoValue: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 12,
    textAlign: 'right',
  },
});