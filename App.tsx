import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PersonalInfoScreen from './src/screens/PersonalInfoScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import FeedbackScreen from './src/screens/FeedbackScreen';
import JobNavigator from './src/screens/JobScreen';
import AnalysisScreen from './src/screens/AnalysisScreen';
import GovernmentServiceScreen from './src/screens/GovernmentServiceScreen';
import ComplaintListScreen from './src/screens/ComplaintListScreen';
import ComplaintDetailScreen from './src/screens/ComplaintDetailScreen';
import NewComplaintScreen from './src/screens/NewComplaintScreen';
import ManufacturingNavigator from './src/screens/ManufacturingNavigator';
import ParkingNavigator from './src/screens/ParkingNavigator';
import AIServiceScreen from './src/screens/AIServiceScreen';

const {width} = Dimensions.get('window');

// 轮播图数据
const bannerData = [
  {
    id: '1',
    image: {
      uri: 'https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    link: 'news/1',
  },
  {
    id: '2',
    image: {
      uri: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    link: 'news/2',
  },
  {
    id: '3',
    image: {
      uri: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    link: 'news/3',
  },
  {
    id: '4',
    image: {
      uri: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    link: 'news/3',
  },
];

// 服务数据
const services = [
  {
    id: '1',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/3209/3209265.png'},
    name: '找工作',
  },
  {
    id: '2',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/2936/2936690.png'},
    name: '数据分析',
  },
  {
    id: '3',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/1052/1052906.png'},
    name: '政府服务热线',
  },
  {
    id: '4',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/3349/3349595.png'},
    name: '爱心公益',
  },

  {
    id: '5',
    icon: {
      uri: 'https://web.uri.edu/transportation/wp-content/uploads/sites/834/AMP-logo-500x500.png',
    },
    name: '停哪儿',
  },
  {
    id: '6',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/3349/3349595.png'},
    name: 'AI便民',
  },
  {
    id: '7',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/3349/3349595.png'},
    name: '爱心公益',
  },
  {
    id: '8',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/2976/2976215.png'},
    name: '更多服务',
  },
];

// Add these interfaces at the top of the file, after the imports
interface ServiceItem {
  id: string;
  icon: any; // or more specifically: ImageSourcePropType from react-native
  name: string;
}

type RootStackParamList = {
  Login: undefined;
  MainApp: undefined;
  PersonalInfo: undefined;
  ChangePassword: undefined;
  Feedback: undefined;
  Job: undefined;
  GovernmentService: undefined;
  ComplaintList: undefined;
  ComplaintDetail: undefined;
  NewComplaint: undefined;
  AllServices: undefined;
  Parking: {
    screen?: string;
    params?: any;
  };
  AIService: undefined;
};

type NavigationProp = {
  navigate: (screen: string, params?: any) => void;
  reset: (state: any) => void;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 将现有组件重命名为 HomeScreen
const HomeScreen = ({navigation}: {navigation: NavigationProp}) => {
  const renderBanner = () => (
    <View style={styles.bannerContainer}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        height={200}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}
        showsPagination={true}>
        {bannerData.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('NewsDetail', {id: item.id})}>
            <Image
              source={item.image}
              style={styles.bannerImage}
              onError={error => console.log('Image loading error:', error)}
              defaultSource={{
                uri: 'https://via.placeholder.com/800x400?text=Loading...',
              }}
            />
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );

  const renderServiceItem = ({item}: {item: ServiceItem}) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => {
        switch (item.name) {
          case '找工作':
            navigation.navigate('Job');
            break;
          case '政府服务热线':
            navigation.navigate('GovernmentService');
            break;
          case '停哪儿':
            navigation.navigate('Parking', {
              screen: 'ParkingHome',
            });
            break;
          case '数据分析':
            navigation.navigate('数据分析');
            break;
          case '更多服务':
            navigation.navigate('AllServices');
            break;
          case 'AI便民':
            navigation.navigate('AIService');
            break;
        }
      }}>
      <View style={styles.iconContainer}>
        <Image source={item.icon} style={styles.icon} />
      </View>
      <Text style={styles.serviceName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderBanner()}
      <FlatList
        data={services}
        renderItem={renderServiceItem}
        numColumns={4}
        keyExtractor={item => item.id}
        style={styles.serviceGrid}
      />
    </View>
  );
};

// 其他页面的基本组件
const AllServicesScreen = () => (
  <View style={styles.container}>
    <Text>全部服务</Text>
  </View>
);

// 将现有的 Tab.Navigator 封装为 MainApp 组件
const MainApp = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          switch (route.name) {
            case '首页':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case '全部服务':
              iconName = focused ? 'apps' : 'apps-box';
              break;
            case '中国智造':
              iconName = focused ? 'factory' : 'factory';
              break;
            case '数据分析':
              iconName = focused ? 'chart-bar' : 'chart-bar';
              break;
            case '个人中心':
              iconName = focused ? 'account' : 'account-outline';
              break;
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1890ff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}>
      <Tab.Screen name="首页" component={HomeScreen} />
      <Tab.Screen name="全部服务" component={AllServicesScreen} />
      <Tab.Screen
        name="中国智造"
        component={ManufacturingNavigator}
        options={{headerShown: false}}
      />
      <Tab.Screen name="数据分析" component={AnalysisScreen} />
      <Tab.Screen name="个人中心" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// 修改主 App 组件
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: true}}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainApp"
          component={MainApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PersonalInfo"
          component={PersonalInfoScreen}
          options={{title: '个人信息'}}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{title: '修改密码'}}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedbackScreen}
          options={{title: '意见反馈'}}
        />
        <Stack.Screen
          name="Job"
          component={JobNavigator}
          options={{title: '找工作'}}
        />
        <Stack.Screen
          name="GovernmentService"
          component={GovernmentServiceScreen}
          options={{title: '政府服务热线'}}
        />
        <Stack.Screen
          name="ComplaintList"
          component={ComplaintListScreen}
          options={{title: '诉求列表'}}
        />
        <Stack.Screen
          name="ComplaintDetail"
          component={ComplaintDetailScreen}
          options={{title: '诉求详情'}}
        />
        <Stack.Screen
          name="NewComplaint"
          component={NewComplaintScreen}
          options={{title: '新建诉求'}}
        />
        <Stack.Screen
          name="AllServices"
          component={AllServicesScreen}
          options={{title: '全部服务'}}
        />
        <Stack.Screen
          name="Parking"
          component={ParkingNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AIService"
          component={AIServiceScreen}
          options={{title: 'AI便民'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// 保持现有的样式定义不变，只需添加新的样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    height: 200,
  },
  bannerImage: {
    width: width,
    height: 200,
    resizeMode: 'cover',
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,.3)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
  },
  serviceGrid: {
    padding: 15,
  },
  serviceItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
  serviceName: {
    fontSize: 12,
    color: '#333',
  },
});

export default App;
