import { Icon } from '@roninoss/icons';
import { Link, useRouter } from 'expo-router';
import { Image, Platform, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { useColorScheme } from '~/lib/useColorScheme';

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function WelcomeConsentScreen() {
  const { colors } = useColorScheme();
  const router = useRouter();
  return (
    <SafeAreaView style={ROOT_STYLE}>
      <View className="mx-auto max-w-sm flex-1 justify-between gap-4 px-8 py-4 ">
        <View className="flex justify-center items-center ios:pt-16 pt-8">
          <Text variant="largeTitle" className="ios:text-left ios:font-black ios:text-3xl text-center font-bold">
            AL-SAN Meram Un
          </Text>
          <Text
            variant="largeTitle"
            className="ios:text-left ios:font-black text-primary text-center font-bold">
            HOŞ GELDİNİZ!
          </Text>
          <Image className="h-48 w-48 mt-3" source={require('~/assets/meramunLOGOYENI.png')} />
        </View>
        <View className="gap-8">
          {FEATURES.map((feature) => (
            <View key={feature.title} className="flex-row gap-4">
              <View className="pt-px">
                <Icon
                  name={feature.icon}
                  size={38}
                  color={colors.primary}
                  ios={{ renderingMode: 'hierarchical' }}
                />
              </View>
              <View className="flex-1">
                <Text className="font-bold">{feature.title}</Text>
                <Text variant="footnote">{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>
        <View className="gap-4 mb-5">
          <View className="items-center">
            <Icon
              name="account-multiple"
              size={24}
              color={colors.primary}
              ios={{ renderingMode: 'hierarchical' }}
            />
            <Text variant="caption2" className="pt-1 text-center">
              By pressing continue, you agree to our{' '}
              <Link href="/">
                <Text variant="caption2" className="text-primary">
                  Terms of Service
                </Text>
              </Link>{' '}
              and that you have read our{' '}
              <Link href="/">
                <Text variant="caption2" className="text-primary">
                  Privacy Policy
                </Text>
              </Link>
            </Text>
          </View>
          <Button size={Platform.select({ ios: 'lg', default: 'md' })} onPress={() => router.replace('/login')}>
            <Text>Devam</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView >
  );
}

const FEATURES = [
  {
    title: 'Kullanıcı Girişi',
    description: 'SAP hesabınıza kolayca giriş yapın ve panellerinize ulaşın',
    icon: 'account-circle-outline',
  },
/*   {
    title: 'Secure Messaging',
    description: 'Chat securely with friends and family in real-time.',
    icon: 'message-processing',
  },
 */  {
    title: 'Çapraz SAP Platformu',
    description: 'Sizin için özelleştirilmiş SAP panellerini kolaylıkla kullanın',
    icon: 'chart-timeline-variant',
  },
] as const;
