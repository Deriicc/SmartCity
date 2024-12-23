import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ParkingScreen from './ParkingScreen';
import ParkingDetailScreen from './ParkingDetailScreen';
import ParkingRecordsScreen from './ParkingRecordsScreen';
import MyVehiclesScreen from './MyVehiclesScreen';
import ParkingFeedbackScreen from './ParkingFeedbackScreen';

// 定义导航器参数类型
type ParkingStackParamList = {
  ParkingHome: undefined;
  ParkingDetail: {id: string};
  ParkingRecords: undefined;
  MyVehicles: undefined;
  ParkingFeedback: undefined;
};

const Stack = createNativeStackNavigator<ParkingStackParamList>();

// 明确定义为 React.FC 类型
const ParkingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ParkingHome"
      screenOptions={{
        headerShown: true,
      }}>
      <Stack.Screen
        name="ParkingHome"
        component={ParkingScreen}
        options={{
          title: '停哪儿',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ParkingDetail"
        component={ParkingDetailScreen}
        options={{
          title: '停车场详情',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ParkingRecords"
        component={ParkingRecordsScreen}
        options={{
          title: '停车记录',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="MyVehicles"
        component={MyVehiclesScreen}
        options={{
          title: '我的车辆',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="ParkingFeedback"
        component={ParkingFeedbackScreen}
        options={{
          title: '意见反馈',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default ParkingNavigator;
