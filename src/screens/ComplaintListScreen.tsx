import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ComplaintListScreen = ({navigation, route}) => {
  const {category} = route.params;
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const savedComplaints = await AsyncStorage.getItem('complaints');
        if (savedComplaints) {
          const allComplaints = JSON.parse(savedComplaints);
          // 根据类别筛选诉求
          const filteredComplaints = allComplaints.filter(
            complaint => complaint.category === category,
          );
          setComplaints(filteredComplaints);
        }
      } catch (error) {
        console.error('加载诉求失败:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadComplaints);
    loadComplaints();
    return unsubscribe;
  }, [navigation, category]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={complaints}
        renderItem={({item}) => (
          <TouchableOpacity
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
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => navigation.navigate('NewComplaint', {category})}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  complaintItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 1,
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
  fabButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1890ff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default ComplaintListScreen;
