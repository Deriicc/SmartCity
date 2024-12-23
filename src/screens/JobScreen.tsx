import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';

const {width} = Dimensions.get('window');

// 修改职位数据结构
const jobCategories = [
  '前端开发',
  '后端开发',
  'UI设计',
  '产品经理',
  '项目经理',
  '测试工程师',
  '运维工程师',
  '销售代表',
  '人力资源',
];

// 模拟数据
const jobData = [
  {
    id: '1',
    category: '前端开发',
    title: '前端开发工程师',
    company: '科技有限公司',
    location: '北京',
    salary: '15-25K',
    responsibilities: 'React Native开发，负责移动端项目开发',
    contact: '张先生',
    description:
      '负责公司移动端产品的开发和维护，参与产品需求分析和技术方案设计。',
    requirements: '本科及以上学历，3年以上前端开发经验，熟悉React Native开发。',
    companyName: '科技有限公司',
    companyIntro:
      '一家专注于移动互联网产品开发���科技公司，致力于为用户提供优质的移动应用体验。',
  },
  {
    id: '2',
    category: '后端开发',
    title: '后端开发工程师',
    company: '互联网公司',
    location: '上海',
    salary: '20-35K',
    responsibilities: '后端服务开发，系统架构设计',
    contact: '李先生',
    description: '负责公司后端服务的开发和维护，参与系统架构设计和优化。',
    requirements: '本科及以上学历，3年以上后端开发经验，熟悉Java开发。',
    companyName: '互联网公司',
    companyIntro:
      '一家专注于互联网产品开发的科技公司，致力于为用户提供优质的互联网服务体验。',
  },
];

// 热门职位数据
const hotJobs = [
  {title: '软件工程师', count: 150},
  {title: '产品经理', count: 120},
  {title: '销售代表', count: 100},
];

