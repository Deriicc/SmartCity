import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useApplications} from '../context/ApplicationContext';

const JobDetailPage = ({route, navigation}) => {
  const {addApplication} = useApplications();
  const {job} = route.params;

  const handleApply = () => {
    Alert.alert('确认投递', '是否确认投递简历？', [
      {text: '取消', style: 'cancel'},
      {
        text: '确认',
        onPress: () => {
          const newApplication = {
            id: Date.now().toString(),
            jobTitle: job.title,
            company: job.company,
            salary: job.salary,
            applyTime: new Date().toLocaleString(),
            status: '待回复',
            response: null,
          };

          console.log('Adding new application:', newApplication);

          addApplication(newApplication);

          Alert.alert('投递成功', '简历已投递，请等待企业回复', [
            {
              text: '确定',
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.salary}>{job.salary}</Text>
          <View style={styles.companyInfo}>
            <Text style={styles.company}>{job.company}</Text>
            <Text style={styles.location}>{job.location}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>职位亮点</Text>
          <View style={styles.tags}>
            {['五险一金', '双休', '年终奖', '加班补贴'].map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>职位要求</Text>
          <Text style={styles.content}>{job.requirements}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>工作职责</Text>
          <Text style={styles.content}>{job.responsibilities}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>公司介绍</Text>
          <Text style={styles.companyName}>{job.companyName}</Text>
          <Text style={styles.content}>{job.companyIntro}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>立即投递</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  salary: {
    fontSize: 22,
    color: '#ff4d4f',
    fontWeight: '600',
    marginTop: 4,
  },
  companyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  company: {
    fontSize: 16,
    color: '#333',
    marginRight: 15,
    fontWeight: '500',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -4,
  },
  tag: {
    backgroundColor: '#f0f7ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginRight: 8,
    marginTop: 8,
  },
  tagText: {
    color: '#1890ff',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    fontSize: 15,
    color: '#4a4a4a',
    lineHeight: 24,
    marginTop: 4,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  footer: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
  },
  applyButton: {
    backgroundColor: '#1890ff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
});

export default JobDetailPage;
