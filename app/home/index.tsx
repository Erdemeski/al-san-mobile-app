import { Icon } from '@roninoss/icons';
import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { cssInterop } from 'nativewind';
import * as React from 'react';
import { Linking, useWindowDimensions, View, Alert, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '~/components/nativewindui/Button';

import { Text } from '~/components/nativewindui/Text';
import { useColorScheme } from '~/lib/useColorScheme';
import { useHeaderSearchBar } from '~/lib/useHeaderSearchBar';
import { useHeaderHeight } from '@react-navigation/elements';

cssInterop(FlashList, {
  className: 'style',
  contentContainerClassName: 'contentContainerStyle',
});

export default function Screen() {
  const searchValue = useHeaderSearchBar({ hideWhenScrolling: COMPONENTS.length === 0 });

  const data = searchValue
    ? COMPONENTS.filter((c) => c.name.toLowerCase().includes(searchValue.toLowerCase()))
    : COMPONENTS;

  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();



  return (
    <ScrollView
      style={{ paddingTop: headerHeight/* , paddingBottom: insets.bottom + 40 */ }}
    >
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        data={data}
        estimatedItemSize={200}
        contentContainerClassName="py-4 android:pb-12"
        contentContainerStyle={{ paddingBottom: insets.bottom + 115 }}
        extraData={searchValue}
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
        {/*         <Text className="text-center text-sm font-medium tracking-wider opacity-60">{title}</Text>
 */}
        {children}
      </View>
    </View>
  );
}

const COMPONENTS: ComponentItem[] = [
  {
    name: 'Satış Sipariş',
    component: function TextExample() {
      return (
        <View className="gap-2">
          <Text variant="largeTitle" className="text-center mb-6">
            Satış Sipariş
          </Text>
          <View className="items-center">
            <Icon name="cart" size={60} color="rgb(110, 110, 110)" />
          </View>
          <Text variant="callout" className="text-center mb-5">
            Satış siparişi oluşturma paneline ulaşın.
          </Text>

          <Link href="/services/satsip" asChild>
            <Button size='lg'>
              <Text>Hizmete Git</Text>
            </Button>
          </Link>
        </View>
      );
    },
  },
  {
    name: 'Sipariş Düzenleme',
    component: function TextExample() {
      return (
        <View className="gap-2">
          <Text variant="largeTitle" className="text-center mb-6">
            Sipariş Düzenleme
          </Text>
          <View className="items-center">
            <Icon name="book-open" size={60} color="rgb(110, 110, 110)" />
          </View>
          <Text variant="callout" className="text-center mb-5">
            Mevcut siparişinizi düzenleyin.
          </Text>

          <Link href="/services/sipduz" asChild>
            <Button disabled size='lg'>
              <Text>Hizmete Git</Text>
            </Button>
          </Link>
        </View>
      );
    },
  },
  {
    name: 'Sipariş Görüntüleme',
    component: function TextExample() {
      return (
        <View className="gap-2">
          <Text variant="largeTitle" className="text-center mb-6">
            Sipariş Görüntüleme
          </Text>
          <View className="items-center">
            <Icon name="archive-outline" size={60} color="rgb(110, 110, 110)" />
          </View>
          <Text variant="callout" className="text-center mb-5">
            Mevcut siparişlerinizi listeleyin.
          </Text>

          <Link href="/services/siplist" asChild>
            <Button disabled size='lg'>
              <Text>Hizmete Git</Text>
            </Button>
          </Link>
        </View>
      );
    },
  },
  {
    name: 'Diğer Hizmetler',
    component: function TextExample() {
      return (
        <View className="gap-2">
          <Text variant="largeTitle" className="text-center mb-6">
            Diğer Hizmetler
          </Text>
          <View className="items-center">
            <Icon name="bookshelf" size={60} color="rgb(110, 110, 110)" />
          </View>
          <Text variant="callout" className="text-center mb-5">
            ...
          </Text>

          <Link href="/modal" asChild>
            <Button disabled size='lg'>
              <Text>Hizmete Git</Text>
            </Button>
          </Link>
        </View>
      );
    },
  },


  /*   {
      name: 'Hizmet 1',
      component: function TextExample() {
        return (
          <View className="gap-2">
            <Text variant="largeTitle" className="text-center">
              Large Title
            </Text>
            <Text variant="title1" className="text-center">
              Title 1
            </Text>
            <Text variant="title2" className="text-center">
              Title 2
            </Text>
            <Text variant="title3" className="text-center">
              Title 3
            </Text>
            <Text variant="heading" className="text-center">
              Heading
            </Text>
            <Text variant="body" className="text-center">
              Body
            </Text>
            <Text variant="callout" className="text-center">
              Callout
            </Text>
            <Text variant="subhead" className="text-center">
              Subhead
            </Text>
            <Text variant="footnote" className="text-center">
              Footnote
            </Text>
            <Text variant="caption1" className="text-center">
              Caption 1
            </Text>
            <Text variant="caption2" className="text-center">
              Caption 2
            </Text>
          </View>
        );
      },
    },
    {
      name: 'Selectable Text',
      component: function SelectableTextExample() {
        return (
          <Text uiTextView selectable>
            Long press or double press this text
          </Text>
        );
      },
    },
   */
];
