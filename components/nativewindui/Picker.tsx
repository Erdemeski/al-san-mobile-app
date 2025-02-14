import { Picker as RNPicker } from '@react-native-picker/picker';
import { View } from 'react-native';

import { cn } from '~/lib/cn';
import { useColorScheme } from '~/lib/useColorScheme';

export function Picker<T>({
  mode = 'dropdown',
  style,
  dropdownIconColor,
  dropdownIconRippleColor,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RNPicker<T>>) {
  const { colors, isDarkColorScheme } = useColorScheme();

  return (
    <View
      className={cn(
        'ios:shadow-sm ios:shadow-black/5 border-background bg-background rounded-xl border border-gray-300 dark:border-gray-600',
        className
      )}
      style={{
        paddingHorizontal: 0,
        paddingVertical: 0,
        backgroundColor: isDarkColorScheme ? '#1f2937' : colors.root,

      }}>
      <RNPicker
        mode={mode}
        style={[
          {
            color: isDarkColorScheme ? '#fff' : colors.foreground,
            borderRadius: 12, // Daha yumuşak köşeler
            borderWidth: 1, // Kenarlık ekleme
            borderColor: isDarkColorScheme ? '#4b5563' : '#d1d5db', // Dark/Light mode'a uygun border
            paddingHorizontal: 10,
            paddingVertical: 0,
          },
          style, // Eğer dışarıdan ekstra style verilirse, onu da uygula
        ]}
        dropdownIconColor={dropdownIconColor ?? colors.foreground}
        dropdownIconRippleColor={dropdownIconRippleColor ?? colors.foreground}
        {...props}
      />
    </View>
  );
}

export const PickerItem = RNPicker.Item;
