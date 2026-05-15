import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import NewReportScreen from '../screens/NewReportScreen';
import ReportsScreen from '../screens/ReportsScreen';
import EditReportScreen from '../screens/EditReportScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen
                name="Nova Denúncia"
                component={NewReportScreen}
                options={{ tabBarItemStyle: { display: 'none' } }}
            />
            <Tab.Screen name="Minhas Denúncias" component={ReportsScreen} />
            <Tab.Screen
                name="Editar Denúncia"
                component={EditReportScreen}
                options={{ tabBarItemStyle: { display: 'none' } }}
            />
        </Tab.Navigator>
    );
}