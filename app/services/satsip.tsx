import { useRouter } from 'expo-router';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import React, { useEffect } from 'react';
import CustomTextInput from '~/components/CustomTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '~/store/authSlice';
import { RootState } from "~/store/store";
import { clearError } from '~/store/authSlice';



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
        <SafeAreaView style={ROOT_STYLE}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className="mx-auto max-w-sm flex-1 justify-between gap-4 px-8 py-4">
                            <View className="flex justify-center items-center ios:pt-8 pt-8">
                                <Text variant="largeTitle" className="ios:text-left ios:font-black text-center font-bold">
                                    AL-SAN Meram Un
                                </Text>
                                <View className='flex flex-row'>
                                    <Image className="h-10 w-20" source={require('~/assets/SAP_logo.png')} />
                                    <Text variant="largeTitle" className="ios:text-left ios:font-black text-primary text-center font-bold text-sky-600 mt-0.5">
                                        Satış Siparişi
                                    </Text>
                                </View>
                                <Text variant="largeTitle" className="ios:text-left ios:font-black text-primary text-center font-bold text-sky-600 mt-0.5">
                                    Paneli
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
                            </View>
                            {errorMessage && (<View>
                                <Text className="text-red-500 text-center mt-2">{errorMessage}</Text>
                            </View>
                            )}
                            <View className="gap-4 mb-40">
                                <Button disabled size={Platform.select({ ios: 'lg', default: 'md' })} /* onPress={handleLogin} */>
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
