import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ComplaintDetailScreen = ({route}) => {
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const loadComplaintDetail = async () => {
      try {
        const savedComplaints = await AsyncStorage.getItem('complaints');
        if (savedComplaints) {
          const complaints = JSON.parse(savedComplaints);
          const found = complaints.find(c => c.id === route.params.complaintId);
          if (found) {
            setComplaint(found);
          }
        }
      } catch (error) {
        console.error('加载诉求详情失败:', error);
      }
    };

    loadComplaintDetail();
  }, [route.params.complaintId]);

  if (!complaint) {
    return (
      <View style={styles.container}>
        <Text>加载中...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>{complaint.title}</Text>
        <Text style={styles.time}>{complaint.submitTime}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>诉求类别</Text>
        <Text style={styles.text}>{complaint.category}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>诉求内容</Text>
        <Text style={styles.content}>{complaint.content}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>地点位置</Text>
        <Text style={styles.text}>{complaint.location}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>联系电话</Text>
        <Text style={styles.text}>{complaint.phone}</Text>
      </View>

      {complaint.images && complaint.images.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.label}>相关图片</Text>
          <ScrollView horizontal style={styles.imageContainer}>
            {complaint.images.map((image, index) => (
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
        <Text style={styles.text}>{complaint.department}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>处理状态</Text>
        <Text style={[styles.status, {color: '#1890ff'}]}>
          {complaint.status}
        </Text>
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
