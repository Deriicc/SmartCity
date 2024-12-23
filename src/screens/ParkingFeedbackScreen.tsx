import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 模拟历史反馈数据
const initialFeedbacks = [
  {
    id: '1',
    title: '停车位标识不清',
    content: '地下停车场的停车位标识不够清晰，建议重新粉刷',
    time: '2024-03-15 14:30',
    status: '已处理',
  },
  {
    id: '2',
    title: '收费问题',
    content: '建议增加支付宝支付方式',
    time: '2024-03-14 10:20',
    status: '处理中',
  },
];

const ParkingFeedbackScreen = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('提示', '请填写完整信息');
      return;
    }
    Alert.alert('成功', '反馈已提交', [
      {
        text: '确定',
        onPress: () => {
          setTitle('');
          setContent('');
        },
      },
    ]);
  };

  const renderFeedback = ({item}) => (
    <View style={styles.feedbackItem}>
      <Text style={styles.feedbackTitle}>{item.title}</Text>
      <Text style={styles.feedbackContent}>{item.content}</Text>
      <View style={styles.feedbackFooter}>
        <Text style={styles.feedbackTime}>{item.time}</Text>
        <Text
          style={[
            styles.feedbackStatus,
            {color: item.status === '已处理' ? '#52c41a' : '#1890ff'},
          ]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!showHistory ? (
        // 反馈表单
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>标题</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="请输入反馈标题"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>内容</Text>
            <TextInput
              style={styles.contentInput}
              value={content}
              onChangeText={setContent}
              placeholder="请详细描述您的问题或建议"
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>提交</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => setShowHistory(true)}>
            <Icon name="history" size={20} color="#666" />
            <Text style={styles.historyText}>历史记录</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // 历史记录列表
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>历史反馈</Text>
            <TouchableOpacity onPress={() => setShowHistory(false)}>
              <Text style={styles.backText}>返回</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={initialFeedbacks}
            renderItem={renderFeedback}
            keyExtractor={item => item.id}
            style={styles.list}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 15,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  contentInput: {
    backgroundColor: '#fff',
    height: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
  },
  submitButton: {
    backgroundColor: '#1890ff',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  historyText: {
    color: '#666',
    marginLeft: 8,
  },
  historyContainer: {
    flex: 1,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  backText: {
    color: '#1890ff',
  },
  list: {
    padding: 15,
  },
  feedbackItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  feedbackContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  feedbackFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedbackTime: {
    fontSize: 12,
    color: '#999',
  },
  feedbackStatus: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ParkingFeedbackScreen;
