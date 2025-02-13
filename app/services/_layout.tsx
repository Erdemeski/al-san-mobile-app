import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack screenOptions={{ animation: 'ios_from_right', headerBackVisible: true }} >
            <Stack.Screen name="satsip" options={{ title: 'Satış Siparişi' }} />
            <Stack.Screen name="sipduz" options={{ title: 'Sipariş Düzenleme' }} />
            <Stack.Screen name="siplist" options={{ title: 'Sipariş Listeleme' }} />
        </Stack>
    );
}
