import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  Linking,
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
import NewsDetailScreen from './src/screens/NewsDetailScreen';
import CharityScreen from './src/screens/CharityScreen';
import CharityDetailScreen from './src/screens/CharityDetailScreen';
import DonationPaymentScreen from './src/screens/DonationPaymentScreen';
import DonationHistoryScreen from './src/screens/DonationHistoryScreen';
import DonationCertificateScreen from './src/screens/DonationCertificateScreen';
import EducationServiceScreen from './src/screens/EducationServiceScreen';
import CommunityServiceScreen from './src/screens/CommunityServiceScreen';
import JobDetailPage from './src/screens/JobDetailPage';
import {ApplicationProvider} from './src/context/ApplicationContext';

const {width} = Dimensions.get('window');

// 轮播图数据
const bannerData = [
  {
    id: '1',
    image: {
      uri: 'https://www.beijing.gov.cn/ywdt/zwzt/esjszqh/spjj/202407/W020240731542097860113.png',
    },
    link: 'https://www.beijing.gov.cn/ywdt/zwzt/esjszqh/spjj/202407/t20240731_3763622.html',
  },
  {
    id: '2',
    image: {
      uri: 'https://www.beijing.gov.cn/ywdt/zwzt/esjszqh/spjj/202407/W020240731525717267943.png',
    },
    link: 'https://www.beijing.gov.cn/ywdt/zwzt/esjszqh/spjj/202407/t20240731_3763565.html',
  },
  {
    id: '3',
    image: {
      uri: 'https://www.beijing.gov.cn/renwen/zt/ydbj/lbt/202204/W020220424369173527505.png',
    },
    link: 'news/3',
  },
  {
    id: '4',
    image: require('./assets/congress.jpg'),
    link: 'https://www.beijing.gov.cn/ywdt/zwzt/esjszqh/index.html',
  },
];

// 服务数据
const services = [
  {
    id: '1',
    icon: <Icon name="briefcase-search" size={30} color="#1890ff" />,
    name: '找工作',
  },
  {
    id: '2',
    icon: <Icon name="chart-bar" size={30} color="#52c41a" />,
    name: '数据分析',
  },
  {
    id: '3',
    icon: <Icon name="headphones-settings" size={30} color="#cf1322" />,
    name: '政府服务热线',
  },
  {
    id: '4',
    icon: <Icon name="heart-multiple" size={30} color="#eb2f96" />,
    name: '爱心公益',
  },
  {
    id: '5',
    icon: <Icon name="parking" size={30} color="#faad14" />,
    name: '停哪儿',
  },
  {
    id: '6',
    icon: <Icon name="robot" size={30} color="#13c2c2" />,
    name: 'AI便民',
  },
  {
    id: '7',
    icon: <Icon name="school" size={30} color="#722ed1" />,
    name: '教育服务',
  },
  {
    id: '8',
    icon: <Icon name="apps" size={30} color="#8c8c8c" />,
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
  NewsDetail: undefined;
  Charity: undefined;
  CharityDetail: undefined;
  DonationPayment: undefined;
  DonationHistory: undefined;
  DonationCertificate: undefined;
  EducationService: undefined;
  CommunityService: undefined;
  JobDetailPage: {job: any};
};

type NavigationProp = {
  navigate: (screen: string, params?: any) => void;
  reset: (state: any) => void;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 添加新闻数据
const newsData = [
  {
    id: '1',
    title: '北京智慧电竞赛事中心明年将举办100场顶级电竞大赛',
    summary:
      '每经AI快讯，12月22日，据北京亦庄官方微信消息，在日前举行的中国电竞节超级冠军杯开幕式上，《KPL王者荣耀职业联赛JDG俱乐部主场2025年正式落地北京智慧电竞赛事中心及JDG电子竞技中心全年赛事规划》正式发布。此次发布会，北京经开区科文融合企业京东星宇电竞（北京）文化传播有限公司创始人兼CEO叶靖波共发布两项计划。其中之一是"百赛计划"，即2025年在北京智慧电竞赛事中心将举办100场顶级电竞大赛，平均3.5天一场比赛，覆盖全终端、全头部电竞项目。每日经济新闻',
    image:
      'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1khopO.img?w=630&h=472&m=6',
    date: '2024-12-22',
    source: '每日经济新闻',
  },
  {
    id: '2',
    title: '北京中轴线拟开启融媒化展陈新模式',
    summary:
      '12月20日，北京中轴线 IP 融媒化呈现和阐释的全新发展契机，北京京企中轴线保护公益基金会与新华融合媒体科技发展（北京）有限公司合作，双方将运用前沿数字技术，共同探索其融媒化发展新路径，以期进一步提升北京中轴线的知名度和影响力，更为文化遗产的保护与传承开拓新思路、新模式...',
    image:
      'https://inews.gtimg.com/om_bt/OCgRhaqs9lLXkQQhk_TVWZfSRUWmn5WBuU9b6ASNWUBkYAA/641',
    date: '2024-03-24',
    source: '北青网',
  },
  // 可以添加更多新闻...
];

// 修改 HomeScreen 组件
const HomeScreen = ({navigation}: {navigation: NavigationProp}) => {
  const handleBannerPress = (link: string) => {
    if (link.startsWith('http')) {
      // 使用 Linking 打开外部链接
      Linking.openURL(link).catch(err => console.error('无法打开链接:', err));
    } else {
      // 内部导航
      navigation.navigate('NewsDetail', {id: link.split('/')[1]});
    }
  };

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
            onPress={() => handleBannerPress(item.link)}>
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
          case '爱心公益':
            navigation.navigate('Charity');
            break;
          case 'AI便民':
            navigation.navigate('AIService');
            break;
          case '更多服务':
            navigation.navigate('全部服务');
            break;
          case '教育服务':
            navigation.navigate('EducationService');
            break;
        }
      }}>
      <View style={styles.iconContainer}>{item.icon}</View>
      <Text style={styles.serviceName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderNewsItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.newsItem}
      onPress={() => navigation.navigate('NewsDetail', {news: item})}>
      <Image source={{uri: item.image}} style={styles.newsImage} />
      <View style={styles.newsContent}>
        <Text style={styles.newsTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.newsSummary} numberOfLines={2}>
          {item.summary}
        </Text>
        <View style={styles.newsFooter}>
          <Text style={styles.newsSource}>{item.source}</Text>
          <Text style={styles.newsDate}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={
        <>
          {renderBanner()}
          <View style={styles.serviceContainer}>
            <FlatList
              data={services}
              renderItem={renderServiceItem}
              numColumns={4}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
          <View style={styles.newsHeader}>
            <Text style={styles.newsHeaderTitle}>城市新闻</Text>
          </View>
        </>
      }
      data={newsData}
      renderItem={renderNewsItem}
      keyExtractor={item => item.id}
    />
  );
};

