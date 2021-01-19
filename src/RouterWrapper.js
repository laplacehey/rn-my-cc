import React, {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator, CardStyleInterpolators, HeaderStyleInterpolators, TransitionSpecs} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {navigationRef, isReadyRef, setPreviousRouteName} from './RootNavigation'
import {View, Text} from 'react-native'
import {checkNavScreen} from './NavScreen'

const Tab = createBottomTabNavigator()
function RootTab(tabs = []) {
    return class extends React.Component {
        render() {
            return (
                <Tab.Navigator>
                    {tabs.map(({name, title, com}) => {
                        checkNavScreen(com, {name, title})
                        return (
                            <Tab.Screen
                                key={name}
                                name={name}
                                component={com}
                                options={{
                                    tabBarLabel: ({focused}) => {
                                        return (
                                            <View style={{flex: 1, justifyContent: 'center'}}>
                                                <Text style={{color: focused ? 'orange' : 'black'}}>{title}</Text>
                                            </View>
                                        )
                                    }
                                }}
                            />
                        )
                    })}
                </Tab.Navigator>
            )
        }
    }
}
const Stack = createStackNavigator()
export function useWrapper(screens) {
    const {tabs, stacks} = screens
    const RTab = RootTab(tabs)
    useEffect(() => {
        return () => {
            isReadyRef.current = false
        }
    }, [])
    return (
        <NavigationContainer
            ref={navigationRef}
            onReady={() => {
                isReadyRef.current = true
                setPreviousRouteName()
            }}
            onStateChange={navStateChanged}>
            <Stack.Navigator
                options={{
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    HeaderStyleInterpolators: HeaderStyleInterpolators.forFade,
                    transitionSpec: {
                        open: TransitionSpecs.TransitionIOSSpec,
                        close: TransitionSpecs.TransitionIOSSpec
                    }
                }}>
                <Stack.Screen name="rootTab" component={RTab} options={{headerShown: false}} />
                {stacks.map(({name, title, com}) => {
                    checkNavScreen(com, {name, title})
                    return (
                        <Stack.Screen
                            key={name}
                            name={name}
                            component={com}
                            options={{
                                title
                            }}
                        />
                    )
                })}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

function navStateChanged(e) {
    setPreviousRouteName()
}
