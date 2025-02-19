import { TextInput, Text, View } from 'react-native';

const CustomTextInput = ({
    style,
    label,
    error,
    value,
    placeholder,
    onChangeText,
    secureTextEntry = false,
    ...props
}: {
    style?: string,
    label?: string;
    error?: string;
    value: string;
    placeholder: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
}) => {
    return (
        <View className="w-full mb-4">
            {label && <Text className="text-gray-700 dark:text-gray-200 mb-1 text-base">{label}</Text>}
            <TextInput
                className={`flex-1 px-4 py-4 border rounded-xl text-base text-gray-900 dark:text-white bg-white dark:bg-gray-800 
          focus:border-blue-500 dark:focus:border-blue-400 
          ${error ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'}
          ${style && style}`}
                style={{ minWidth: '100%' }} // Ekranın tamamına yayılması için
                placeholderTextColor="#9CA3AF"
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                {...props} // Diğer opsiyonel props'ları da al
            />
            {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
        </View>
    );
};

export default CustomTextInput;
