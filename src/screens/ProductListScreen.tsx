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

interface Product {
  id: string;
  name: string;
  description: string;
  image: {uri: string};
  category: string;
  manufacturer: string;
  price: string;
}

interface NavigationProps {
  navigate: (screen: string, params?: any) => void;
}

// 模拟数据
const products: Product[] = [
  {
    id: '1',
    name: '智能工业机器人',
    description: '六轴工业机器人，适用于各类工业自动化生产线',
    image: {
      uri: 'https://images.pexels.com/photos/2085832/pexels-photo-2085832.jpeg',
    },
    category: '工业机器人',
    manufacturer: '智能科技有限公司',
    price: '¥299,999',
  },
  {
    id: '2',
    name: 'AGV物流机器人',
    description: '智能物流搬运机器人，可自主导航和路径规划',
    image: {
      uri: 'https://images.pexels.com/photos/2085833/pexels-photo-2085833.jpeg',
    },
    category: '物流机器人',
    manufacturer: '创新机器人公司',
    price: '¥159,999',
  },
  {
    id: '3',
    name: '智能生产线系统',
    description: '全自动化生产线解决方案，包含控制系统和执行设备',
    image: {
      uri: 'https://images.pexels.com/photos/2085834/pexels-photo-2085834.jpeg',
    },
    category: '自动化系统',
    manufacturer: '智慧工厂科技',
    price: '¥999,999',
  },
];

const ProductListScreen = ({navigation}: {navigation: NavigationProps}) => {
  const renderProduct = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetail', {id: item.id})}>
      <Image source={item.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <View style={styles.productDetails}>
          <View style={styles.detailItem}>
            <Icon name="tag" size={16} color="#666" />
            <Text style={styles.detailText}>{item.category}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="factory" size={16} color="#666" />
            <Text style={styles.detailText}>{item.manufacturer}</Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{item.price}</Text>
          <TouchableOpacity
            style={styles.contactButton}
            onPress={() =>
              navigation.navigate('ManufacturerDetail', {
                id: item.id,
                tab: 'contact',
              })
            }>
            <Text style={styles.contactButtonText}>联系厂商</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
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
  productItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 15,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  productDetails: {
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
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f50',
  },
  contactButton: {
    backgroundColor: '#1890ff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ProductListScreen;
