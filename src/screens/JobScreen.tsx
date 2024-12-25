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
import {useApplications} from '../context/ApplicationContext';

const {width} = Dimensions.get('window');

// Define the job interface
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  responsibilities: string;
  category: string;
  contact: string;
  description: string;
  requirements: string;
  companyName: string;
  companyIntro: string;
}

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
const jobData: Job[] = [];
import {jobData as importedJobData} from '../data/jobData';
jobData.push(...importedJobData);

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
      uri: 'https://www.bjbys.net.cn/upload/resources/image/2024/12/16/196911.jpg',
    },
  },
  {
    id: '2',
    image: {
      uri: 'https://mmbiz.qpic.cn/sz_mmbiz_jpg/gNo7f2QZKpsGAsYicmwOFQ7sRA7bticzyvdHwcrlvYyiav59zSx2BRGqaW7JEUwGmfUrHCLjWx7agSUS2Rib0WuUgw/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1',
    },
  },
  {
    id: '3',
    image: {
      uri: 'https://www.bpi.edu.cn/__local/A/E9/9D/FD38939073F03B3087D909FE6D3_484D0609_4DE81.jpg',
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
    status: '已回复',
    response: '期待您来面试',
  },
  {
    id: '2',
    jobTitle: '后端开发工程师',
    company: '互联网公司',
    salary: '20-35K',
    applyTime: '2024-03-14 10:20',
    status: '待回复',
    response: null,
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

const JobScreen = ({navigation}) => {
  const {applications} = useApplications();

  // 添加调试日志
  console.log('Current applications:', applications);

  const [activeTab, setActiveTab] = useState('找工作');
  const [searchText, setSearchText] = useState('');
  const [jobs, setJobs] = useState(jobData);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditingResume, setIsEditingResume] = useState(false);
  const [editedResume, setEditedResume] = useState({
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
      expectedPosition: '前端开发工程师',
      expectedSalary: '6k-10k',
      educationHistory: [
        {
          id: '1',
          school: '北京电子科技职业学院',
          major: '计算机技术应用',
          degree: '专科',
          startTime: '2024',
          endTime: '2026',
        },
      ],
      introduction: '热爱编程，对前端技术充满热情...',
    },
  });

  const handleSearch = (searchTerm?: string, category?: string) => {
    console.log('Searching with:', {searchTerm, category});
    const textToSearch = (searchTerm || searchText || '').trim().toLowerCase();

    // 重置类别选择
    if (!category) {
      setSelectedCategory('');
    }

    // 先清空结果，触发视图刷新
    setJobs([]);

    // 使用 setTimeout 确保清空操作已完成
    setTimeout(() => {
      const filteredJobs = jobData.filter(job => {
        const matchesSearch =
          job.title.toLowerCase().includes(textToSearch) ||
          job.company.toLowerCase().includes(textToSearch);

        if (category) {
          return matchesSearch && job.category === category;
        }
        return matchesSearch;
      });

      console.log('Filtered jobs:', filteredJobs.length);
      setJobs(filteredJobs);
    }, 0);
  };

  // 修改搜索框部分的渲染
  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="搜索职位/公司"
        value={searchText}
        onChangeText={text => {
          setSearchText(text);
          if (text === '') {
            setJobs(jobData);
            setSelectedCategory('');
          }
        }}
        onSubmitEditing={() => handleSearch(searchText)}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => handleSearch(searchText)}>
        <Text style={styles.searchButtonText}>搜索</Text>
      </TouchableOpacity>
    </View>
  );

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

  // 修改渲染热门职位的部分
  const renderHotJobs = () => (
    <View style={styles.hotJobsContainer}>
      <View style={styles.sectionTitleContainer}>
        <View style={styles.titleIndicator} />
        <Text style={styles.sectionTitle}>热门职位</Text>
      </View>
      <View style={styles.hotJobsGrid}>
        {hotJobs.map((job, index) => (
          <TouchableOpacity
            key={index}
            style={styles.hotJobItem}
            onPress={() => {
              console.log('Hot job clicked:', job.title); // 添加调试日志
              setSearchText(job.title);
              setSelectedCategory('');
              handleSearch(job.title);
            }}>
            <Text style={styles.hotJobTitle}>{job.title}</Text>
            <Text style={styles.hotJobCount}>{job.count}个职位</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // 修改职位类别网格的渲染
  const renderJobCategories = () => (
    <View style={styles.categoriesContainer}>
      <View style={styles.sectionTitleContainer}>
        <View style={[styles.titleIndicator, styles.categoryIndicator]} />
        <Text style={styles.sectionTitle}>职位类别</Text>
      </View>
      <View style={styles.categoryGrid}>
        {jobCategories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryItem,
              selectedCategory === category && styles.selectedCategory,
            ]}
            onPress={() => {
              console.log('Category clicked:', category);
              if (selectedCategory === category) {
                // 如果点击已选中的类别，取消选择
                setSelectedCategory('');
                setJobs(jobData); // 重置为所有职位
              } else {
                // 选择新类别
                setSelectedCategory(category);
                const filteredJobs = jobData.filter(
                  job => job.category === category,
                );
                setJobs(filteredJobs);
              }
              setSearchText(''); // 清空搜索文本
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

  // 职位详情页
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
        <Text style={styles.submitButtonText}>投简</Text>
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
  const renderApplicationHistory = () => {
    // 添加空数据检查
    if (!applications || applications.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>暂无投递记录</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={applications}
        renderItem={renderApplicationItem}
        keyExtractor={item => item.id}
      />
    );
  };

  // 渲染个人简历
  const renderResume = () => (
    <ScrollView style={styles.resumeContainer}>
      {isEditingResume ? (
        // 编辑模式
        <View style={styles.resumeSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>编辑简历</Text>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveResume}>
              <Text style={styles.saveButtonText}>保存</Text>
            </TouchableOpacity>
          </View>

          {/* 基本信息编辑 */}
          <View style={styles.editSection}>
            <Text style={styles.editSectionTitle}>基本信息</Text>
            <View style={styles.editForm}>
              <View style={styles.formItem}>
                <Text style={styles.formLabel}>昵称</Text>
                <TextInput
                  style={styles.formInput}
                  value={editedResume.basicInfo.nickname}
                  onChangeText={text =>
                    setEditedResume(prev => ({
                      ...prev,
                      basicInfo: {...prev.basicInfo, nickname: text},
                    }))
                  }
                />
              </View>
              <View style={styles.formItem}>
                <Text style={styles.formLabel}>邮箱</Text>
                <TextInput
                  style={styles.formInput}
                  value={editedResume.basicInfo.email}
                  onChangeText={text =>
                    setEditedResume(prev => ({
                      ...prev,
                      basicInfo: {...prev.basicInfo, email: text},
                    }))
                  }
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.formItem}>
                <Text style={styles.formLabel}>电话</Text>
                <TextInput
                  style={styles.formInput}
                  value={editedResume.basicInfo.phone}
                  onChangeText={text =>
                    setEditedResume(prev => ({
                      ...prev,
                      basicInfo: {...prev.basicInfo, phone: text},
                    }))
                  }
                  keyboardType="phone-pad"
                />
              </View>
              <View style={styles.formItem}>
                <Text style={styles.formLabel}>性别</Text>
                <TextInput
                  style={styles.formInput}
                  value={editedResume.basicInfo.gender}
                  onChangeText={text =>
                    setEditedResume(prev => ({
                      ...prev,
                      basicInfo: {...prev.basicInfo, gender: text},
                    }))
                  }
                />
              </View>
            </View>
          </View>

          {/* 求职信息编辑 */}
          <View style={styles.editSection}>
            <Text style={styles.editSectionTitle}>求职信息</Text>
            <View style={styles.editForm}>
              <View style={styles.formItem}>
                <Text style={styles.formLabel}>工作经验</Text>
                <TextInput
                  style={styles.formInput}
                  value={editedResume.jobInfo.experience}
                  onChangeText={text =>
                    setEditedResume(prev => ({
                      ...prev,
                      jobInfo: {...prev.jobInfo, experience: text},
                    }))
                  }
                />
              </View>
              {/* 添加其他求职信息输入框 */}
            </View>
          </View>
        </View>
      ) : (
        // 显示模式 (保持原有的显示代码)
        <View style={styles.resumeSection}>
          <View style={styles.sectionHeader}>
            <View style={styles.titleContainer}>
              <View style={styles.titleIcon} />
              <Text style={styles.sectionTitle}>基本信息</Text>
            </View>
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditingResume(true)}>
              <Text style={styles.editButtonText}>编辑</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>昵称</Text>
              <Text style={styles.infoValue}>
                {editedResume.basicInfo.nickname}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>邮箱</Text>
              <Text style={styles.infoValue}>
                {editedResume.basicInfo.email}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>电话</Text>
              <Text style={styles.infoValue}>
                {editedResume.basicInfo.phone}
              </Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>性别</Text>
              <Text style={styles.infoValue}>
                {editedResume.basicInfo.gender}
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* 求职信息 */}
      <View style={styles.resumeSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.titleContainer}>
            <View style={[styles.titleIcon, styles.titleIconJob]} />
            <Text style={styles.sectionTitle}>求职信息</Text>
          </View>
        </View>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>工作经验</Text>
            <Text style={styles.infoValue}>
              {editedResume.jobInfo.experience}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>最高学历</Text>
            <Text style={styles.infoValue}>
              {editedResume.jobInfo.education}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>现居住地</Text>
            <Text style={styles.infoValue}>
              {editedResume.jobInfo.location}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>期望职位</Text>
            <Text style={styles.infoValue}>
              {editedResume.jobInfo.expectedPosition}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>期望薪资</Text>
            <Text style={styles.infoValue}>
              {editedResume.jobInfo.expectedSalary}
            </Text>
          </View>
        </View>
      </View>

      {/* 教育经历 */}
      <View style={styles.resumeSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.titleContainer}>
            <View style={[styles.titleIcon, styles.titleIconEdu]} />
            <Text style={styles.sectionTitle}>教育经历</Text>
          </View>
        </View>
        {editedResume.jobInfo.educationHistory.map(edu => (
          <View key={edu.id} style={styles.educationItem}>
            <Text style={styles.schoolName}>{edu.school}</Text>
            <View style={styles.eduDetails}>
              <Text style={styles.majorDegree}>
                {edu.major} | {edu.degree}
              </Text>
              <Text style={styles.eduTime}>
                {edu.startTime}-{edu.endTime}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* 个人简介 */}
      <View style={styles.resumeSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.titleContainer}>
            <View style={[styles.titleIcon, styles.titleIconIntro]} />
            <Text style={styles.sectionTitle}>个人简介</Text>
          </View>
        </View>
        <Text style={styles.introduction}>
          {editedResume.jobInfo.introduction}
        </Text>
      </View>
    </ScrollView>
  );

  const renderApplicationItem = ({item}) => (
    <TouchableOpacity
      style={styles.applicationItem}
      onPress={() => {
        if (item.response) {
          Alert.alert('企业回复', item.response);
        }
      }}>
      <View style={styles.applicationHeader}>
        <Text style={styles.jobTitle} numberOfLines={1}>
          {item.jobTitle}
        </Text>
        <Text
          style={[
            styles.statusText,
            item.status === '已回复'
              ? styles.statusResponded
              : styles.statusPending,
          ]}>
          {item.status}
        </Text>
      </View>

      <View style={styles.applicationContent}>
        <Text style={styles.jobCompany} numberOfLines={1}>
          {item.company}
        </Text>
        <Text style={styles.jobSalary}>{item.salary}</Text>
      </View>

      <View style={styles.applicationFooter}>
        <Text style={styles.applyTime}>{item.applyTime}</Text>
        {item.response && (
          <View style={styles.responseContainer}>
            <Text style={styles.responseLabel}>回复: </Text>
            <Text style={styles.responseText} numberOfLines={2}>
              {item.response}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
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
            {renderSearchBar()}

            {/* 热门职位 */}
            {renderHotJobs()}

            {/* 职位类别网格 */}
            {renderJobCategories()}

            {/* 职位列表 */}
            <FlatList
              data={jobs}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.jobItem}
                  onPress={() => {
                    navigation.navigate('JobDetailPage', {job: item});
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

  // 添加保存函数
  const handleSaveResume = () => {
    setIsEditingResume(false);
    // 这里可以添加保存到后端的逻辑
    Alert.alert('成功', '简历信息已更新');
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
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  titleIndicator: {
    width: 3,
    height: 16,
    backgroundColor: '#1890ff',
    borderRadius: 2,
    marginRight: 8,
  },
  categoryIndicator: {
    backgroundColor: '#52c41a',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  hotJobsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  hotJobItem: {
    width: '31%',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    margin: '1%',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  hotJobTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  hotJobCount: {
    fontSize: 12,
    color: '#666',
  },
  jobList: {
    flex: 1,
    marginTop: 10,
  },
  jobItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  jobCompany: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  jobLocation: {
    fontSize: 13,
    color: '#999',
  },
  jobSalary: {
    fontSize: 15,
    color: '#ff4d4f',
    fontWeight: '500',
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
    marginHorizontal: -5,
  },
  categoryItem: {
    width: '31%',
    margin: '1%',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedCategory: {
    backgroundColor: '#e6f7ff',
    borderColor: '#1890ff',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  selectedCategoryText: {
    color: '#1890ff',
    fontWeight: '500',
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
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  applicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  applicationContent: {
    marginBottom: 8,
  },
  jobCompany: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  jobSalary: {
    fontSize: 14,
    color: '#ff4d4f',
  },
  applicationFooter: {
    borderTopWidth: 0.5,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
  },
  applyTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  responseContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  responseLabel: {
    fontSize: 13,
    color: '#666',
    marginRight: 4,
  },
  responseText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  statusText: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusPending: {
    backgroundColor: '#fff7e6',
    color: '#fa8c16',
  },
  statusResponded: {
    backgroundColor: '#f6ffed',
    color: '#52c41a',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
  resumeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
  },
  resumeSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    width: 4,
    height: 16,
    backgroundColor: '#1890ff',
    borderRadius: 2,
    marginRight: 8,
  },
  titleIconJob: {
    backgroundColor: '#52c41a',
  },
  titleIconEdu: {
    backgroundColor: '#722ed1',
  },
  titleIconIntro: {
    backgroundColor: '#f5222d',
  },
  editButton: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  editButtonText: {
    color: '#1890ff',
    fontSize: 14,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    width: '50%',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    color: '#333',
  },
  educationItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  schoolName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  eduDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  majorDegree: {
    fontSize: 14,
    color: '#666',
  },
  eduTime: {
    fontSize: 13,
    color: '#999',
  },
  introduction: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  editSection: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  editSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  editForm: {
    gap: 12,
  },
  formItem: {
    marginBottom: 12,
  },
  formLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#1890ff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default JobScreen;
