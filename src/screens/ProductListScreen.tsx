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
    name: 'Modicon M580 ePAC控制器',
    description:
      '高性能可编程自动化控制器，支持EcoStruxure架构，适用于过程自动化和离散自动化',
    image: {
      uri: 'https://download.schneider-electric.com/files?p_Doc_Ref=Modicon_M580_range&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png',
    },
    category: '自动化控制器',
    manufacturer: '施耐德电气',
    price: '¥89,999',
  },
  {
    id: '2',
    name: 'EasyPact MVS',
    description:
      'EasyPact MVS是一款可应用于各种行业的低压配电空气断路器及隔离开关，性能安全可靠，功能齐全。包含2种规格尺寸，额定电流覆盖630A至4000A',
    image: {
      uri: 'https://download.schneider-electric.com/files?p_Doc_Ref=RNG_61227_main_image1&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png',
    },
    category: '空气断路器',
    manufacturer: '施耐德电气',
    price: '¥35,999',
  },
  {
    id: '3',
    name: 'EcoStruxure™ Mobility数字化移动运维系统',
    description:
      'EcoStructure Mobility数字化移动运维系统的系统架构是采用在控制区域内布置NFC智能标签，移动终端与移动运维服务器通过标准无线网络通信，移动终端的服务应用实现系统能源与资产管理。同时移动运维服务器与SCADA系统相连接，SCADA系统进行中央控制。',
    image: {
      uri: 'https://download.schneider-electric.com/files?p_Doc_Ref=IMG65399_main&p_File_Type=rendition_369_jpg&default_image=DefaultProductImage.png',
    },
    category: '电源系统',
    manufacturer: '施耐德电气',
    price: '¥128,000',
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
