import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window');

// 轮播图数据
const bannerData = [
  {
    id: '1',
    image: {
      uri: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  },
  {
    id: '2',
    image: {
      uri: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  },
];

// 诉求分类数据
const categories = [
  {
    id: '1',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/2544/2544087.png'},
    name: '市政建设',
    priority: 1,
  },
  {
    id: '2',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/2544/2544122.png'},
    name: '环境保护',
    priority: 2,
  },
  {
    id: '3',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/2544/2544145.png'},
    name: '交通出行',
    priority: 3,
  },
  {
    id: '4',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/2544/2544163.png'},
    name: '教育医疗',
    priority: 4,
  },
  {
    id: '5',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/2544/2544089.png'},
    name: '社区服务',
    priority: 5,
  },
  {
    id: '6',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/2544/2544099.png'},
    name: '公共安全',
    priority: 6,
  },
  {
    id: '7',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/2544/2544105.png'},
    name: '文化体育',
    priority: 7,
  },
  {
    id: '8',
    icon: {uri: 'https://cdn-icons-png.flaticon.com/128/2544/2544129.png'},
    name: '其他诉求',
    priority: 8,
  },
];

// 我的诉求数据
const myComplaints = [
  {
    id: '1',
    title: '小区路灯不亮',
    department: '市政维修部门',
    submitTime: '2024-03-15 14:30',
    status: '处理中',
    completed: false,
  },
  {
    id: '2',
    title: '垃圾分类问题',
    department: '环保部门',
    submitTime: '2024-03-14 09:20',
    status: '已完成',
    completed: true,
  },
];

const GovernmentServiceScreen = ({navigation}) => {
  // 渲染轮播图
  const renderBanner = () => (
    <View style={styles.bannerContainer}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        height={200}
        dot={<View style={styles.dot} />}
        activeDot={<View style={styles.activeDot} />}>
        {bannerData.map(item => (
          <Image key={item.id} source={item.image} style={styles.bannerImage} />
        ))}
      </Swiper>
    </View>
  );

  // 渲染诉求分类
  const renderCategories = () => (
    <View style={styles.categoriesContainer}>
      <Text style={styles.sectionTitle}>市民诉求分类</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}>
        <View style={styles.categoriesPage}>
          {categories
            .sort((a, b) => a.priority - b.priority)
            .map(category => (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryItem}
                onPress={() => {
                  if (category.name === '其他诉求') {
                    navigation.navigate('NewComplaint');
                  } else {
                    navigation.navigate('ComplaintList', {
                      category: category.name,
                    });
                  }
                }}>
                <View style={styles.iconContainer}>
                  <Image source={category.icon} style={styles.icon} />
                </View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderBanner()}
      {renderCategories()}
      <View style={styles.complaintsContainer}>
        <Text style={styles.sectionTitle}>我的诉求</Text>
        <FlatList
          data={myComplaints.sort((a, b) =>
            a.completed === b.completed ? 0 : a.completed ? 1 : -1,
          )}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.complaintItem}
              onPress={() =>
                navigation.navigate('ComplaintDetail', {id: item.id})
              }>
              <Text style={styles.complaintTitle}>{item.title}</Text>
              <Text style={styles.complaintDepartment}>{item.department}</Text>
              <View style={styles.complaintFooter}>
                <Text style={styles.complaintTime}>{item.submitTime}</Text>
                <Text
                  style={[
                    styles.complaintStatus,
                    {color: item.completed ? '#52c41a' : '#1890ff'},
                  ]}>
                  {item.status}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          style={styles.complaintList}
        />
      </View>
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
  categoriesContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  categoriesScroll: {
    flexGrow: 0,
  },
  categoriesPage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: width - 30,
  },
  categoryItem: {
    width: (width - 30) / 4,
    alignItems: 'center',
    marginBottom: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 30,
    height: 30,
  },
  categoryName: {
    fontSize: 12,
    color: '#333',
  },
  complaintsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  complaintItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 15,
  },
  complaintTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  complaintDepartment: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  complaintFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  complaintTime: {
    fontSize: 12,
    color: '#999',
  },
  complaintStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  complaintList: {
    height: 300,
  },
});

export default GovernmentServiceScreen;
