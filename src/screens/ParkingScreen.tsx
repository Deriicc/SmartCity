import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

// 轮播图数据
const bannerData = [
  {
    id: '1',
    image: {
      uri: 'https://images.pexels.com/photos/1756957/pexels-photo-1756957.jpeg',
    },
  },
  {
    id: '2',
    image: {
      uri: 'https://images.pexels.com/photos/1756958/pexels-photo-1756958.jpeg',
    },
  },
];

// 停车场数据
const parkingLots = [
  {
    id: '1',
    name: '中央广场停车场',
    address: '市中心中央广场地下一层',
    distance: '500m',
    availableSpots: 45,
    totalSpots: 200,
    image: {
      uri: 'https://images.pexels.com/photos/1000633/pexels-photo-1000633.jpeg',
    },
  },
  {
    id: '2',
    name: '商业中心停车场',
    address: '商业中心B区负一层',
    distance: '800m',
    availableSpots: 20,
    totalSpots: 150,
    image: {
      uri: 'https://images.pexels.com/photos/1000634/pexels-photo-1000634.jpeg',
    },
  },
];

// 添加菜单数据
const menuItems = [
  {
    id: '1',
    name: '停车记录',
    icon: 'car-clock',
    route: 'ParkingRecords',
  },
  {
    id: '2',
    name: '我的车辆',
    icon: 'car',
    route: 'MyVehicles',
  },
  {
    id: '3',
    name: '意见反馈',
    icon: 'message-text',
    route: 'ParkingFeedback',
  },
];

interface ParkingScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
    goBack: () => void;
  };
}

const ParkingScreen = ({navigation}: ParkingScreenProps) => {
  const [searchText, setSearchText] = useState('');
  const [parkingData, setParkingData] = useState(parkingLots);

  const handleSearch = () => {
    const filteredData = parkingLots.filter(lot =>
      lot.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setParkingData(filteredData);
  };

  const renderParkingLot = ({item}) => (
    <TouchableOpacity
      style={styles.parkingItem}
      onPress={() => navigation.navigate('ParkingDetail', {id: item.id})}>
      <Image source={item.image} style={styles.parkingImage} />
      <View style={styles.parkingInfo}>
        <Text style={styles.parkingName}>{item.name}</Text>
        <Text style={styles.parkingAddress}>{item.address}</Text>
        <View style={styles.parkingDetails}>
          <Text style={styles.parkingDistance}>{item.distance}</Text>
          <Text style={styles.parkingSpots}>
            空位: {item.availableSpots}/{item.totalSpots}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderMenuItem = ({item}) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.route)}>
      <View style={styles.menuIconContainer}>
        <Icon name={item.icon} size={24} color="#1890ff" />
      </View>
      <Text style={styles.menuText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* 轮播图 */}
      <View style={styles.bannerContainer}>
        <Swiper
          autoplay
          autoplayTimeout={3}
          height={200}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}>
          {bannerData.map(item => (
            <Image
              key={item.id}
              source={item.image}
              style={styles.bannerImage}
            />
          ))}
        </Swiper>
      </View>

      {/* 搜索栏 */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="搜索停车场"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="magnify" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* 功能菜单 */}
      <View style={styles.menuContainer}>
        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id}
          numColumns={4}
          scrollEnabled={false}
        />
      </View>

      {/* 停车场列表 */}
      <FlatList
        data={parkingData}
        renderItem={renderParkingLot}
        keyExtractor={item => item.id}
        style={styles.parkingList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  searchContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1890ff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  parkingList: {
    padding: 15,
  },
  parkingItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  parkingImage: {
    width: 120,
    height: 120,
  },
  parkingInfo: {
    flex: 1,
    padding: 10,
  },
  parkingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  parkingAddress: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  parkingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parkingDistance: {
    fontSize: 12,
    color: '#1890ff',
  },
  parkingSpots: {
    fontSize: 12,
    color: '#52c41a',
  },
  menuContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuText: {
    fontSize: 12,
    color: '#666',
  },
});

export default ParkingScreen;
