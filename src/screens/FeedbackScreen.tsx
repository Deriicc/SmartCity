import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

interface FeedbackScreenProps {
  navigation: {
    goBack: () => void;
  };
}

const FeedbackScreen = ({navigation}: FeedbackScreenProps) => {
  const [feedback, setFeedback] = useState('');
  const [contact, setContact] = useState('');

  const handleSubmit = () => {
    if (!feedback.trim()) {
      Alert.alert('提示', '请输入反馈内容');
      return;
    }
    Alert.alert('成功', '感谢您的反馈', [
      {
        text: '确定',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.feedbackInput}
        placeholder="请输入您的意见或建议"
        multiline
        numberOfLines={6}
        value={feedback}
        onChangeText={setFeedback}
      />
      <TextInput
        style={styles.contactInput}
        placeholder="联系方式（选填）"
        value={contact}
        onChangeText={setContact}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>提交反馈</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  feedbackInput: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  contactInput: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#1890ff',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FeedbackScreen;
