import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 模拟数据
const complaints = [
  {
    id: '1',
    title: '小区路灯不亮',
    department: '市政维修部门',
    submitTime: '2024-03-15 14:30',
    status: '处理中',
    completed: false,
  },
  {
    id: '2',
    title: '垃圾分类问题',
    department: '环保部门',
    submitTime: '2024-03-14 09:20',
    status: '已完成',
    completed: true,
  },
  // 更多数据...
];

const ComplaintListScreen = ({navigation, route}) => {
  const {category} = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={complaints}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.complaintItem}
            onPress={() =>
              navigation.navigate('ComplaintDetail', {id: item.id})
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
