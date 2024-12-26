import React, {useState, useRef, useEffect} from 'react';
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
import Markdown from 'react-native-markdown-display';

// 修改 API 配置
const API_CONFIG = {
  BASE_URL: 'https://chatapi.littlewheat.com/v1',
  API_KEY: 'sk-mMcqJjsnxC15hvr651PrNU2nITqCaAyadEDVGJSkpvH5sEZk',
};

// 导入工作数据
import {jobData} from '../data/jobData';

const SYSTEM_PROMPT = {
  role: 'system',
  content: `你是一个专业的求职顾问AI助手。你可以访问以下工作岗位数据：

${JSON.stringify(jobData, null, 2)}

当用户询问找工作或描述自己的求职需求时：

1. 分析用户的描述，关注以下关键信息：
   - 技能背景
   - 工作经验
   - 期望职位
   - 期望薪资
   - 期望地点

2. 从提供的工作数据中，精确匹配最适合的职位：
   - 将职位要求与用户背景进行匹配
   - 考虑薪资范围是否符合用户期望
   - 确认工作地点是否符合用户要求

3. 推荐职位时：
   - 列出匹配度最高的职位详细信息
   - 解释为什么这些职位适合用户
   - 提供该职位的联系方式和投递建议

请以专业、友好的方式与用户交流，准确推荐符合用户背景的职位。如果没有完全匹配的职位，告诉用户原因并建议其他可能的选择。`,
};

interface Message {
  text: string;
  isUser: boolean;
}

const AIServiceScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');
  const scrollViewRef = useRef<ScrollView | null>(null);
  const textInputRef = useRef(null);
  const typingSpeedRef = useRef(20);

  useEffect(() => {
    const welcomeMessage =
      '您好！我是您的求职顾问AI助手。请告诉我您的求职需求，包括您的技能背景、工作经验、期望职位、薪资和地点，我会为您推荐最合适的职位。';
    setMessages([{text: welcomeMessage, isUser: false}]);
    typeMessage(welcomeMessage);
  }, []);

  const typeMessage = async (fullMessage: string) => {
    setTypingMessage('');
    for (let i = 0; i <= fullMessage.length; i++) {
      setTypingMessage(fullMessage.slice(0, i));
      scrollViewRef.current?.scrollToEnd({animated: false});
      await new Promise(resolve => setTimeout(resolve, typingSpeedRef.current));
    }
    return fullMessage;
  };

  const renderMessage = (message: Message, index: number) => {
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
          {message.isUser ? (
            <Text style={[styles.messageText, styles.userMessageText]}>
              {displayText}
            </Text>
          ) : (
            <Markdown
              style={{
                body: styles.aiMessageText,
                heading1: {
                  ...styles.aiMessageText,
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  marginTop: 16,
                },
                heading2: {
                  ...styles.aiMessageText,
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 8,
                  marginTop: 14,
                },
                paragraph: {
                  ...styles.aiMessageText,
                  marginBottom: 10,
                },
                list: {
                  ...styles.aiMessageText,
                  marginBottom: 10,
                },
                listItem: {
                  ...styles.aiMessageText,
                  marginBottom: 6,
                },
                listItemBullet: {
                  marginRight: 8,
                },
              }}>
              {displayText}
            </Markdown>
          )}
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
            SYSTEM_PROMPT,
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
        Alert.alert('错误', '发送消息失败，请检查网络连接重试。', [
          {text: '确定'},
        ]);
      } finally {
        setIsLoading(false);
        scrollViewRef.current?.scrollToEnd({animated: true});
      }
    }
  };

  const onInputFocus = () => {
    // 给输入框一点时间获得焦点
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({animated: true});
    }, 100);
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
              onFocus={onInputFocus}
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
                <Icon name="arrow-forward" size={20} color="#fff" />
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
    fontSize: 16,
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
