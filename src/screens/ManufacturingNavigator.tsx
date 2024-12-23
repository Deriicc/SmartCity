import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ManufacturingScreen from './ManufacturingScreen';
import ManufacturerListScreen from './ManufacturerListScreen';
import ProductListScreen from './ProductListScreen';
import ExhibitionListScreen from './ExhibitionListScreen';
import ManufacturerJobsScreen from './ManufacturerJobsScreen';
import ManufacturerEntryScreen from './ManufacturerEntryScreen';
import ExhibitionDetailScreen from './ExhibitionDetailScreen';
import ManufacturerDetailScreen from './ManufacturerDetailScreen';

const Stack = createNativeStackNavigator();

const ManufacturingNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ManufacturingHome"
        component={ManufacturingScreen}
        options={{title: '中国智造'}}
      />
      <Stack.Screen
        name="ManufacturerList"
        component={ManufacturerListScreen}
        options={{title: '厂商列表'}}
      />
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{title: '产品列表'}}
      />
      <Stack.Screen
        name="ExhibitionList"
        component={ExhibitionListScreen}
        options={{title: '展会活动'}}
      />
      <Stack.Screen
        name="ManufacturerJobs"
        component={ManufacturerJobsScreen}
        options={{title: '厂商招聘'}}
      />
      <Stack.Screen
        name="ManufacturerEntry"
        component={ManufacturerEntryScreen}
        options={{title: '厂商入驻'}}
      />
      <Stack.Screen
        name="ExhibitionDetail"
        component={ExhibitionDetailScreen}
        options={{title: '展会详情'}}
      />
      <Stack.Screen
        name="ManufacturerDetail"
        component={ManufacturerDetailScreen}
        options={{title: '厂商详情'}}
      />
    </Stack.Navigator>
  );
};

export default ManufacturingNavigator;
