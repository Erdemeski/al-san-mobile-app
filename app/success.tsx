import { Icon } from '@roninoss/icons';
import { Link, useRouter } from 'expo-router';
import { Image, Platform, View, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { useColorScheme } from '~/lib/useColorScheme';

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function SuccessSipScreen() {
    const { colors } = useColorScheme();
    const router = useRouter();
    return (
        <SafeAreaView style={ROOT_STYLE}>
            <View className="mx-auto max-w-sm flex-1 justify-between gap-4 px-8 py-4 ">
                <View className="flex justify-center items-center ios:pt-16 pt-8">
                    <Image className="h-32 w-32 mt-3" source={require('~/assets/meramunLOGOYENI.png')} />
                    <Text variant="largeTitle" className="ios:text-left ios:font-black text-3xl text-center font-bold">
                        AL-SAN Meram Un
                    </Text>
                    <Text
                        variant="largeTitle"
                        className="mt-8 ios:text-left ios:font-black text-4xl text-primary text-center font-bold">
                        Satış Siparişiniz Oluşturuldu!
                    </Text>
                </View>
                {/*                 <View className="gap-8">
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
                </View> */}
                <View className='min-h-96 bg-white dark:bg-gray-500 rounded-xl justify-center'>
                    <View>
                        <Text className='flex text-center italic'>
                            Sipariş ayrıntıları...
                        </Text>
                    </View>
                </View>
                <View className="gap-4 mb-5">
                    <Button size={Platform.select({ ios: 'lg', default: 'md' })} onPress={() => router.replace('/home')}>
                        <Text>Ana Sayfa</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView >
    );
}

/* const FEATURES = [
    {
        title: 'Kullanıcı Girişi',
        description: 'SAP hesabınıza kolayca giriş yapın ve panellerinize ulaşın',
        icon: 'account-circle-outline',
    },
   {
    title: 'Secure Messaging',
    description: 'Chat securely with friends and family in real-time.',
    icon: 'message-processing',
  },
   {
        title: 'Çapraz SAP Platformu',
        description: 'Sizin için özelleştirilmiş SAP panellerini kolaylıkla kullanın',
        icon: 'chart-timeline-variant',
    },
] as const;
 */