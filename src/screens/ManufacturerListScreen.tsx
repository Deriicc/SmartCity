import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 模拟数据
const manufacturers = [
  {
    id: '1',
    name: '智能科技有限公司',
    description: '专注于工业自动化解决方案',
    image: {
      uri: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg',
    },
    category: '自动化',
    location: '北京市',
  },
  {
    id: '2',
    name: '创新机器人公司',
    description: '工业机器人研发与制造',
    image: {
      uri: 'https://images.pexels.com/photos/1108102/pexels-photo-1108102.jpeg',
    },
    category: '机器人',
    location: '上海市',
  },
  {
    id: '3',
    name: '智慧工厂科技',
    description: '提供智能制造整体解决方案',
    image: {
      uri: 'https://images.pexels.com/photos/1108103/pexels-photo-1108103.jpeg',
    },
    category: '智能制造',
    location: '深圳市',
  },
];

const ManufacturerListScreen = ({navigation}) => {
  const renderManufacturer = ({item}) => (
    <TouchableOpacity
      style={styles.manufacturerItem}
      onPress={() => navigation.navigate('ManufacturerDetail', {id: item.id})}>
      <Image source={item.image} style={styles.manufacturerImage} />
      <View style={styles.manufacturerInfo}>
        <Text style={styles.manufacturerName}>{item.name}</Text>
        <Text style={styles.manufacturerDescription}>{item.description}</Text>
        <View style={styles.manufacturerDetails}>
          <View style={styles.detailItem}>
            <Icon name="tag" size={16} color="#666" />
            <Text style={styles.detailText}>{item.category}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="map-marker" size={16} color="#666" />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() =>
              navigation.navigate('ManufacturerJobs', {id: item.id})
            }>
            <Icon name="briefcase" size={16} color="#1890ff" />
            <Text style={styles.actionButtonText}>招聘信息</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('ProductList', {id: item.id})}>
            <Icon name="package-variant" size={16} color="#1890ff" />
            <Text style={styles.actionButtonText}>产品列表</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={manufacturers}
        renderItem={renderManufacturer}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 15,
  },
  manufacturerItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  manufacturerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  manufacturerInfo: {
    padding: 15,
  },
  manufacturerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  manufacturerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  manufacturerDetails: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  actionButtonText: {
    color: '#1890ff',
    marginLeft: 5,
    fontSize: 14,
  },
});

export default ManufacturerListScreen;
