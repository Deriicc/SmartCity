import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 模拟数据
const initialVehicles = [
  {
    id: '1',
    plateNumber: '京A12345',
    type: '小型轿车',
  },
  {
    id: '2',
    plateNumber: '京B67890',
    type: 'SUV',
  },
];

const MyVehiclesScreen = ({navigation}) => {
  const [vehicles, setVehicles] = useState(initialVehicles);

  const handleAddVehicle = () => {
    // 这里添加新车辆的逻辑
    Alert.alert('添加车辆', '跳转到添加车辆表单');
  };

  const renderVehicle = ({item}) => (
    <View style={styles.vehicleItem}>
      <Icon name="car" size={24} color="#1890ff" style={styles.vehicleIcon} />
      <View style={styles.vehicleInfo}>
        <Text style={styles.plateNumber}>{item.plateNumber}</Text>
        <Text style={styles.vehicleType}>{item.type}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddVehicle}>
        <Icon name="plus" size={24} color="#fff" />
        <Text style={styles.addButtonText}>添加我的车辆</Text>
      </TouchableOpacity>

      <FlatList
        data={vehicles}
        renderItem={renderVehicle}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1890ff',
    margin: 15,
    padding: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  list: {
    padding: 15,
  },
  vehicleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  vehicleIcon: {
    marginRight: 15,
  },
  vehicleInfo: {
    flex: 1,
  },
  plateNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  vehicleType: {
    fontSize: 14,
    color: '#666',
  },
});

export default MyVehiclesScreen;
