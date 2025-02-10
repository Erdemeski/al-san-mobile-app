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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import React, { useEffect } from 'react';
import CustomTextInput from '~/components/CustomTextInput';

const ROOT_STYLE: ViewStyle = { flex: 1 };

export default function WelcomeConsentScreen() {
    const router = useRouter();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);

    const handleLogin = () => {
        if (!username || !password) {
            setError('Kullanıcı adı ve şifre gerekli!');
            return;
        }
        setError(null);
        router.replace('/home');
    };

    useEffect(() => {
        const backAction = () => {
            router.replace('/');
            return true;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove(); // Component unmount olduğunda event listener'ı kaldır
    }, []);

    return (
        <SafeAreaView style={ROOT_STYLE}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View className="mx-auto max-w-sm flex-1 justify-between gap-4 px-8 py-4">
                            <View className="flex justify-center items-center ios:pt-8 pt-8">
                                <Text variant="largeTitle" className="ios:text-left ios:font-black text-center font-bold">
                                    AL-SAN Meram Un
                                </Text>
                                <Text variant="largeTitle" className="ios:text-left ios:font-black text-primary text-center font-bold">
                                    SAP Giriş Ekranı
                                </Text>
                            </View>
                            <View className="w-full">
                                <CustomTextInput
                                    label="Kullanıcı Adı: "
                                    value={username}
                                    onChangeText={setUsername}
                                    placeholder="Kullanıcı adınızı girin"
                                    error={error && !username ? error : undefined}
                                />
                                <CustomTextInput
                                    label="Şifre: "
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Şifrenizi girin"
                                    secureTextEntry
                                    error={error && !password ? error : undefined}
                                />
                            </View>
                            <View className="gap-4 mb-40">
                                <Button size={Platform.select({ ios: 'lg', default: 'md' })} onPress={handleLogin}>
                                    <Text variant="body">Giriş Yap</Text>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