// 在文件顶部添加轮播图数据
const bannerData = [
  {
    id: '1',
    image: {
      uri: 'https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  },
  {
    id: '2',
    image: {
      uri: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  },
  {
    id: '3',
    image: {
      uri: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  },
];

// 添加投递记录数据
const applicationHistory = [
  {
    id: '1',
    jobTitle: '前端开发工程师',
    company: '科技有限公司',
    salary: '15-25K',
    applyTime: '2024-03-15 14:30',
  },
  {
    id: '2',
    jobTitle: '后端开发工程师',
    company: '互联网公司',
    salary: '20-35K',
    applyTime: '2024-03-14 10:20',
  },
];

// 添加个人简历数据
const resumeData = {
  basicInfo: {
    nickname: '张三',
    email: 'zhangsan@example.com',
    phone: '13800138000',
    gender: '男',
  },
  jobInfo: {
    experience: '3年',
    education: '本科',
    location: '北京',
    expectedPosition: '前端开发',
    expectedSalary: '20-30K',
    educationHistory: [
      {
        id: '1',
        school: '某某大学',
        major: '计算机科学',
        degree: '本科',
        startTime: '2018',
        endTime: '2022',
      },
    ],
    introduction: '热爱编程，有良好的团队协作能力...',
  },
};

const JobScreen = () => {
  const [activeTab, setActiveTab] = useState('找工作');
  const [searchText, setSearchText] = useState('');
  const [jobs, setJobs] = useState(jobData);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [resume, setResume] = useState(resumeData);

  const handleSearch = () => {
    const filteredJobs = jobData.filter(job =>
      job.title.toLowerCase().includes(searchText.toLowerCase()),
    );
    setJobs(filteredJobs);
  };

  const renderJobItem = ({item}) => (
    <View style={styles.jobItem}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobCompany}>{item.company}</Text>
      <Text style={styles.jobDetails}>
        {item.location} | {item.salary}
      </Text>
      <Text style={styles.jobResponsibilities}>{item.responsibilities}</Text>
    </View>
  );

  // 职位类别网格
  const renderJobCategories = () => (
    <View style={styles.categoriesContainer}>
      <Text style={styles.sectionTitle}>职位类别</Text>
      <View style={styles.categoryGrid}>
        {jobCategories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryItem,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => {
              setSelectedCategory(category);
              setJobs(
                category
                  ? jobData.filter(job => job.category === category)
                  : jobData,
              );
            }}>
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // 职位详情页面
  const JobDetailScreen = ({job, onClose, onSubmit}) => (
    <View style={styles.detailContainer}>
      <ScrollView>
        {/* 职位信息 */}
        <View style={styles.detailSection}>
          <Text style={styles.detailTitle}>{job.title}</Text>
          <Text style={styles.detailSalary}>{job.salary}</Text>
          <Text style={styles.detailLocation}>{job.location}</Text>
          <Text style={styles.detailContact}>联系人：{job.contact}</Text>

          <Text style={styles.sectionTitle}>职位描述</Text>
          <Text style={styles.detailText}>{job.description}</Text>

          <Text style={styles.sectionTitle}>职位要求</Text>
          <Text style={styles.detailText}>{job.requirements}</Text>
        </View>

        {/* 公司信息 */}
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>公司信息</Text>
          <Text style={styles.detailCompany}>{job.companyName}</Text>
          <Text style={styles.detailText}>{job.companyIntro}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
        <Text style={styles.submitButtonText}>投简历</Text>
      </TouchableOpacity>
    </View>
  );

  // 处理简历投递
  const handleResumeSubmit = () => {
    // 这里添加检查简历完整性的逻辑
    const hasCompleteResume = false; // 这里应该从状态管理或API获取

    if (!hasCompleteResume) {
      Alert.alert('简历未完善', '请先完善您的工作经历和教育经历', [
        {
          text: '去完善',
          onPress: () => {
            setActiveTab('个人简历');
            setShowJobDetail(false);
          },
        },
      ]);
    } else {
      Alert.alert('成功', '简历投递成功！');
      setShowJobDetail(false);
    }
  };

  // 渲染投递记录
  const renderApplicationHistory = () => (
    <FlatList
      data={applicationHistory}
      renderItem={({item}) => (
        <View style={styles.applicationItem}>
          <Text style={styles.jobTitle}>{item.jobTitle}</Text>
          <Text style={styles.jobCompany}>{item.company}</Text>
          <Text style={styles.jobSalary}>{item.salary}</Text>
          <Text style={styles.applyTime}>{item.applyTime}</Text>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );

  // 渲染个人简历
  const renderResume = () => (
    <ScrollView style={styles.resumeContainer}>
      {/* 基本信息 */}
      <View style={styles.resumeSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>基本信息</Text>
          <TouchableOpacity onPress={() => setIsEditingResume(true)}>
            <Text style={styles.editButton}>编辑</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>昵称：</Text>
          <Text style={styles.infoValue}>{resume.basicInfo.nickname}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>邮箱：</Text>
          <Text style={styles.infoValue}>{resume.basicInfo.email}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>电话：</Text>
          <Text style={styles.infoValue}>{resume.basicInfo.phone}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>性别：</Text>
          <Text style={styles.infoValue}>{resume.basicInfo.gender}</Text>
        </View>
      </View>

      {/* 求职信息 */}
      <View style={styles.resumeSection}>
        <Text style={styles.sectionTitle}>求职信息</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>工作经验：</Text>
          <Text style={styles.infoValue}>{resume.jobInfo.experience}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>最高学历：</Text>
          <Text style={styles.infoValue}>{resume.jobInfo.education}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>现居住地：</Text>
          <Text style={styles.infoValue}>{resume.jobInfo.location}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>期望职位：</Text>
          <Text style={styles.infoValue}>
            {resume.jobInfo.expectedPosition}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>期望薪资：</Text>
          <Text style={styles.infoValue}>{resume.jobInfo.expectedSalary}</Text>
        </View>
      </View>

      {/* 教育经历 */}
      <View style={styles.resumeSection}>
        <Text style={styles.sectionTitle}>教育经历</Text>
        {resume.jobInfo.educationHistory.map(edu => (
          <View key={edu.id} style={styles.educationItem}>
            <Text style={styles.schoolName}>{edu.school}</Text>
            <Text style={styles.educationDetails}>
              {edu.major} | {edu.degree}
            </Text>
            <Text style={styles.educationTime}>
              {edu.startTime}-{edu.endTime}
            </Text>
          </View>
        ))}
      </View>

      {/* 个人简介 */}
      <View style={styles.resumeSection}>
        <Text style={styles.sectionTitle}>个人简介</Text>
        <Text style={styles.introduction}>{resume.jobInfo.introduction}</Text>
      </View>
    </ScrollView>
  );

  const renderContent = () => {
    if (showJobDetail) {
      return (
        <JobDetailScreen
          job={selectedJob}
          onClose={() => setShowJobDetail(false)}
          onSubmit={handleResumeSubmit}
        />
      );
    }

    switch (activeTab) {
      case '找工作':
        return (
          <ScrollView style={styles.content}>
            {/* 轮播图 */}
            <View style={styles.bannerContainer}>
              <Swiper
                autoplay
                autoplayTimeout={3}
                height={200}
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}>
                {bannerData.map(item => (
                  <Image
                    key={item.id}
                    source={item.image}
                    style={styles.bannerImage}
                  />
                ))}
              </Swiper>
            </View>

            {/* 搜索栏 */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="搜索职位"
                value={searchText}
                onChangeText={setSearchText}
              />
              <TouchableOpacity
                style={styles.searchButton}
                onPress={handleSearch}>
                <Text style={styles.searchButtonText}>搜索</Text>
              </TouchableOpacity>
            </View>

            {/* 热门职位 */}
            <View style={styles.hotJobsContainer}>
              <Text style={styles.sectionTitle}>热门职位</Text>
              <View style={styles.hotJobsList}>
                {hotJobs.map((job, index) => (
                  <View key={index} style={styles.hotJobItem}>
                    <Text style={styles.hotJobTitle}>{job.title}</Text>
                    <Text style={styles.hotJobCount}>{job.count}个职位</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* 职位类别网格 */}
            {renderJobCategories()}

            {/* 职位列表 */}
            <FlatList
              data={jobs}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.jobItem}
                  onPress={() => {
                    setSelectedJob(item);
                    setShowJobDetail(true);
                  }}>
                  <Text style={styles.jobTitle}>{item.title}</Text>
                  <Text style={styles.jobCompany}>{item.company}</Text>
                  <Text style={styles.jobDetails}>
                    {item.location} | {item.salary}
                  </Text>
                  <Text style={styles.jobResponsibilities}>
                    {item.responsibilities}
                  </Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              style={styles.jobList}
              scrollEnabled={false}
            />
          </ScrollView>
        );
      case '投递记录':
        return renderApplicationHistory();
      case '个人简历':
        return renderResume();
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* 顶部标签栏 */}
      <View style={styles.tabBar}>
        {['找工作', '投递记录', '个人简历'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}>
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 内容区域 */}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1890ff',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#1890ff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#1890ff',
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  hotJobsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hotJobsList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hotJobItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  hotJobTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  hotJobCount: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  jobList: {
    flex: 1,
    marginTop: 10,
  },
  jobItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobCompany: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  jobDetails: {
    fontSize: 14,
    color: '#1890ff',
    marginBottom: 5,
  },
  jobResponsibilities: {
    fontSize: 14,
    color: '#999',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginTop: 10,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '30%',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#e6f7ff',
    borderColor: '#1890ff',
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#1890ff',
  },
  detailContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailSection: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailSalary: {
    fontSize: 18,
    color: '#f50',
    marginBottom: 5,
  },
  detailLocation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  detailContact: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  detailCompany: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#1890ff',
    padding: 15,
    margin: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  applicationItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  applyTime: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  resumeContainer: {
    flex: 1,
    padding: 15,
  },
  resumeSection: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  editButton: {
    color: '#1890ff',
    fontSize: 14,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoLabel: {
    width: 80,
    color: '#666',
  },
  infoValue: {
    flex: 1,
    color: '#333',
  },
  educationItem: {
    marginBottom: 15,
  },
  schoolName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  educationDetails: {
    color: '#666',
    marginBottom: 3,
  },
  educationTime: {
    color: '#999',
    fontSize: 12,
  },
  introduction: {
    color: '#666',
    lineHeight: 20,
  },
});

export default JobScreen;
