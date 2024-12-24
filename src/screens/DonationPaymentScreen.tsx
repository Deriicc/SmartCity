import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const predefinedAmounts = [10, 50, 100, 500, 1000];

const DonationPaymentScreen = ({route, navigation}: any) => {
  const {project} = route.params;
  const [amount, setAmount] = useState('');
  const [selectedPayMethod, setSelectedPayMethod] = useState('alipay');

  // 验证输入金额
  const validateAmount = (value: string) => {
    // 只允许数字和小数点
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value) || value === '') {
      // 移除前导零
      if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
        setAmount(value.slice(1));
      } else {
        setAmount(value);
      }
    }
  };

  // 验证最终金额
  const validateFinalAmount = () => {
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount)) {
      Alert.alert('提示', '请输入有效的捐款金额');
      return false;
    }
    if (numAmount <= 0) {
      Alert.alert('提示', '捐款金额必须大于0');
      return false;
    }
    if (numAmount > 50000) {
      Alert.alert('提示', '单次捐款金额不能超过50000元');
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    if (!validateFinalAmount()) {
      return;
    }

    Alert.alert(
      '确认支付',
      `确认通过${
        selectedPayMethod === 'alipay' ? '支付宝' : '微信'
      }支付 ¥${amount}？`,
      [
        {
          text: '取消',
          style: 'cancel',
        },
        {
          text: '确认',
          onPress: () => {
            // TODO: 这里添加实际支付逻辑
            Alert.alert('支付成功', '感谢您的爱心捐款！', [
              {
                text: '确定',
                onPress: () => navigation.goBack(),
              },
            ]);
          },
        },
      ],
    );
  };

  // 处理预设金额选择
  const handlePredefinedAmount = (value: number) => {
    setAmount(value.toString());
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.title}>爱心捐款</Text>
        <Text style={styles.projectTitle}>{project.title}</Text>

        <View style={styles.amountSection}>
          <Text style={styles.sectionTitle}>捐款金额</Text>
          <View style={styles.amountGrid}>
            {predefinedAmounts.map(value => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.amountButton,
                  amount === String(value) && styles.selectedAmount,
                ]}
                onPress={() => handlePredefinedAmount(value)}>
                <Text
                  style={[
                    styles.amountButtonText,
                    amount === String(value) && styles.selectedAmountText,
                  ]}>
                  ¥{value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput
            style={styles.customAmount}
            placeholder="输入其他金额"
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={validateAmount}
            maxLength={8} // 限制最大输入长度
          />
          <Text style={styles.amountHint}>
            单次捐款金额限制：¥0.01 - ¥50,000
          </Text>
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>支付方式</Text>
          <TouchableOpacity
            style={[
              styles.paymentMethod,
              selectedPayMethod === 'alipay' && styles.selectedPayment,
            ]}
            onPress={() => setSelectedPayMethod('alipay')}>
            <Icon name="alpha-a-circle" size={24} color="#1677FF" />
            <Text style={styles.paymentText}>支付宝</Text>
            {selectedPayMethod === 'alipay' && (
              <Icon
                name="check-circle"
                size={20}
                color="#1890ff"
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.paymentMethod,
              selectedPayMethod === 'wechat' && styles.selectedPayment,
            ]}
            onPress={() => setSelectedPayMethod('wechat')}>
            <Icon name="wechat" size={24} color="#07C160" />
            <Text style={styles.paymentText}>微信支付</Text>
            {selectedPayMethod === 'wechat' && (
              <Icon
                name="check-circle"
                size={20}
                color="#1890ff"
                style={styles.checkIcon}
              />
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!amount || parseFloat(amount) <= 0) && styles.submitButtonDisabled,
          ]}
          onPress={handlePayment}
          disabled={!amount || parseFloat(amount) <= 0}>
          <Text style={styles.submitButtonText}>确认支付 ¥{amount || '0'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 15,
  },
  amountSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  amountButton: {
    width: '30%',
    margin: '1.5%',
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    alignItems: 'center',
  },
  selectedAmount: {
    borderColor: '#1890ff',
    backgroundColor: '#e6f7ff',
  },
  amountButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedAmountText: {
    color: '#1890ff',
  },
  customAmount: {
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  paymentSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f5f7fa',
  },
  selectedPayment: {
    backgroundColor: '#e6f7ff',
  },
  paymentText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  checkIcon: {
    marginLeft: 'auto',
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  submitButton: {
    backgroundColor: '#1890ff',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  amountHint: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default DonationPaymentScreen;
