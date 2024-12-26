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
    image: require('../../assets/image1.png'),
    title: '2024世界智能制造博览会',
  },
  {
    id: '2',
    image: require('../../assets/image2.png'),
    title: '2024世界智能网联汽车大会（WICV）',
  },
];

// 推荐厂商数据
const manufacturers = [
  {
    id: '1',
    name: '施耐德电器',
    description:
      '全球能效管理和自动化领域专家，为工业、基础设施、数据中心、楼宇和住宅市场提供整体解决方案',
    image: {
      uri: 'https://th.bing.com/th/id/R.137b1cbbc333eb2260841d61cbb847b9?rik=dAt9baJovaFClQ&riu=http%3a%2f%2fi1.qhimg.com%2ft01c93622f8963fb708.jpg&ehk=4WPah5soFP0v0POfFlbEeWILF96iXtMP174Wl%2f7AM9c%3d&risl=&pid=ImgRaw&r=0',
    },
    video: 'video_url_1',
  },
  {
    id: '6',
    name: '华为（Huawei）',
    description:
      '全球领先的ICT基础设施和智能终端提供商，在工业互联网和智能制造解决方案领域具有强大实力',
    image: {
      uri: 'https://bpic.588ku.com/video_listen_yay/video/12757_20230905104048_1.jpg',
    },
    video: 'assets/video/huawei-smart-manufacturing.mp4',
  },
  {
    id: '7',
    name: '海尔卡奥斯（COSMOPlat）',
    description:
      '全球领先的工业互联网平台，提供智能制造整体解决方案，打造大规模定制化生产模式',
    image: {
      uri: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.8826hZv8qSt6vEt4DkjiQwHaE7?rs=1&pid=ImgDetMain',
    },
    video: 'assets/video/cosmoplat-platform.mp4',
  },
  {
    id: '8',
    name: '新松机器人（SIASUN）',
    description:
      '中国最大的机器人上市公司，专注于工业机器人、协作机器人和智能装备的研发与制造',
    image: {
      uri: 'https://www.siasun.com/ueditor/php/upload/image/20170110/1484034103604655.jpg',
    },
    video: 'assets/video/siasun-robots.mp4',
  },
  {
    id: '9',
    name: '美的集团（Midea）',
    description:
      '全球领先的智能家居科技集团，在工业自动化和机器人领域持续创新，拥有库卡机器人等核心技术',
    image: {
      uri: 'https://ts1.cn.mm.bing.net/th/id/R-C.ffdbe8154dd6e24bf56a7d210e3c841f?rik=Ef3k%2fRh70bvWEg&riu=http%3a%2f%2fpro.statics.logoqs.techuangyi.com%2f2016%2f06%2f11%2f4820209a57cdc254c478fa6bee5c3c61.jpg&ehk=mkJ1aSKgsdoVLmHczSzlDsQk93z9Id6gdNHvqD9zhns%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
    },
    video: 'assets/video/midea-automation.mp4',
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
