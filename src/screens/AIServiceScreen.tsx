import React, {useState, useRef} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// 添加 API 配置
const API_CONFIG = {
  BASE_URL: 'http://chatapi.littlewheat.com/v1',
  API_KEY: 'sk-mMcqJjsnxC15hvr651PrNU2nITqCaAyadEDVGJSkpvH5sEZk', // 请替换为你的实际 API key
};

const AIServiceScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');
  const scrollViewRef = useRef(null);
  const textInputRef = useRef(null);
  const typingSpeedRef = useRef(20);

  const typeMessage = async (fullMessage: string) => {
    setTypingMessage('');
    for (let i = 0; i <= fullMessage.length; i++) {
      setTypingMessage(fullMessage.slice(0, i));
      await new Promise(resolve => setTimeout(resolve, typingSpeedRef.current));
    }
    return fullMessage;
  };

  const renderMessage = (message, index) => {
    const isLastMessage = index === messages.length - 1;
    const displayText =
      isLastMessage && !message.isUser ? typingMessage : message.text;

    return (
      <View
        key={index}
        style={[
          styles.messageContainer,
          {alignItems: message.isUser ? 'flex-end' : 'flex-start'},
        ]}>
        <View
          style={[
            styles.messageBubble,
            message.isUser ? styles.userBubble : styles.aiBubble,
          ]}>
          <Text
            style={[
              styles.messageText,
              message.isUser ? styles.userMessageText : styles.aiMessageText,
            ]}>
            {displayText}
          </Text>
          <Text style={[styles.timeText, !message.isUser && {color: '#999'}]}>
            {new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };

  const sendMessageToAI = async (userMessage: string) => {
    try {
      console.log('Sending message to AI:', userMessage);

      const response = await fetch(`${API_CONFIG.BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_CONFIG.API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `你是一个专属的AI助手，请记住以下信息：

1. 用户信息：
- 姓名：[你的姓名]
- 所在社区：[你的社区名称]
- 房号：[你的房号]
- 常用联系方式：[你的联系方式]

2. 个性化设置：
- 称呼用户为：[你喜欢的称呼]
- 回复风格：专业、简洁、友善
- 优先关注：[你最关心的事项，如：社区活动、物业服务等]

3. 你的主要职责：
- 记住用户的个人信息和偏好
- 提供个性化的社区服务建议
- 跟踪用户之前的问题和需求
- 主动提醒用户相关的社区活动和通知
- 协助处理日常事务和问题咨询

4. 互动原则：
- 称呼要亲切自然
- 记住用户的习惯和偏好
- 在合适的时候提供个性化建议
- 对用户提到的重要信息要记录并在后续对话中适时提醒
- 保护用户隐私，不向其他人透露用户信息

5. 特殊说明：
- 如果用户提到新的个人信息，要记住并在后续对话中使用
- 要记住用户之前提过的问题和偏好
- 在提供建议时要考虑用户的具体情况
- 主动关心用户的需求变化`,
            },
            {
              role: 'user',
              content: userMessage,
            },
          ],
          temperature: 0.7,
        }),
      });

      console.log('Response status:', response.status); // 调试日志

      if (!response.ok) {
        const errorData = await response.text();
        console.error('API Error:', errorData);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('AI response data:', data); // 调试日志

      // 从响应中提取消息内容
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Detailed error:', error); // 详细错误日志
      throw error;
    }
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      const userMessage = inputText.trim();
      setInputText('');

      // 添加用户消息
      setMessages(prev => [...prev, {text: userMessage, isUser: true}]);

      try {
        setIsLoading(true);
        const aiResponse = await sendMessageToAI(userMessage);

        // 添加 AI 消息占位符
        setMessages(prev => [...prev, {text: '', isUser: false}]);

        // 开始打字机效果
        await typeMessage(aiResponse);

        // 更新最终消息
        setMessages(prev => [
          ...prev.slice(0, -1),
          {text: aiResponse, isUser: false},
        ]);
      } catch (error) {
        console.error('Send message error:', error);
        Alert.alert('错误', '发送消息失败，请检查网络连接后重试。', [
          {text: '确定'},
        ]);
      } finally {
        setIsLoading(false);
        scrollViewRef.current?.scrollToEnd({animated: true});
      }
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        enabled={Platform.OS === 'ios'}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.scrollContent}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled">
          {messages.map((message, index) => renderMessage(message, index))}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator color="#1890ff" size="small" />
              <Text style={styles.loadingText}>AI正在思考...</Text>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              ref={textInputRef}
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="请输入您的问题..."
              placeholderTextColor="#999"
              multiline
              maxHeight={100}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !inputText.trim() && styles.sendButtonDisabled,
              ]}
              onPress={handleSend}
              disabled={!inputText.trim() || isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Icon name="send" size={24} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  messagesContainer: {
    flex: 1,
  },
  messageContainer: {
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.15,
    shadowRadius: 1,
  },
  userBubble: {
    backgroundColor: '#1890ff',
    borderBottomRightRadius: 5,
    marginLeft: 60,
  },
  aiBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 5,
    marginRight: 60,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userMessageText: {
    color: '#fff',
  },
  aiMessageText: {
    color: '#333',
  },
  timeText: {
    fontSize: 11,
    marginTop: 4,
    opacity: 0.7,
    color: '#fff',
    textAlign: 'right',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
  },
  loadingText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  inputWrapper: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingTop: 10,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 20,
    maxHeight: 100,
    minHeight: 40,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1890ff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default AIServiceScreen;