// 修改 AllServicesScreen 组件
const AllServicesScreen = () => <CommunityServiceScreen />;

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
    <ApplicationProvider>
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
          <Stack.Screen
            name="NewsDetail"
            component={NewsDetailScreen}
            options={{title: '新闻详情'}}
          />
          <Stack.Screen
            name="Charity"
            component={CharityScreen}
            options={{title: '爱心公益'}}
          />
          <Stack.Screen
            name="CharityDetail"
            component={CharityDetailScreen}
            options={{title: '项目详情'}}
          />
          <Stack.Screen
            name="DonationPayment"
            component={DonationPaymentScreen}
            options={{title: '捐款支付'}}
          />
          <Stack.Screen
            name="DonationHistory"
            component={DonationHistoryScreen}
            options={{title: '捐款记录'}}
          />
          <Stack.Screen
            name="DonationCertificate"
            component={DonationCertificateScreen}
            options={{title: '爱心证书'}}
          />
          <Stack.Screen
            name="EducationService"
            component={EducationServiceScreen}
            options={{
              title: '教育服务',
              headerTitleStyle: {
                color: '#333',
                fontSize: 18,
              },
            }}
          />
          <Stack.Screen
            name="CommunityService"
            component={EducationServiceScreen}
            options={{
              title: '教育服务',
              headerTitleStyle: {
                color: '#333',
                fontSize: 18,
              },
            }}
          />
          <Stack.Screen
            name="JobDetailPage"
            component={JobDetailPage}
            options={{
              title: '职位详情',
              headerTitleStyle: {
                color: '#333',
                fontSize: 18,
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

// 保持现有的样式定义不变，只需添加新的样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  bannerContainer: {
    height: 230,
  },
  bannerImage: {
    width: width,
    height: 230,
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  serviceContainer: {
    padding: 15,
    paddingBottom: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  newsHeader: {
    padding: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  newsHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  newsItem: {
    flexDirection: 'row',
    padding: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  newsImage: {
    width: 120,
    height: 90,
    borderRadius: 8,
  },
  newsContent: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  newsSummary: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  newsSource: {
    fontSize: 12,
    color: '#1890ff',
  },
  newsDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default App;
