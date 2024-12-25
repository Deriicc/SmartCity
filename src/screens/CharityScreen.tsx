import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

// 定义项目状态类型
type ProjectStatus = '发起' | '审核' | '募款' | '执行' | '结束';

// 定义项目接口
interface CharityProject {
  id: string;
  title: string;
  image: string;
  targetAmount: number;
  currentAmount: number;
  status: ProjectStatus;
  description: string;
  startDate: string;
  endDate: string;
  donorCount: number;
  category: string;
}

// 示例数据
const charityProjects: CharityProject[] = [
  {
    id: '1',
    title: '贫困孤儿助养',
    image: 'http://mat1.gtimg.com/gongyi/2013yuejuan/wzcz/wzcz_banner.jpg',
    targetAmount: 500000,
    currentAmount: 430000,
    status: '募款',
    description:
      '帮助中国贫困地区6周岁以上的孤儿，为他们提供基本生活和学习补助，使他们能和其他孩子一样享有受教育的权利，得到关怀和照顾，快乐健康成长',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    donorCount: 1234,
    category: '教育助学',
  },
  {
    id: '2',
    title: '关爱老年人生活',
    image:
      'https://inews.gtimg.com/news_bt/OuLgJxwcRdCGuSnz7xGM1pV5POblvU0Rhkd6KbiXH-P68AA/0',
    targetAmount: 1000000,
    currentAmount: 860000,
    status: '执行',
    description: '为独居老人提供生活援助和精神关怀，改善老年人生活质量。',
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    donorCount: 2156,
    category: '敬老关爱',
  },
  {
    id: '3',
    title: '免费午餐 小善大爱”',
    image:
      'http://mat1.gtimg.com/gongyi/2013/loveplan/active/wangjujianai_980x302.jpg',
    targetAmount: 800000,
    currentAmount: 350000,
    status: '募款',
    description: '帮助特殊儿童获得康复治疗机会，让他们更好地融入社会。',
    startDate: '2024-03-01',
    endDate: '2024-12-31',
    donorCount: 986,
    category: '医疗救助',
  },
];

// 自定义进度条组件
const CustomProgressBar = ({progress}: {progress: number}) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, {width: `${progress * 100}%`}]} />
  </View>
);

const CharityScreen = ({navigation}: any) => {
  const renderItem = ({item}: {item: CharityProject}) => {
    const progress = item.currentAmount / item.targetAmount;

    return (
      <TouchableOpacity
        style={styles.projectCard}
        onPress={() => navigation.navigate('CharityDetail', {project: item})}>
        <Image
          source={{uri: item.image}}
          style={styles.projectImage}
          defaultSource={{
            uri: 'https://ts1.cn.mm.bing.net/th/id/R-C.2d23c9585895bf767d4280ec96eb94e9?rik=J6CBq6uhCLfLOA&riu=http%3a%2f%2f5b0988e595225.cdn.sohucs.com%2fimages%2f20180728%2fde00a4af1f5b456b87492c5f386c7a77.jpeg&ehk=bO239mU5aWSCsk%2bLTGDyTFZ5rdhcuFZbyycDK9GJRe0%3d&risl=&pid=ImgRaw&r=0',
          }}
        />
        <View style={styles.projectInfo}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <Text style={styles.projectTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.progressContainer}>
            <CustomProgressBar progress={progress} />
            <View style={styles.amountContainer}>
              <Text style={styles.amountText}>
                已筹：{item.currentAmount.toLocaleString()}元
              </Text>
              <Text style={styles.percentageText}>
                ({Math.floor(progress * 100)}%)
              </Text>
            </View>
          </View>
          <View style={styles.footerContainer}>
            <View style={styles.statusContainer}>
              <Icon name="clock-outline" size={16} color="#666" />
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
            <View style={styles.donorContainer}>
              <Icon name="account-group-outline" size={16} color="#666" />
              <Text style={styles.donorText}>{item.donorCount}人参与</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={charityProjects}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          console.log('Navigating to DonationHistory');
          navigation.navigate('DonationHistory');
        }}>
        <Icon name="history" size={24} color="#fff" />
        <Text style={styles.floatingButtonText}>捐款记录</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  listContainer: {
    padding: 15,
  },
  projectCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  projectImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  projectInfo: {
    padding: 15,
  },
  categoryTag: {
    position: 'absolute',
    top: -20,
    left: 15,
    backgroundColor: '#1890ff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  progressContainer: {
    marginVertical: 10,
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#f5f5f5',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1890ff',
    borderRadius: 2,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  amountText: {
    fontSize: 14,
    color: '#1890ff',
    fontWeight: '500',
  },
  percentageText: {
    fontSize: 14,
    color: '#666',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  donorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  donorText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#1890ff',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default CharityScreen;
