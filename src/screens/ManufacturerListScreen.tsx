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
    name: '施耐德电器',
    description:
      '全球能效管理和自动化领域专家，为工业、基础设施、数据中心、楼宇和住宅市场提供整体解决方案',
    image: {
      uri: 'https://th.bing.com/th/id/R.137b1cbbc333eb2260841d61cbb847b9?rik=dAt9baJovaFClQ&riu=http%3a%2f%2fi1.qhimg.com%2ft01c93622f8963fb708.jpg&ehk=4WPah5soFP0v0POfFlbEeWILF96iXtMP174Wl%2f7AM9c%3d&risl=&pid=ImgRaw&r=0',
    },
    category: '自动化',
    location: '北京市',
  },
  {
    id: '6',
    name: '华为（Huawei）',
    description:
      '全球领先的ICT基础设施和智能终端提供商，在工业互联网和智能制造解决方案领域具有强大实力',
    image: {
      uri: 'https://bpic.588ku.com/video_listen_yay/video/12757_20230905104048_1.jpg',
    },
    category: '工业互联网',
    location: '深圳市',
  },
  {
    id: '7',
    name: '海尔卡奥斯（COSMOPlat）',
    description:
      '全球领先的工业互联网平台，提供智能制造整体解决方案，打造大规模定制化生产模式',
    image: {
      uri: 'https://tse2-mm.cn.bing.net/th/id/OIP-C.8826hZv8qSt6vEt4DkjiQwHaE7?rs=1&pid=ImgDetMain',
    },
    category: '工业互联网',
    location: '青岛市',
  },
  {
    id: '8',
    name: '新松机器人（SIASUN）',
    description:
      '中国最大的机器人上市公司，专注于工业机器人、协作机器人和智能装备的研发与制造',
    image: {
      uri: 'https://www.siasun.com/ueditor/php/upload/image/20170110/1484034103604655.jpg',
    },
    category: '机器人',
    location: '沈阳市',
  },
  {
    id: '9',
    name: '美的集团（Midea）',
    description:
      '全球领先的智能家居科技集团，在工业自动化和机器人领域持续创新，拥有库卡机器人等核心技术',
    image: {
      uri: 'https://ts1.cn.mm.bing.net/th/id/R-C.ffdbe8154dd6e24bf56a7d210e3c841f?rik=Ef3k%2fRh70bvWEg&riu=http%3a%2f%2fpro.statics.logoqs.techuangyi.com%2f2016%2f06%2f11%2f4820209a57cdc254c478fa6bee5c3c61.jpg&ehk=mkJ1aSKgsdoVLmHczSzlDsQk93z9Id6gdNHvqD9zhns%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1',
    },
    category: '智能制造',
    location: '佛山市',
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
