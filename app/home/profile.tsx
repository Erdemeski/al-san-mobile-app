import { Icon } from '@roninoss/icons';
import { FlashList } from '@shopify/flash-list';
import { Link, /* router, */ useRouter } from 'expo-router';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { Linking, useWindowDimensions, View, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Button } from '~/components/nativewindui/Button';

import { Text } from '~/components/nativewindui/Text';
import { useColorScheme } from '~/lib/useColorScheme';
/* import { useHeaderSearchBar } from '~/lib/useHeaderSearchBar';
 */
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "~/store/store";
import { logoutUser } from "../../store/authSlice";
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


cssInterop(FlashList, {
    className: 'style',
    contentContainerClassName: 'contentContainerStyle',
});


export default function Screen() {
    const router = useRouter();
    /*     const searchValue = useHeaderSearchBar({ hideWhenScrolling: COMPONENTS.length === 0 });
    
    const data = searchValue
    ? COMPONENTS.filter((c) => c.name.toLowerCase().includes(searchValue.toLowerCase()))
    : COMPONENTS;
    */
    const data = COMPONENTS;

    const token = useSelector((state: RootState) => state.auth.token);
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    console.log("USER TOKEN: ", token);
    console.log("USER INFO: ", userInfo);

    const headerHeight = useHeaderHeight();
    const insets = useSafeAreaInsets();

    React.useEffect(() => {
        if (!token) {
            router.replace("/login"); // Kullanıcı giriş yapmadıysa giriş ekranına yönlendir
        }
    }, [token]);


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

function ProfileComponent() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    return (
        <>
            <View className="items-center gap-2">
                <View className="items-center">
                    <Icon name="account-circle" size={60} color="rgb(110, 110, 110)" />
                </View>
                <View className='justify-center flex flex-row mb-1'>
                    <Image className="h-6 w-12" source={require('~/assets/SAP_logo.png')} />
                    <Text variant="subhead" className="text-center font-semibold">
                        Kullanıcısı
                    </Text>
                </View>
                {/*             <Text variant="callout" className="text-center mb-5">
                {userInfo}
            </Text> */}
                {userInfo ? (
                    <>
                        <Text variant="callout" className="text-center">Hoşgeldin, {userInfo.name}!</Text>
                        <Text variant="footnote" className="text-center mb-5">{userInfo.email}</Text>
                    </>
                ) : (
                    <Text variant="callout" className="text-center mb-5 text-red-500">Kullanıcı bilgisi yok.</Text>
/*                 <Text className="text-md mt-2 text-red-500">Kullanıcı bilgisi yok.</Text>
 */            )}

                {/*             <TouchableOpacity
                className="mt-4 bg-red-500 px-4 py-2 rounded-lg"
                onPress={() => dispatch(logoutUser())}
            >
                <Text className="text-white font-bold">Çıkış Yap</Text>
            </TouchableOpacity>
 */}
            </View>
            <Button
                className="bg-red-500"
                size='lg'
                onPress={async () => {
                    dispatch(logoutUser());
                }}>
                <Text>Oturumdan Çık</Text>
            </Button>
        </>
    );
}

const COMPONENTS: ComponentItem[] = [
    {
        name: 'Profil',
        component: () => <ProfileComponent />,

/*         function TextExample() {
            return (
                <View className="gap-2">
                    <Text variant="largeTitle" className="text-center mb-6">
                        Profil
                    </Text>
                    <View className="items-center">
                        <Icon name="account-circle" size={60} color="rgb(110, 110, 110)" />
                    </View>
                    <Text variant="footnote" className="text-center">
                        Kullanıcı:
                    </Text>
                    <Text variant="callout" className="text-center mb-5">
                        {userInfo}
                    </Text>


                                         <Link href="/login" asChild>
                        <Button
                            size='lg'
                            onPress={async () => {
                                await AsyncStorage.removeItem("accessToken");

                                router.replace("/login");
                                dispatch(logoutUser());
                            }}>
                            <Text>Oturumdan Çık</Text>
                        </Button>
                    </Link>
 

                    <TouchableOpacity
                        className="mt-4 bg-red-500 px-4 py-2 rounded-lg"
                        onPress={() => dispatch(logoutUser())}
                    >
                        <Text className="text-white font-bold">Çıkış Yap</Text>
                    </TouchableOpacity>

                </View>
            );
        },
 */    },
];
