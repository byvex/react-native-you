import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Ripple } from 'react-native-you';

export default function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <ScrollView>
        <View>
          <Ripple onPress={() => { }}>
            <Text>Ripple Text</Text>
          </Ripple>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}
