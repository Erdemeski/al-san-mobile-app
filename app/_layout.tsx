import '../global.css';
import 'expo-dev-client';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { Icon } from '@roninoss/icons';
import { Link, Slot, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

import { ThemeToggle } from '~/components/ThemeToggle';
import { cn } from '~/lib/cn';
import { useColorScheme, useInitialAndroidBarSync } from '~/lib/useColorScheme';
import { NAV_THEME } from '~/theme';
import { Provider } from 'react-redux';
import store from "~/store/store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <>
      <Provider store={store}>

        <StatusBar
          key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
          style={isDarkColorScheme ? 'light' : 'dark'}
        />
        {/* WRAP YOUR APP WITH ANY ADDITIONAL PROVIDERS HERE */}
        {/* <ExampleProvider> */}

        <NavThemeProvider value={NAV_THEME[colorScheme]}>
          <Stack screenOptions={SCREEN_OPTIONS}>
            <Stack.Screen name="index" /* options={INDEX_OPTIONS} */ options={{ headerShown: false }} />
            <Stack.Screen name="login" options={LOGIN_OPTIONS} />
            <Stack.Screen name="modal" options={MODAL_OPTIONS} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
          </Stack>
          {/* <Slot /> */}
        </NavThemeProvider>
      </Provider>

      {/* </ExampleProvider> */}
    </>
  );
}



const SCREEN_OPTIONS = {
  animation: 'ios_from_right', // for android
} as const;

/* const INDEX_OPTIONS = {
  headerLargeTitle: true,
  title: 'NativeWindUI',
  headerRight: () => <SettingsIcon />,
} as const;
 */
const LOGIN_OPTIONS = {
  headerLargeTitle: true,
  title: 'SAP Giriş Ekranı',
  headerRight: () => <SettingsIcon />,
} as const;

function SettingsIcon() {
  const { colors } = useColorScheme();
  return (
    <Link href="/modal" asChild>
      <Pressable className="opacity-80">
        {({ pressed }) => (
          <View className={cn(pressed ? 'opacity-50' : 'opacity-90')}>
            <Icon name="cog-outline" color={colors.foreground} />
          </View>
        )}
      </Pressable>
    </Link>
  );
}

const MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'fade_from_bottom', // for android
  title: 'Uygulama Ayarları',
  headerRight: () => <ThemeToggle />,
} as const;
