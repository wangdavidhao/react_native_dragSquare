import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StatusBar } from 'expo-status-bar';

const App = () => {

  const pan = useRef(new Animated.ValueXY()).current; //Initialization of the pan 

  //Creation of the pandResponder for each request of movement
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          { dx: pan.x, dy: pan.y }
        ],
        { useNativeDriver : false}
      ),
      onPanResponderRelease: () => {
        Animated.spring(            
            pan,         
            {
              toValue:{x:0,y:0},
              useNativeDriver : false
            }
        ).start();
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <StatusBar style="dark"/>
      <Text style={styles.titleText}>Try to drag the cube around !</Text>
      <Icon style={styles.arrowIcon} name="long-arrow-alt-down" size={30}/>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      >
        <View style={styles.cube} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color : '#bdc3c7',
    margin : 8,
  },
  arrowIcon : {
    margin : 15,
    color : '#bdc3c7',
  },
  cube: {
    height: 70,
    width: 70,
    backgroundColor: "#16a085",
    borderRadius: 25
  }
});

export default App;

