import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

// 使用与主页面相同的数据
const parkingLots = [
  {
    id: '1',
    name: '中央广场停车场',
    address: '市中心中央广场地下一层',
    distance: '500m',
    availableSpots: 45,
    totalSpots: 200,
    price: '8元/小时',
    image: {
      uri: 'https://images.pexels.com/photos/1000633/pexels-photo-1000633.jpeg',
    },
    description: '地下停车场，24小时营业，配备充电桩',
  },
  {
    id: '2',
    name: '商业中心停车场',
    address: '商业中心B区负一层',
    distance: '800m',
    availableSpots: 20,
    totalSpots: 150,
    price: '10元/小时',
    image: {
      uri: 'https://images.pexels.com/photos/1000634/pexels-photo-1000634.jpeg',
    },
    description: '室内停车场，配备智能导航系统',
  },
];

interface ParkingDetailScreenProps {
  navigation: {
    navigate: (screen: string) => void;
    goBack: () => void;
  };
  route: {
    params: {
      id: string;
    };
  };
}

const ParkingDetailScreen = ({navigation, route}: ParkingDetailScreenProps) => {
  const {id} = route.params;
  const parkingLot = parkingLots.find(lot => lot.id === id);

  if (!parkingLot) {
    return (
      <View style={styles.container}>
        <Text>未找到停车场信息</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={parkingLot.image} style={styles.image} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{parkingLot.name}</Text>
          <View style={styles.infoRow}>
            <Icon name="map-marker" size={20} color="#666" />
            <Text style={styles.address}>{parkingLot.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="map-marker-distance" size={20} color="#666" />
            <Text style={styles.distance}>{parkingLot.distance}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="currency-cny" size={20} color="#666" />
            <Text style={styles.price}>{parkingLot.price}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="car" size={20} color="#666" />
            <Text style={styles.spots}>
              空位: {parkingLot.availableSpots}/{parkingLot.totalSpots}
            </Text>
          </View>
          <Text style={styles.description}>{parkingLot.description}</Text>
        </View>
      </ScrollView>

      {/* 底部按钮 */}
      <View style={styles.bottomButtons}>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={() =>
            navigation.navigate('Navigation', {id: parkingLot.id})
          }>
          <Icon name="navigation" size={24} color="#fff" />
          <Text style={styles.buttonText}>导航</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.recordButton}
          onPress={() => navigation.navigate('ParkingRecords')}>
          <Icon name="history" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: width,
    height: width * 0.75,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 15,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  distance: {
    fontSize: 16,
    color: '#1890ff',
    marginLeft: 10,
  },
  price: {
    fontSize: 16,
    color: '#f50',
    marginLeft: 10,
  },
  spots: {
    fontSize: 16,
    color: '#52c41a',
    marginLeft: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    lineHeight: 20,
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navigationButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#1890ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    gap: 8,
  },
  recordButton: {
    width: 50,
    height: 50,
    backgroundColor: '#52c41a',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ParkingDetailScreen;
