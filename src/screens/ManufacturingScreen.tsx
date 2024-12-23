import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

// 轮播图数据
const bannerData = [
  {
    id: '1',
    image: {
      uri: 'https://images.pexels.com/photos/3846766/pexels-photo-3846766.jpeg',
    },
    title: '2024智能制造展',
  },
  {
    id: '2',
    image: {
      uri: 'https://images.pexels.com/photos/3846767/pexels-photo-3846767.jpeg',
    },
    title: '工业4.0展览会',
  },
];

// 推荐厂商数据
const manufacturers = [
  {
    id: '1',
    name: '智能科技有限公司',
    description: '专注于工业自动化解决方案',
    image: {
      uri: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg',
    },
    video: 'video_url_1',
  },
  {
    id: '2',
    name: '创新机器人公司',
    description: '工业机器人研发与制造',
    image: {
      uri: 'https://images.pexels.com/photos/1108102/pexels-photo-1108102.jpeg',
    },
    video: 'video_url_2',
  },
];

// 功能菜单数据
const menuItems = [
  {
    id: '1',
    name: '厂商列表',
    icon: 'factory',
    route: 'ManufacturerList',
  },
  {
    id: '2',
    name: '产品列表',
    icon: 'package-variant',
    route: 'ProductList',
  },
  {
    id: '3',
    name: '展会活动',
    icon: 'calendar-check',
    route: 'ExhibitionList',
  },
  {
    id: '4',
    name: '厂商招聘',
    icon: 'account-group',
    route: 'ManufacturerJobs',
  },
  {
    id: '5',
    name: '厂商入驻',
    icon: 'domain-plus',
    route: 'ManufacturerEntry',
  },
];

const ManufacturingScreen = ({navigation}) => {
  const renderBanner = () => (
    <View style={styles.bannerContainer}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        height={200}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}>
        {bannerData.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              navigation.navigate('ExhibitionDetail', {id: item.id})
            }>
            <Image source={item.image} style={styles.bannerImage} />
            <View style={styles.bannerTitleContainer}>
              <Text style={styles.bannerTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
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

  const renderManufacturer = ({item}) => (
    <TouchableOpacity
      style={styles.manufacturerItem}
      onPress={() => navigation.navigate('ManufacturerDetail', {id: item.id})}>
      <Image source={item.image} style={styles.manufacturerImage} />
      <View style={styles.manufacturerInfo}>
        <Text style={styles.manufacturerName}>{item.name}</Text>
        <Text style={styles.manufacturerDescription}>{item.description}</Text>
        <TouchableOpacity style={styles.videoButton}>
          <Icon name="play-circle" size={20} color="#1890ff" />
          <Text style={styles.videoButtonText}>观看视频</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {renderBanner()}

      <View style={styles.menuContainer}>
        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={item => item.id}
          numColumns={5}
          scrollEnabled={false}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>推荐厂商</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ManufacturerList')}>
            <Text style={styles.moreText}>查看更多</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={manufacturers}
          renderItem={renderManufacturer}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
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
  bannerTitleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  menuContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
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
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  moreText: {
    color: '#1890ff',
    fontSize: 14,
  },
  manufacturerItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  manufacturerImage: {
    width: 120,
    height: 120,
  },
  manufacturerInfo: {
    flex: 1,
    padding: 10,
  },
  manufacturerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  manufacturerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoButtonText: {
    color: '#1890ff',
    marginLeft: 5,
    fontSize: 14,
  },
});

export default ManufacturingScreen;
