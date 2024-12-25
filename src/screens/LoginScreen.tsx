import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  username: string;
  password: string;
  phone: string;
  email: string;
  registerTime: string;
}

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // 处理倒计时
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        Alert.alert('错误', '请输入用户名和密码');
        return;
      }

      const usersJSON = await AsyncStorage.getItem('users');
      const users: Record<string, User> = usersJSON
        ? JSON.parse(usersJSON)
        : {};

      if (users[username]?.password === password) {
        navigation.replace('MainApp');
      } else {
        Alert.alert('错误', '用户名或密码错误');
      }
    } catch (error) {
      Alert.alert('错误', '登录失败');
      console.error(error);
    }
  };

  const handleSendVerificationCode = async () => {
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('错误', '请输入有效的邮箱地址');
      return;
    }

    try {
      setIsLoading(true);
      // 这里替换成您的实际API地���
      const response = await fetch('http://10.0.2.2:3000/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      });

      const data = await response.json();

      if (data.success) {
        Alert.alert('成功', '验证码已发送到您的邮箱');
        setCountdown(60); // 开始60秒倒计时
      } else {
        Alert.alert('错误', data.message || '发送失败，请稍后重试');
      }
    } catch (error) {
      Alert.alert('错误', '网络错误，请稍后重试');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateInputs = () => {
    if (!username || !password || !phone || !email || !verificationCode) {
      Alert.alert('错误', '请填写所有必填信息');
      return false;
    }

    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('错误', '请输入有效的手机号');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('错误', '请输入有效的邮箱地址');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    try {
      if (!validateInputs()) {
        return;
      }

      console.log('提交验证:', {email, verificationCode}); // 添加日志

      const response = await fetch('http://10.0.2.2:3000/verify-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          code: verificationCode, // 确保这里传递的是验证码
        }),
      });

      const data = await response.json();
      console.log('验证响应:', data); // 添加日志

      if (!data.success) {
        Alert.alert('错误', data.message);
        return;
      }

      // 验证码正确，继续注册流程
      const usersJSON = await AsyncStorage.getItem('users');
      const users = usersJSON ? JSON.parse(usersJSON) : {};

      if (users[username]) {
        Alert.alert('错误', '该用户名已被注册');
        return;
      }

      const newUser = {
        username,
        password,
        phone,
        email,
        registerTime: new Date().toISOString(),
      };

      users[username] = newUser;
      await AsyncStorage.setItem('users', JSON.stringify(users));

      Alert.alert('成功', '注册成功！请登录');
      setIsRegistering(false);
      clearInputs();
    } catch (error) {
      console.error('注册错误:', error); // 添加日志
      Alert.alert('错误', '注册失败');
    }
  };

  const clearInputs = () => {
    setUsername('');
    setPassword('');
    setPhone('');
    setEmail('');
    setVerificationCode('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {isRegistering ? '创建账号' : '智慧城市'}
        </Text>
        <Text style={styles.subtitle}>
          {isRegistering ? '请填写以下信息完成注册' : '请登录您的账号'}
        </Text>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="用户名"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="密码"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />

          {isRegistering && (
            <>
              <TextInput
                style={styles.input}
                placeholder="手机号"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholderTextColor="#999"
              />
              <TextInput
                style={styles.input}
                placeholder="邮箱"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                placeholderTextColor="#999"
              />
              <View style={styles.verificationContainer}>
                <TextInput
                  style={[styles.input, styles.verificationInput]}
                  placeholder="验证码"
                  value={verificationCode}
                  onChangeText={setVerificationCode}
                  keyboardType="number-pad"
                  placeholderTextColor="#999"
                />
                <TouchableOpacity
                  style={[
                    styles.sendCodeButton,
                    (isLoading || countdown > 0) &&
                      styles.sendCodeButtonDisabled,
                  ]}
                  onPress={handleSendVerificationCode}
                  disabled={isLoading || countdown > 0}>
                  <Text
                    style={[
                      styles.sendCodeText,
                      (isLoading || countdown > 0) &&
                        styles.sendCodeTextDisabled,
                    ]}>
                    {isLoading
                      ? '发送中...'
                      : countdown > 0
                      ? `${countdown}秒后重试`
                      : '获取验证码'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        <View style={styles.buttonContainer}>
          {!isRegistering ? (
            <>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLogin}>
                <Text style={styles.buttonText}>登 录</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => setIsRegistering(true)}>
                <Text style={styles.switchButtonText}>
                  还没有账号？立即注册
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.loginButton, styles.registerButton]}
                onPress={handleRegister}>
                <Text style={styles.buttonText}>注 册</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.switchButton}
                onPress={() => {
                  setIsRegistering(false);
                  clearInputs();
                }}>
                <Text style={styles.switchButtonText}>已有账号？返回登录</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 24,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  verificationContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  verificationInput: {
    flex: 1,
    marginBottom: 0,
  },
  sendCodeButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1890ff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  sendCodeText: {
    color: '#1890ff',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    gap: 16,
  },
  loginButton: {
    height: 50,
    backgroundColor: '#1890ff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1890ff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  registerButton: {
    backgroundColor: '#52c41a',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchButton: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchButtonText: {
    color: '#1890ff',
    fontSize: 15,
  },
  sendCodeButtonDisabled: {
    borderColor: '#d9d9d9',
    backgroundColor: '#f5f5f5',
  },
  sendCodeTextDisabled: {
    color: '#999',
  },
});

export default LoginScreen;
