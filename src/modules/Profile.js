import React from 'react';
import { StyleSheet,Button, View, Text } from 'react-native';

export default function ProfileScreen({ route ,navigation }) {
  const { otherParam } = route.params;
  // const nameString

  return (

    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen</Text>
          <Text>itemId: {JSON.stringify(otherParam)}</Text>
          <Text>otherParam: {otherParam}</Text>
          <Button
            title="Go to Details... again"
            onPress={() =>
              navigation.push('Details', {
                itemId: Math.floor(Math.random() * 100),
              })
            }
          />
          <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
          <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
  );
}
