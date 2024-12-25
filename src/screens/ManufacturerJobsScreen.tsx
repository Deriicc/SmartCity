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
  icon: string;
}

interface NavigationProps {
  navigate: (screen: string, params?: any) => void;
}

// 模拟数据
const jobs: Job[] = [
  {
    id: '1',
    title: '机械工程师',
    company: '施耐德电气',
    location: '上海',
    salary: '15k-25k',
    requirements: ['本科及以上学历', '3年以上相关经验', '机械设计经验'],
    type: '全职',
    postDate: '2024-03-15',
    icon: 'factory',
  },
  {
    id: '2',
    title: '能源管理解决方案工程师',
    company: '施耐德电气（中国）有限公司',
    location: '北京市',
    salary: '20k-35k',
    requirements: [
      '电气/能源管理相关专业本科及以上学历',
      '熟悉 PowerLogic 系统及能源管理方案',
      '具备工业现场项目实施经验',
      '良好的英语沟通能力',
    ],
    type: '全职',
    postDate: '2024-03-14',
    icon: 'robot-industrial',
  },
  {
    id: '3',
    title: '数字化转型技术顾问',
    company: '施耐德电气（中国）有限公司',
    location: '深圳市',
    salary: '30k-45k',
    requirements: [
      '计算机/自动化相关专业硕士及以上学历',
      '熟悉工业物联网和数字孪生技术',
      '具备大型工业企业数字化转型项目经验',
      '精通 EcoStruxure IoT 平台',
    ],
    type: '全职',
    postDate: '2024-03-13',
    icon: 'chip',
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
        <View style={styles.companyLogo}>
          <Icon name={item.icon} size={24} color="#1890ff" />
        </View>
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
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
    backgroundColor: '#e6f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
