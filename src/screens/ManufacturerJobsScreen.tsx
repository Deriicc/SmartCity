import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  requirements: string[];
  type: string;
  postDate: string;
  logo: {uri: string};
}

interface NavigationProps {
  navigate: (screen: string, params?: any) => void;
}

// 模拟数据
const jobs: Job[] = [
  {
    id: '1',
    title: '自动化工程师',
    company: '智能科技有限公司',
    location: '北京市',
    salary: '15k-25k',
    requirements: [
      '自动化或相关专业本科及以上学历',
      '3年以上工业自动化项目经验',
      '熟悉PLC编程、工业机器人操作',
    ],
    type: '全职',
    postDate: '2024-03-15',
    logo: {
      uri: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg',
    },
  },
  {
    id: '2',
    title: '机器人开发工程师',
    company: '创新机器人公司',
    location: '上海市',
    salary: '20k-35k',
    requirements: [
      '计算机或机械相关专业硕士及以上学历',
      '熟悉ROS系统开发',
      '具有机器人控制算法开发经验',
    ],
    type: '全职',
    postDate: '2024-03-14',
    logo: {
      uri: 'https://images.pexels.com/photos/1108102/pexels-photo-1108102.jpeg',
    },
  },
  {
    id: '3',
    title: '智能制造解决方案工程师',
    company: '智慧工厂科技',
    location: '深圳市',
    salary: '18k-30k',
    requirements: [
      '工业工程或自动化专业本科及以上学历',
      '熟悉MES系统实施与开发',
      '具有智能工厂项目经验',
    ],
    type: '全职',
    postDate: '2024-03-13',
    logo: {
      uri: 'https://images.pexels.com/photos/1108103/pexels-photo-1108103.jpeg',
    },
  },
];

const ManufacturerJobsScreen = ({
  navigation,
}: {
  navigation: NavigationProps;
}) => {
  const renderJob = ({item}: {item: Job}) => (
    <TouchableOpacity
      style={styles.jobItem}
      onPress={() => navigation.navigate('JobDetail', {id: item.id})}>
      <View style={styles.jobHeader}>
        <Image source={item.logo} style={styles.companyLogo} />
        <View style={styles.jobTitleContainer}>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.salary}>{item.salary}</Text>
        </View>
      </View>

      <View style={styles.companyInfo}>
        <View style={styles.infoItem}>
          <Icon name="office-building" size={16} color="#666" />
          <Text style={styles.infoText}>{item.company}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="map-marker" size={16} color="#666" />
          <Text style={styles.infoText}>{item.location}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="clock-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{item.type}</Text>
        </View>
      </View>

      <View style={styles.requirements}>
        <Text style={styles.requirementsTitle}>职位要求：</Text>
        {item.requirements.map((req, index) => (
          <View key={index} style={styles.requirementItem}>
            <Icon name="circle-small" size={16} color="#666" />
            <Text style={styles.requirementText}>{req}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.postDate}>发布时间：{item.postDate}</Text>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => navigation.navigate('JobApply', {id: item.id})}>
          <Text style={styles.applyButtonText}>立即申请</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={renderJob}
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
  jobItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  jobHeader: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  jobTitleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  salary: {
    fontSize: 16,
    color: '#f50',
    fontWeight: 'bold',
  },
  companyInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  requirements: {
    marginBottom: 15,
  },
  requirementsTitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  postDate: {
    fontSize: 12,
    color: '#999',
  },
  applyButton: {
    backgroundColor: '#1890ff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ManufacturerJobsScreen;
