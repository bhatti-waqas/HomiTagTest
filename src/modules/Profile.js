import React from 'react';
import { StyleSheet,Button, View, Text } from 'react-native';

export default function ProfileScreen({ route ,navigation }) {
  const { otherParam } = route.params;
  const { itemId } = route.params;
  // const nameString

  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen</Text>
          <Text>itemId: {itemId}</Text>
          <Text>otherParam: {otherParam.item.name}</Text>
          <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
  );
}
