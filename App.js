import React from 'react';
import { Animated, Dimensions, StatusBar, StyleSheet, TouchableHighlight, View, } from 'react-native';

const { width, height } = Dimensions.get("window")

export default function App() {
  const borderR = React.useState(new Animated.Value(0))[0]
  const opacity = React.useState(new Animated.Value(1))[0]
  const scaleS = React.useState(new Animated.ValueXY({ x: 0, y: 0 }))[0]
  const animation = React.useState(new Animated.Value(0))[0]
  const AnimWidthVal = React.useState(new Animated.ValueXY({ x: 100, y: 100 }))[0]

  const animateBall = () => {
    Animated.timing(borderR, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: false
    }).start()
  }
  const animateBallBack = () => {
    Animated.timing(borderR, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false
    }).start()
  }

  const opacityN = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false
    }).start(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }).start()
    })
  }

  const animateBallS = () => {
    Animated.timing(scaleS, {
      toValue: { x: 0, y: 200 },
      duration: 1000,
      useNativeDriver: false
    }).start()
  }
  const animateBallBackS = () => {
    Animated.timing(scaleS, {
      toValue: { x: 0, y: -200 },
      duration: 1000,
      useNativeDriver: false
    }).start()
  }

  const handleAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 333,
      useNativeDriver: false
    }).start(() => {
      Animated.timing(animation, {
        toValue: 2,
        duration: 333,
        useNativeDriver: false
      }).start(() => {
        Animated.timing(animation, {
          toValue: 3,
          duration: 333,
          useNativeDriver: false
        }).start()
      })
    })
  }
  const handleAnimationBack = () => {
    Animated.timing(animation, {
      toValue: 3,
      duration: 333,
      useNativeDriver: false
    }).start(() => {
      Animated.timing(animation, {
        toValue: 2,
        duration: 333,
        useNativeDriver: false
      }).start(() => {
        Animated.timing(animation, {
          toValue: 1,
          duration: 333,
          useNativeDriver: false
        }).start()
      })
    })
  }

  const AnimWidth = () => {
    Animated.timing(AnimWidthVal, {
      toValue: { x: Math.random() * width / 2.5 + 100, y: Math.random() * height / 2.5 + 10 },
      duration: 1000,
      useNativeDriver: false
    }).start()
  }

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["white", "red", "white", "blue"]
  })

  return (
    <View style={styles.screen}>
      <TouchableHighlight
        onPress={() => {
          AnimWidth(),
            animateBall(),
            animateBallS(),
            opacityN(),
            handleAnimation()
        }}
      >
        <View
          style={styles.screen1}
        />
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => {
          AnimWidth(),
            animateBallBack(),
            animateBallBackS(),
            opacityN(),
            handleAnimationBack()
        }}
      >
        <View
          style={styles.screen2}
        />
      </TouchableHighlight>
      <Animated.View
        style=
        {{
          position: 'absolute',
          width: AnimWidthVal.x,
          height: AnimWidthVal.y,
          borderRadius: borderR,
          opacity,
          backgroundColor: boxInterpolation,
          transform: [{ translateX: scaleS.x }, { translateY: scaleS.y }]
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
  },
  screen1: {
    backgroundColor: "blue",
    width,
    height: height / 2
  },
  screen2: {
    backgroundColor: "rgb(255,0,0)",
    width,
    height: height / 2
  }
})
