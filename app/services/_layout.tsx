import { Stack } from 'expo-router';

export default function Layout() {
    return (
        <Stack screenOptions={{ animation: 'ios_from_right' }} >
            <Stack.Screen name="satsip" options={{ title: 'Satış Siparişi' }} />
        </Stack>
    );
}
