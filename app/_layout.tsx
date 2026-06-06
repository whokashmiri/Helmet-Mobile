import { Stack } from 'expo-router';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { OrderProvider } from '../src/store/orderStore';

const client = new QueryClient();

export default function Root() {
  return (
    <QueryClientProvider client={client}>
      <OrderProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </OrderProvider>
    </QueryClientProvider>
  );
}