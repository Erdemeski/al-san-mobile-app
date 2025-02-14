import { router, useRouter } from 'expo-router';
import {
    Image,
    Platform,
    View,
    type ViewStyle,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    BackHandler,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import React, { useEffect, useRef, useState } from 'react';
import CustomTextInput from '~/components/CustomTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '~/store/authSlice';
import { RootState } from "~/store/store";
import { clearError } from '~/store/authSlice';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { DatePicker } from '~/components/nativewindui/DatePicker';
import { Picker, PickerItem } from '~/components/nativewindui/Picker';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { BottomSheetDraggableView, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useColorScheme } from '~/lib/useColorScheme';
import { useActionSheet } from '@expo/react-native-action-sheet';

const data = [
    { label: 'Item 1 skdhljsglksjgls', value: '1' },
    { label: 'Item 2sıduhgusdgoısdosgısogıosugıosdjgoısdjgsoıdpgjosıdjgıosdjgıosdjgpoısdgpıosdjgıosdjgıosdjgoısdgjıosdgjsoıdgjısodgjsodıgjsıdogjsdoıgjsdoıgjsdoıg', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
    { label: 'Item 9sıduhgusdgoısdosgısogıosugıosdjgoısdjgsoıdpgjosıdjgıosdjgıosdjgpoısdgpıosdjgıosdjgıosdjgoısdgjıosdgjsoıdgjısodgjsodıgjsıdogjsdoıgjsdoıgjsdoıg', value: '9' },
    { label: 'Item 10sıduhgusdgoısdosgısogıosugıosdjgoısdjgsoıdpgjosıdjgıosdjgıosdjgpoısdgpıosdjgıosdjgıosdjgoısdgjıosdgjsoıdgjısodgjsodıgjsıdogjsdoıgjsdoıgjsdoıg', value: '10' },
    { label: 'Item 11sıduhgusdgoısdosgısogıosugıosdjgoısdjgsoıdpgjosıdjgıosdjgıosdjgpoısdgpıosdjgıosdjgıosdjgoısdgjıosdgjsoıdgjısodgjsodıgjsıdogjsdoıgjsdoıgjsdoıg', value: '11' },
    { label: 'Item 12sıduhgusdgoısdosgısogıosugıosdjgoısdjgsoıdpgjosıdjgıosdjgıosdjgpoısdgpıosdjgıosdjgıosdjgoısdgjıosdgjsoıdgjısodgjsodıgjsıdogjsdoıgjsdoıgjsdoıg', value: '12' },
    { label: 'Item 13sıduhgusdgoısdosgısogıosugıosdjgoısdjgsoıdpgjosıdjgıosdjgıosdjgpoısdgpıosdjgıosdjgıosdjgoısdgjıosdgjsoıdgjısodgjsodıgjsıdogjsdoıgjsdoıgjsdoıg', value: '13' },
    { label: 'Item 14sıduhgusdgoısdosgısogıosugıosdjgoısdjgsoıdpgjosıdjgıosdjgıosdjgpoısdgpıosdjgıosdjgıosdjgoısdgjıosdgjsoıdgjısodgjsodıgjsıdogjsdoıgjsdoıgjsdoıg', value: '14' },
    { label: 'Item 15sıduhgusdgoısdosgısogıosugıosdjgoısdjgsoıdpgjosıdjgıosdjgıosdjgpoısdgpıosdjgıosdjgıosdjgoısdgjıosdgjsoıdgjısodgjsodıgjsıdogjsdoıgjsdoıgjsdoıg', value: '15' },
    { label: 'Item 16sıduhgusdgoısdosgısogıosugıosdjgoısdjgsoıdpgjosıdjgıosdjgıosdjgpoısdgpıosdjgıosdjgıosdjgoısdgjıosdgjsoıdgjısodgjsodıgjsıdogjsdoıgjsdoıgjsdoıg', value: '16' },
    { label: 'Item 17sıduhgusdgoısdosgısogıosugıosdjgoısdjgsoıdpgjosıdjgıosdjgıosdjgpoısdgpıosdjgıosdjgıosdjgoısdgjıosdgjsoıdgjısodgjsodıgjsıdogjsdoıgjsdoıgjsdoıg', value: '17' },
    { label: 'Item 18sıduhgusdgoısdosgısogıosugıosdjgoısdjgsoıdpgjosıdjgıosdjgıosdjgpoısdgpıosdjgıosdjgıosdjgoısdgjıosdgjsoıdgjısodgjsodıgjsıdogjsdoıgjsdoıgjsdoıg', value: '18' },
    { label: 'Item 19sıduhgusdgoısdosgısogıosugıosdjgoısdjgsoıdpgjosıdjgıosdjgıosdjgpoısdgpıosdjgıosdjgıosdjgoısdgjıosdgjsoıdgjısodgjsodıgjsıdogjsdoıgjsdoıgjsdoıg', value: '19' },
    { label: 'Item 20sıduhgusdgoısdosgısogıosugıosdjgoısdjgsoıdpgjosıdjgıosdjgıosdjgpoısdgpıosdjgıosdjgıosdjgoısdgjıosdgjsoıdgjısodgjsodıgjsıdogjsdoıgjsdoıgjsdoıg', value: '20' },

];

const siparisTurleri = [
    { label: "Standart Sipariş (ZS01)", value: "ZS01", color: "black" },
    { label: "Acil Sipariş (ZS02)", value: "ZS02", color: "black" },
    { label: "Silobaslı Sipariş (ZS03)", value: "ZS03", color: "black" },
    { label: "Lisanslı Depo Sip. (ZS04)", value: "ZS04", color: "black" },
    { label: "İhracat Siparişi (ZS05)", value: "ZS05", color: "black" },
    { label: "Transit Siparişi (ZS06)", value: "ZS06", color: "black" },
    { label: "Bedelsiz Numune Sip. (ZS07)", value: "ZS07", color: "black" },
    { label: "Tarım Siparişi (ZS08)", value: "ZS08", color: "black" },
    { label: "İade Alacak Dekontu (ZC01)", value: "ZC01", color: "black" },
    { label: "Alacak Dekontu (ZC02)", value: "ZC02", color: "black" },
    { label: "Borç Dekontu (ZD01)", value: "ZD01", color: "black" },
    { label: "İade Siparişi (ZR01)", value: "ZR01", color: "black" },
    { label: "İadeli amb.çekişi (ZR02)", value: "ZR02", color: "black" },
];

const odemeKosullari = [
    { label: "Hemen", value: "hemen", color: "black" },
    { label: "Vadeli", value: "vadeli", color: "black" },
];


const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function SatSipScreen() {
    /*     const router = useRouter();
    */
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.auth.token);
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    console.log("USER TOKEN: ", token);
    console.log("USER INFO: ", userInfo);
    const errorMessage = useSelector((state: RootState) => state.auth.error);
    const [dropdownValue, setDropdownValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    /*     const [sipTur, setSipTur] = React.useState('blue');
    */
    const [sipTur, setSipTur] = useState(siparisTurleri[0].value);
    const [date, setDate] = React.useState(new Date());

    const [odemeKosulu, setOdemeKosulu] = useState(odemeKosullari[0].value);

    const bottomSheetModalRef = useSheetRef();
    const { colors, isDarkColorScheme } = useColorScheme();

    /*     React.useEffect(() => {
     bottomSheetModalRef.current?.present();
     }, []);
     */

    const { showActionSheetWithOptions } = useActionSheet();

    const onAction = () => {
        const options = [/* 'Delete', */ 'Save', 'Cancel'];
/*         const destructiveButtonIndex = 0;
 */        const cancelButtonIndex = 2;

        showActionSheetWithOptions({
            options,
            cancelButtonIndex,
/*             destructiveButtonIndex
 */        }, (selectedIndex: number) => {
            switch (selectedIndex) {
                case 1:
                    // Save
                    break;

                /*                 case destructiveButtonIndex:
                                    // Delete
                                    break;
                 */
                case cancelButtonIndex:
                // Canceled
            }
        });
    }

    /*     useEffect(() => {
            dispatch(clearError()); // Sayfa her açıldığında hata temizlensin
        }, []);
        useEffect(() => {
            dispatch(clearError()); // Sayfa her açıldığında hata temizlensin
        }, [username, password]);
     */

    /*     const handleLogin = () => {
            if (!username || !password) {
                setError('Kullanıcı adı ve şifre gerekli!');
                return;
            }
    
            dispatch(clearError());
            dispatch(loginUser({ username, password }));
    
        };
     */
    /*     useEffect(() => {
            const backAction = () => {
                router.replace('/');
                return true;
            };
    
            const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
            return () => backHandler.remove(); // Component unmount olduğunda event listener'ı kaldır
        }, []);
     */
    const [selected, setSelected] = useState([]);
    const multiSelectModalRef = useSheetRef();

    return (
        <SafeAreaView style={ROOT_STYLE} edges={['bottom', "left", "right"]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={/* Platform.OS === 'ios' ? 100 : 0 */ 0}
                style={{ flex: 1, justifyContent: 'center' }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingTop: 0, minHeight: "100%", marginTop: 0 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className="mx-auto max-w-sm flex-1 justify-between gap-4 px-8 pt-4">
                            <View className="flex justify-center items-center py-16">
                                <Text variant="largeTitle" className="ios:text-left ios:font-black ios:text-3xl text-center font-bold">
                                    AL-SAN Meram Un
                                </Text>
                                <View className='flex flex-row'>
                                    <Image className="h-10 w-20" source={require('~/assets/SAP_logo.png')} />
                                    <Text variant="largeTitle" className="ios:text-left ios:font-black text-primary text-center font-bold text-sky-600 mt-0.5">
                                        Satış Siparişi
                                    </Text>
                                </View>
                                <Text variant="largeTitle" className="ios:text-left ios:font-black text-primary text-center font-bold text-sky-600 mt-0.5">
                                    Oluşturma Paneli
                                </Text>
                            </View>
                            <View className="w-full">

                                <View className='py-4'>
                                    <Text className="text-gray-700 dark:text-gray-200 mb-1">Sipariş Türü: </Text>
                                    <Picker
                                        selectedValue={sipTur}
                                        onValueChange={(itemValue) => setSipTur(itemValue)}
                                    >
                                        {siparisTurleri.map((item, index) => (
                                            <PickerItem
                                                key={index}
                                                label={item.label}
                                                value={item.value}
                                                color={item.color}
                                            />
                                        ))}
                                    </Picker>
                                </View>

                                <CustomTextInput
                                    label="Malı Teslim Alan: "
                                    value={username}
                                    onChangeText={setUsername}
                                    placeholder="Ad Soyad / Müş. No."
                                    error={error && !username ? error : undefined}
                                />
                                <View className='py-0'>
                                    <Text className="text-gray-700 dark:text-gray-200 mb-1">İstenilen Teslim Tarihi: </Text>
                                    <DatePicker
                                        value={date}
                                        mode="date"
                                        materialDateClassName=''
                                        onChange={(ev) => {
                                            setDate(new Date(ev.nativeEvent.timestamp));
                                        }}
                                    />
                                </View>
                                <View className='py-4'>
                                    <Text className="text-gray-700 dark:text-gray-200 mb-1">Ödeme Koşulu: </Text>
                                    <Picker
                                        selectedValue={odemeKosulu}
                                        onValueChange={(itemValue) => setOdemeKosulu(itemValue)}
                                    >
                                        {odemeKosullari.map((item, index) => (
                                            <PickerItem
                                                key={index}
                                                label={item.label}
                                                value={item.value}
                                                color={item.color}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                            <View className='h-0.5 min-w-full bg-gray-300 mb-2'></View>
                            <View>
                                <Text className="text-gray-700 dark:text-gray-200 mb-1">Kalemler: </Text>
                                <Button
                                    variant='secondary'
                                    className={`${isDarkColorScheme && Platform.OS === 'ios' ? 'text-white' : 'text-black'} ${isDarkColorScheme ? 'bg-[#1f2937] border-gray-600' : 'bg-white border-gray-300'}`}
                                    size={Platform.select({ ios: 'lg', default: 'lg' })}
                                    onPress={() => multiSelectModalRef.current?.present()}
                                >
                                    <Text variant="body" className='py-1'>Kalemleri Seçin</Text>
                                </Button>
                            </View>
                            <Sheet ref={multiSelectModalRef} snapPoints={[750]}>
                                <BottomSheetScrollView>
                                    <View
                                        className='mx-auto min-w-full min-h-[80vh] flex-1 justify-between gap-4 px-8 mt-8 pb-14'>
                                        <MultiSelect
                                            style={{
                                                height: 55,
                                                borderRadius: 12,
                                                backgroundColor: isDarkColorScheme ? '#1f2937' : colors.root,
                                                borderWidth: 1,
                                                marginBottom: 10,
                                                borderColor: isDarkColorScheme ? '#4b5563' : '#d1d5db',
                                            }}
                                            placeholderStyle={multi.placeholderStyle}
                                            selectedTextStyle={{
                                                fontSize: 14,
                                                color: isDarkColorScheme ? '#fff' : colors.foreground,
                                            }}
                                            inputSearchStyle={multi.inputSearchStyle}
                                            iconStyle={multi.iconStyle}
                                            search
                                            data={data}
                                            labelField="label"
                                            valueField="value"
                                            placeholder="Kalemleri Seçin"
                                            searchPlaceholder="Kalem Ara..."
                                            value={selected}
                                            onChange={item => {
                                                setSelected(item);
                                            }}
                                            renderLeftIcon={() => (
                                                <AntDesign
                                                    style={multi.icon}
                                                    color={`${isDarkColorScheme ? "lightgray" : "black"}`}
                                                    name="plussquareo"
                                                    size={20}
                                                />
                                            )}
                                            selectedStyle={{
                                                borderRadius: 12,
                                                backgroundColor: isDarkColorScheme ? '#1f2937' : colors.root,
                                                paddingHorizontal: 22,
                                                animationDelay: 'smooth',
                                            }}
                                        />
                                    </View>
                                </BottomSheetScrollView>
                            </Sheet>

                            <View className='min-h-screen bg-white dark:bg-gray-500 rounded-xl'>
                                <Text className='flex text-center pt-96'>
                                    Her bir kalem için ayrıntılar...
                                </Text>
                            </View>

                            <View className='mt-5'>
                                <Button
                                    variant='secondary'
                                    className={`${isDarkColorScheme && Platform.OS === 'ios' ? 'text-white' : 'text-black'}`}
                                    size={Platform.select({ ios: 'lg', default: 'md' })}
                                    onPress={() => bottomSheetModalRef.current?.present()}
                                >
                                    <Text variant="body">Sipariş ayrıntılarını görüntüle</Text>
                                </Button>
                            </View>
                            <Sheet ref={bottomSheetModalRef} snapPoints={[200]}>
                                <BottomSheetView className="flex-1 items-center justify-center pb-8">
                                    <Text className="text-foreground">Sipariş bilgileri henüz girilmedi!</Text>
                                </BottomSheetView>
                            </Sheet>
                            {errorMessage && (<View>
                                <Text className="text-red-500 text-center my-2">{errorMessage}</Text>
                            </View>
                            )}
                            <View className="gap-4 mb-40">
                                <Button size={Platform.select({ ios: 'lg', default: 'lg' })} onPress={onAction} >
                                    <Text variant="body">Oluştur</Text>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginVertical: 20,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});


const multi = StyleSheet.create({
    /*     container: { paddingVertical: 16 },
     */
    placeholderStyle: {
        fontSize: 16,
        color: '#9CA3AF',
    },
    iconStyle: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
        marginLeft: 10,
    },
});