import { Icon } from '@roninoss/icons';
import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { Linking, useWindowDimensions, View, Alert, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/nativewindui/Button';
import { useHeaderHeight } from '@react-navigation/elements';

import { Text } from '~/components/nativewindui/Text';
import { useColorScheme } from '~/lib/useColorScheme';
/* import { useHeaderSearchBar } from '~/lib/useHeaderSearchBar';
 */
cssInterop(FlashList, {
    className: 'style',
    contentContainerClassName: 'contentContainerStyle',
});

export default function Screen() {
    /*     const searchValue = useHeaderSearchBar({ hideWhenScrolling: COMPONENTS.length === 0 });
     */
    /*     const data = searchValue
            ? COMPONENTS.filter((c) => c.name.toLowerCase().includes(searchValue.toLowerCase()))
            : COMPONENTS; */
    const data = COMPONENTS;

    const headerHeight = useHeaderHeight();
    const insets = useSafeAreaInsets();


    return (
        <ScrollView
            style={{ paddingTop: headerHeight, paddingBottom: insets.bottom + 20 }}
        >
            <FlashList
                contentInsetAdjustmentBehavior="automatic"
                keyboardShouldPersistTaps="handled"
                data={data}
                estimatedItemSize={200}
                contentContainerClassName="py-4 android:pb-12"
                contentContainerStyle={{ paddingBottom: insets.bottom + 115 }}
                /*             extraData={searchValue}
                */
                removeClippedSubviews={false} // used for selecting text on android
                keyExtractor={keyExtractor}
                ItemSeparatorComponent={renderItemSeparator}
                renderItem={renderItem}
                ListEmptyComponent={COMPONENTS.length === 0 ? ListEmptyComponent : undefined}
            />
        </ScrollView>
    );
}

function ListEmptyComponent() {
    const insets = useSafeAreaInsets();
    const dimensions = useWindowDimensions();
    const headerHeight = useHeaderHeight();
    const { colors } = useColorScheme();
    const height = dimensions.height - headerHeight - insets.bottom - insets.top;

    return (
        <View style={{ height }} className="flex-1 items-center justify-center gap-1 px-12">
            <Icon name="file-plus-outline" size={42} color={colors.grey} />
            <Text variant="title3" className="pb-1 text-center font-semibold">
                No Components Installed
            </Text>
            <Text color="tertiary" variant="subhead" className="pb-4 text-center">
                You can install any of the free components from the{' '}
                <Text
                    onPress={() => Linking.openURL('https://nativewindui.com')}
                    variant="subhead"
                    className="text-primary">
                    NativeWindUI
                </Text>
                {' website.'}
            </Text>
        </View>
    );
}

type ComponentItem = { name: string; component: React.FC };

function keyExtractor(item: ComponentItem) {
    return item.name;
}

function renderItemSeparator() {
    return <View className="p-2" />;
}

function renderItem({ item }: { item: ComponentItem }) {
    return (
        <Card title={item.name}>
            <item.component />
        </Card>
    );
}

function Card({ children, title }: { children: React.ReactNode; title: string }) {
    return (
        <View className="px-4">
            <View className="gap-4 rounded-xl border border-border bg-card p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none">
                {/*                 <Text className="text-center text-sm font-medium tracking-wider opacity-60">{title}</Text>
 */}
                {children}
            </View>
        </View>
    );
}

const COMPONENTS: ComponentItem[] = [
    {
        name: 'Uygulama Ayarları',
        component: function TextExample() {
            return (
                <View className="gap-2">
                    <Text variant="largeTitle" className="text-center mb-6">
                        Uygulama Ayarları
                    </Text>
                    <View className="items-center">
                        <Icon name="cellphone" size={60} color="rgb(110, 110, 110)" />
                    </View>
                    <Text variant="callout" className="text-center mb-5">
                        Uygulama ayarlarına ulaşın.
                    </Text>

                    <Link href="/modal" asChild>
                        <Button size='lg'>
                            <Text>Ayarlar</Text>
                        </Button>
                    </Link>
                </View>
            );
        },
    },
];
