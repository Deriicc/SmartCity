import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

// 模拟数据
const complaintDetail = {
  id: '1',
  title: '小区路灯不亮',
  content: '小区内多处路灯损坏，夜间存在安全隐患，希望能尽快修复。',
  images: [
    'https://images.pexels.com/photos/1123982/pexels-photo-1123982.jpeg',
    'https://images.pexels.com/photos/1123983/pexels-photo-1123983.jpeg',
  ],
  department: '市政维修部门',
  submitTime: '2024-03-15 14:30',
  status: '处理中',
  result: '已安排维修人员处理，预计3个工作日内完成维修。',
};

const ComplaintDetailScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>{complaintDetail.title}</Text>
        <Text style={styles.time}>{complaintDetail.submitTime}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>诉求内容</Text>
        <Text style={styles.content}>{complaintDetail.content}</Text>
      </View>

      {complaintDetail.images.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.label}>相关图片</Text>
          <ScrollView horizontal style={styles.imageContainer}>
            {complaintDetail.images.map((image, index) => (
              <Image
                key={index}
                source={{uri: image}}
                style={styles.image}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.label}>承办单位</Text>
        <Text style={styles.text}>{complaintDetail.department}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>处理状态</Text>
        <Text style={[styles.status, {color: '#1890ff'}]}>
          {complaintDetail.status}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>处理结果</Text>
        <Text style={styles.text}>{complaintDetail.result}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    flexDirection: 'row',
    marginHorizontal: -15,
    paddingHorizontal: 15,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 10,
    borderRadius: 4,
  },
});

export default ComplaintDetailScreen;
