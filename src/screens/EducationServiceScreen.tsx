import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

interface LearningResource {
  id: string;
  title: string;
  type: string;
  duration: string;
  progress: number;
}

interface CareerOpportunity {
  id: string;
  title: string;
  company: string;
  type: string;
  location: string;
}

const EducationServiceScreen = ({navigation}: any) => {
  // 示例数据
  const recommendedCourses = [
    {
      id: '1',
      title: 'React Native 开发实战',
      progress: 45,
      lastStudied: '2024-03-20',
    },
    {
      id: '2',
      title: '数据结构与算法',
      progress: 30,
      lastStudied: '2024-03-19',
    },
  ];

  const careerOpportunities: CareerOpportunity[] = [
    {
      id: '1',
      title: '前端开发工程师',
      company: '腾讯科技',
      type: '实习',
      location: '深圳',
    },
    {
      id: '2',
      title: '产品经理助理',
      company: '阿里巴巴',
      type: '全职',
      location: '杭州',
    },
  ];

  const learningResources: LearningResource[] = [
    {
      id: '1',
      title: '编程基础入门',
      type: '视频课程',
      duration: '2小时',
      progress: 60,
    },
    {
      id: '2',
      title: '面试技巧指南',
      type: '文档',
      duration: '30分钟',
      progress: 0,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* 顶部用户学习概览 */}
      <View style={styles.header}>
        <View style={styles.userStats}>
          <Text style={styles.welcomeText}>Hi, 学习者</Text>
          <Text style={styles.statsText}>本周学习时长: 6.5 小时</Text>
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('LearningProfile')}>
          <Icon name="account" size={24} color="#1890ff" />
        </TouchableOpacity>
      </View>

      {/* 个性化学习推荐 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>继续学习</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AllCourses')}>
            <Text style={styles.moreText}>查看全部</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recommendedCourses.map(course => (
            <TouchableOpacity
              key={course.id}
              style={styles.courseCard}
              onPress={() => navigation.navigate('CourseDetail', {course})}>
              <View style={styles.courseProgress}>
                <Text style={styles.progressText}>{course.progress}%</Text>
              </View>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.lastStudied}>
                上次学习: {course.lastStudied}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 职业发展机会 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>职业机会</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CareerCenter')}>
            <Text style={styles.moreText}>更多机会</Text>
          </TouchableOpacity>
        </View>
        {careerOpportunities.map(opportunity => (
          <TouchableOpacity
            key={opportunity.id}
            style={styles.opportunityCard}
            onPress={() => navigation.navigate('JobDetail', {opportunity})}>
            <View style={styles.opportunityInfo}>
              <Text style={styles.jobTitle}>{opportunity.title}</Text>
              <Text style={styles.companyName}>{opportunity.company}</Text>
              <View style={styles.jobTags}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{opportunity.type}</Text>
                </View>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{opportunity.location}</Text>
                </View>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color="#ccc" />
          </TouchableOpacity>
        ))}
      </View>

      {/* 学习资源 */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>学习资源</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ResourceCenter')}>
            <Text style={styles.moreText}>全部资源</Text>
          </TouchableOpacity>
        </View>
        {learningResources.map(resource => (
          <TouchableOpacity
            key={resource.id}
            style={styles.resourceCard}
            onPress={() => navigation.navigate('ResourceDetail', {resource})}>
            <View style={styles.resourceIcon}>
              <Icon
                name={resource.type === '视频课程' ? 'video' : 'file-document'}
                size={24}
                color="#1890ff"
              />
            </View>
            <View style={styles.resourceInfo}>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <View style={styles.resourceMeta}>
                <Text style={styles.resourceType}>{resource.type}</Text>
                <Text style={styles.resourceDuration}>{resource.duration}</Text>
              </View>
            </View>
            <View style={styles.resourceProgress}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {width: `${resource.progress}%`},
                  ]}
                />
              </View>
              <Text style={styles.progressPercent}>{resource.progress}%</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* 智能助手入口 */}
      <TouchableOpacity
        style={styles.aiAssistant}
        onPress={() => navigation.navigate('AIAssistant')}>
        <Icon name="robot" size={24} color="#fff" />
        <Text style={styles.aiAssistantText}>智能学习助手</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  userStats: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statsText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  profileButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f5ff',
  },
  section: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  moreText: {
    fontSize: 14,
    color: '#1890ff',
  },
  courseCard: {
    width: width * 0.7,
    marginRight: 15,
    padding: 15,
    backgroundColor: '#f0f5ff',
    borderRadius: 12,
  },
  courseProgress: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1890ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  lastStudied: {
    fontSize: 12,
    color: '#666',
  },
  opportunityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  opportunityInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  jobTags: {
    flexDirection: 'row',
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f5ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resourceInfo: {
    flex: 1,
    marginLeft: 12,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  resourceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceType: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  resourceDuration: {
    fontSize: 12,
    color: '#666',
  },
  resourceProgress: {
    width: 100,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1890ff',
  },
  progressPercent: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  aiAssistant: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1890ff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  aiAssistantText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default EducationServiceScreen;
