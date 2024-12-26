import React, {useState, useEffect} from 'react';
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

// 轮播图数据
const bannerData = [
  {
    id: '1',
    image: {
      uri: 'https://www.beijing.gov.cn/shouye/sylbt/202410/W020241023629987198721.jpg',
    },
  },
  {
    id: '2',
    image: require('../../assets/government/image.png'),
  },
];

// 诉求分类数据
const categories = [
  {
    id: '1',
    icon: <Icon name="road-variant" size={28} color="#1890ff" />,
    name: '市政建设',
    priority: 1,
  },
  {
    id: '2',
    icon: <Icon name="leaf-circle" size={28} color="#52c41a" />,
    name: '环境保护',
    priority: 2,
  },
  {
    id: '3',
    icon: <Icon name="train-car" size={28} color="#722ed1" />,
    name: '交通出行',
    priority: 3,
  },
  {
    id: '4',
    icon: <Icon name="school" size={28} color="#eb2f96" />,
    name: '教育医疗',
    priority: 4,
  },
  {
    id: '5',
    icon: <Icon name="account-group" size={28} color="#fa8c16" />,
    name: '社区服务',
    priority: 5,
  },
  {
    id: '6',
    icon: <Icon name="security" size={28} color="#13c2c2" />,
    name: '公共安全',
    priority: 6,
  },
  {
    id: '7',
    icon: <Icon name="basketball" size={28} color="#2f54eb" />,
    name: '文化体育',
    priority: 7,
  },
  {
    id: '8',
    icon: <Icon name="comment-question" size={28} color="#595959" />,
    name: '其他诉求',
    priority: 8,
  },
];

const GovernmentServiceScreen = ({navigation}) => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const savedComplaints = await AsyncStorage.getItem('complaints');
        if (savedComplaints) {
          setComplaints(JSON.parse(savedComplaints));
        }
      } catch (error) {
        console.error('加载诉求失败:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadComplaints);
    loadComplaints();
    return unsubscribe;
  }, [navigation]);

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
                  navigation.navigate('ComplaintList', {
                    category: category.name,
                  });
                }}>
                <View style={styles.iconContainer}>{category.icon}</View>
                <Text style={styles.categoryName}>{category.name}</Text>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {renderBanner()}
      {renderCategories()}
      <View style={styles.complaintsContainer}>
        <Text style={styles.sectionTitle}>我的诉求</Text>
        {complaints.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.complaintItem}
            onPress={() =>
              navigation.navigate('ComplaintDetail', {complaintId: item.id})
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
        ))}
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
