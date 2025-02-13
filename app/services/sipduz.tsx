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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import React, { useEffect, useState } from 'react';
import CustomTextInput from '~/components/CustomTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '~/store/authSlice';
import { RootState } from "~/store/store";
import { clearError } from '~/store/authSlice';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { DatePicker } from '~/components/nativewindui/DatePicker';
import { Picker, PickerItem } from '~/components/nativewindui/Picker';
import { Sheet, useSheetRef } from '~/components/nativewindui/Sheet';
import { BottomSheetDraggableView, BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { useColorScheme } from '~/lib/useColorScheme';
import { useActionSheet } from '@expo/react-native-action-sheet';

const data = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    { label: 'Option 4', value: '4' },
    { label: 'Option 5', value: '5' },
    { label: 'Option 6', value: '6' },
    { label: 'Option 7', value: '7' },

];

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function SipDuzScreen() {
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
    const [picker, setPicker] = React.useState('blue');
    const [date, setDate] = React.useState(new Date());
    const { colors, isDarkColorScheme } = useColorScheme();

    const bottomSheetModalRef = useSheetRef();

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
                        <View className="mx-auto max-w-sm flex-1 justify-between gap-4 px-8 py-4">
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
                                Düzenleme Paneli
                                </Text>
                            </View>
                            <View className="w-full">
                                <CustomTextInput
                                    label="Layer 1: "
                                    value={username}
                                    onChangeText={setUsername}
                                    placeholder="Input 1"
                                    error={error && !username ? error : undefined}
                                    autoCapitalize="none"
                                />
                                <CustomTextInput
                                    label="Layer 2: "
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Input 2"
                                    error={error && !password ? error : undefined}
                                    autoCapitalize="none"
                                />
                                <View className='py-5'>

                                    <DatePicker
                                        value={date}
                                        mode="datetime"
                                        onChange={(ev) => {
                                            setDate(new Date(ev.nativeEvent.timestamp));
                                        }}
                                    />
                                </View>
                                <View className='py-5'>

                                    <Picker selectedValue={picker} onValueChange={(itemValue) => setPicker(itemValue)}>
                                        <PickerItem
                                            label="Red"
                                            value="red"
                                            color="red"
                                        />
                                        <PickerItem
                                            label="Blue"
                                            value="blue"
                                            color="blue"
                                        />
                                    </Picker>
                                </View>

                                <Dropdown
                                    style={[styles.dropdown, styles.container, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={data}
/*                                     search
 */                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? 'Select item' : '...'}
                                    searchPlaceholder="Search..."
                                    value={dropdownValue}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setDropdownValue(item.value);
                                        setIsFocus(false);
                                    }}
/*                                     renderLeftIcon={() => (
                                        <AntDesign
                                            style={styles.icon}
                                            color={isFocus ? 'blue' : 'black'}
                                            name="Safety"
                                            size={20}
                                        />
                                    )}
 */                                />
                                <Dropdown
                                    style={[styles.dropdown, styles.container, isFocus && { borderColor: 'blue' }]}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={data}
/*                                     search
 */                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder={!isFocus ? 'Select item' : '...'}
                                    searchPlaceholder="Search..."
                                    value={dropdownValue}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                    onChange={item => {
                                        setDropdownValue(item.value);
                                        setIsFocus(false);
                                    }}
                                    renderLeftIcon={() => (
                                        <AntDesign
                                            style={styles.icon}
                                            color={isFocus ? 'blue' : 'black'}
                                            name="Safety"
                                            size={20}
                                        />
                                    )}
                                />
                                <CustomTextInput
                                    label="Layer 2: "
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Input 2"
                                    error={error && !password ? error : undefined}
                                    autoCapitalize="none"
                                />
                                <CustomTextInput
                                    label="Layer 2: "
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Input 2"
                                    error={error && !password ? error : undefined}
                                    autoCapitalize="none"
                                />
                                <CustomTextInput
                                    label="Layer 2: "
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Input 2"
                                    error={error && !password ? error : undefined}
                                    autoCapitalize="none"
                                />
                            </View>
                            <Button
                                variant='secondary'
                                className={`${isDarkColorScheme && Platform.OS === 'ios' ? 'text-white' : 'text-black'}`}
                                size={Platform.select({ ios: 'lg', default: 'md' })}
                                onPress={() => bottomSheetModalRef.current?.present()}
                            >
                                <Text variant="body">Sipariş ayrıntılarını görüntüle</Text>
                            </Button>
                            <Sheet ref={bottomSheetModalRef} snapPoints={[200]}>
                                <BottomSheetView className="flex-1 items-center justify-center pb-8">
                                    <Text className="text-foreground">Sipariş bilgileri henüz girilmedi!</Text>
                                </BottomSheetView>
                            </Sheet>
                            {errorMessage && (<View>
                                <Text className="text-red-500 text-center mt-2">{errorMessage}</Text>
                            </View>
                            )}
                            <View className="gap-4 mb-40">
                                <Button size={Platform.select({ ios: 'lg', default: 'md' })} onPress={onAction} >
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