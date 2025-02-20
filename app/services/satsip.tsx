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
    TextInput,
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
    { label: 'Item 1', value: '1', unit: 'ADT', price: '10' },
    { label: 'Item 2', value: '2', unit: 'ADT', price: '12.5' },
    { label: 'Item 3', value: '3', unit: 'ADT', price: '15.7' },
    { label: 'Item 4', value: '4', unit: 'TON', price: '12000' },
    { label: 'Item 5', value: '5', unit: 'TON', price: '11500' },
    { label: 'Item 6', value: '6', unit: 'ADT', price: '50' },
    { label: 'Item 7', value: '7', unit: 'TON', price: '7000' },
    { label: 'Item 8', value: '8', unit: 'ADT', price: '630' },
    { label: 'Item 9', value: '9', unit: 'ADT', price: '90' },
    { label: 'Item 10', value: '10', unit: 'ADT', price: '5' },
    { label: 'Item 11', value: '11', unit: 'ADT', price: '213' },
    { label: 'Item 12', value: '12', unit: 'TON', price: '17041' },
    { label: 'Item 13', value: '13', unit: 'TON', price: '27010' },
    { label: 'Item 14', value: '14', unit: 'TON', price: '19010' },
    { label: 'Item 15', value: '15', unit: 'ADT', price: '190' },
    { label: 'Item 16', value: '16', unit: 'ADT', price: '430.4' },
    { label: 'Item 17', value: '17', unit: 'ADT', price: '110' },
    { label: 'Item 18', value: '18', unit: 'ADT', price: '130.9' },
    { label: 'Item 19', value: '19', unit: 'TON', price: '7840.3' },
    { label: 'Item 20', value: '20', unit: 'ADT', price: '100' },
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
    const [sipVerAd, setSipVerAd] = React.useState('');
    const [sipTeslimAd, setSipTeslimAd] = React.useState('');
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
                case 0:
                    router.replace('/success');
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
    console.log(selected);

    const [formData, setFormData] = useState({/*  selectedItems: {}  */ });
    console.log(formData);
    const [totalPrice, setTotalPrice] = useState(0);


    const handleSelectionChange = (items) => {
        // Eğer items string olarak geliyorsa, objeye dönüştür
        const selectedItems = items.map(item => {
            const foundItem = data.find(dataItem => dataItem.value === item);
            return foundItem ? foundItem : { label: item, value: item };
        });
        setSelected(selectedItems);

        // formData'yı güncelle
        const newFormData = {};
        selectedItems.forEach(item => {
            if (!formData[item.value]) {
                newFormData[item.value] = {
                    label: item.label,
                    price: parseFloat(item.price),  // Price'ı sayıya çevir
                    unit: item.unit,
                    quantity: '',
                    subtotal: 0 // Başlangıçta 0 olacak
                };
            } else {
                newFormData[item.value] = formData[item.value];
            }
        });
        setFormData(newFormData);
    };

    const handleQuantityChange = (value, itemValue) => {
        const quantity = parseFloat(value) || 0; // Sayıya çevir, geçersizse 0 yap
        setFormData(prevFormData => {
            const subtotal = parseFloat((prevFormData[itemValue].price * quantity).toFixed(2)); // 2 ondalık basamağa yuvarla

            const updatedData = {
                ...prevFormData,
                [itemValue]: {
                    ...prevFormData[itemValue],
                    quantity,
                    subtotal
                }
            };

            // Toplam fiyatı güncelle (toplam fiyatı da yuvarlayalım)
            const totalPrice = parseFloat(
                Object.values(updatedData).reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)
            );

            setTotalPrice(totalPrice); // Yeni toplam fiyatı state'e at

            return updatedData;
        });
    };

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
                                    label="Sipariş Veren: "
                                    value={sipVerAd}
                                    onChangeText={setSipVerAd}
                                    placeholder="Ad Soyad / Müş. No."
                                    error={error && !sipVerAd ? error : undefined}
                                />
                                <CustomTextInput
                                    label="Malı Teslim Alan: "
                                    value={sipTeslimAd}
                                    onChangeText={setSipTeslimAd}
                                    placeholder="Ad Soyad / Müş. No."
                                    error={error && !sipTeslimAd ? error : undefined}
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
                            <View className='h-0.5 min-w-full bg-gray-300 mb-2 rounded-full'></View>
                            <View className='mb-5'>
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
                                            value={selected.map(item => item.value)}
                                            onChange={handleSelectionChange}
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

                            {selected.length === 0 ? (
                                <>
                                    <View className='min-h-40 bg-white dark:bg-gray-500 rounded-xl justify-center'>
                                        <View>
                                            <Text className='flex text-center'>
                                                Henüz kalem seçilmedi!
                                            </Text>
                                        </View>
                                    </View>
                                </>
                            ) : (
                                <>
                                    <Text variant='title3' className="text-gray-700 dark:text-gray-300 flex text-center font-semibold">Kalem Ayrıntıları</Text>
                                    {selected.map(item => (
                                        <View key={item.value} className='flex flex-col min-h-32 bg-white dark:bg-gray-700 rounded-xl justify-center px-5 border border-gray-300 dark:border-gray-500 shadow-md'>
                                            <Text variant='title3' className='flex text-center mb-5 font-semibold'>{item.label}</Text>
                                            <CustomTextInput
                                                style='min-h-14 mb-3'
                                                label="Satış Miktarı: "
                                                value={formData[item.value]?.quantity || ''}
                                                onChangeText={(text) => handleQuantityChange(text, item.value)}
                                                keyboardType="numeric"
                                                placeholder="Adet"
                                            /*                                             error={error && !username ? error : undefined}
                                            */
                                            />
                                            <View className='mt-14'>
                                                <Text variant='body' className='flex text-center text-sm'>Birim: <Text variant='subhead' className='font-semibold'>{item.unit}</Text></Text>
                                                <Text variant='body' className='flex text-center text-sm'>Birim fiyatı: <Text variant='subhead' className='font-semibold'>{item.price}₺</Text></Text>
                                            </View>
                                        </View>
                                    ))}
                                </>
                            )}
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
                            <Sheet ref={bottomSheetModalRef} snapPoints={[500]}>
                                {Object.keys(formData).length > 0 && Object.values(formData).every(item => item.quantity > 0) ? (
                                    <BottomSheetScrollView>
                                        {/* className='mx-auto min-w-full min-h-[80vh] flex-1 justify-between gap-4 px-8 mt-8 pb-14' */}
                                        <View className="mx-auto min-w-full min-h-[40vh] flex-1 items-center justify-center pb-8">
                                            <Text variant='title1' className="text-gray-700 dark:text-gray-300 flex text-center font-semibold mb-5">
                                                Sipariş Özeti
                                            </Text>
                                            <Text className="text-foreground mb-10">
                                                <View className='flex'>
                                                    {Object.entries(formData).map(([key, value]) => (
                                                        <View key={key}>
                                                            <Text className='mb-3 mx-1' variant='subhead'>
                                                                {value.label}: <Text variant='heading'>{value.quantity}{" adet\n"}</Text>Fiyat: <Text variant='heading'>{value.subtotal}₺</Text>
                                                            </Text>
                                                            <View className='h-0.5 bg-gray-200 dark:bg-gray-50 mb-2 rounded-full'></View>
                                                        </View>
                                                    ))}
                                                    <Text variant='title1' className='mt-5'>Toplam Fiyat: <Text variant='title1' className='font-bold'>{totalPrice}₺</Text></Text>
                                                </View>
                                            </Text>
                                        </View>
                                    </BottomSheetScrollView>
                                ) : (
                                    <BottomSheetView className="flex-1 items-center justify-center pb-8 mx-4">
                                        <Text className="text-foreground">Sipariş bilgileri henüz tamamlanmadı, lütfen kalem detaylarını doldurun!</Text>
                                    </BottomSheetView>
                                )}
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
                    </ScrollView >
                </TouchableWithoutFeedback >
            </KeyboardAvoidingView >
        </SafeAreaView >
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