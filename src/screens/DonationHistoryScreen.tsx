import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DonationRecord {
  id: string;
  projectId: string;
  projectTitle: string;
  projectImage: string;
  amount: number;
  date: string;
  paymentMethod: 'alipay' | 'wechat';
  status: 'success' | 'pending' | 'failed';
  certificateId?: string;
}

const DonationHistoryScreen = ({navigation}: any) => {
  const [donationRecords, setDonationRecords] = useState<DonationRecord[]>([]);

  useEffect(() => {
    const loadDonationRecords = async () => {
      try {
        const records = await AsyncStorage.getItem('donationRecords');
        if (records) {
          setDonationRecords(JSON.parse(records));
        }
      } catch (error) {
        console.error('加载捐款记录失败:', error);
      }
    };

    loadDonationRecords();

    // 添加导航监听器，以便在返回此页面时刷新数据
    const unsubscribe = navigation.addListener('focus', () => {
      loadDonationRecords();
    });

    return unsubscribe;
  }, [navigation]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return '#52c41a';
      case 'pending':
        return '#faad14';
      case 'failed':
        return '#ff4d4f';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success':
        return '捐款成功';
      case 'pending':
        return '处理中';
      case 'failed':
        return '捐款失败';
      default:
        return '未知状态';
    }
  };

  const renderItem = ({item}: {item: DonationRecord}) => (
    <TouchableOpacity
      style={styles.recordCard}
      onPress={() => {
        if (item.status === 'success') {
          console.log('Navigating to DonationCertificate');
          navigation.navigate('DonationCertificate', {record: item});
        }
      }}>
      <Image source={{uri: item.projectImage}} style={styles.projectImage} />
      <View style={styles.recordInfo}>
        <Text style={styles.projectTitle} numberOfLines={1}>
          {item.projectTitle}
        </Text>
        <View style={styles.recordDetails}>
          <Text style={styles.amount}>¥{item.amount.toFixed(2)}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View style={styles.recordFooter}>
          <View style={styles.paymentMethod}>
            <Icon
              name={
                item.paymentMethod === 'alipay' ? 'alpha-a-circle' : 'wechat'
              }
              size={16}
              color={item.paymentMethod === 'alipay' ? '#1677FF' : '#07C160'}
            />
            <Text style={styles.paymentText}>
              {item.paymentMethod === 'alipay' ? '支付宝' : '微信支付'}
            </Text>
          </View>
          <View
            style={[
              styles.statusTag,
              {backgroundColor: `${getStatusColor(item.status)}20`},
            ]}>
            <Text
              style={[styles.statusText, {color: getStatusColor(item.status)}]}>
              {getStatusText(item.status)}
            </Text>
          </View>
        </View>
      </View>
      <Icon name="chevron-right" size={20} color="#ccc" />
      {item.status === 'success' && (
        <TouchableOpacity
          style={styles.certificateButton}
          onPress={e => {
            e.stopPropagation();
            console.log('Navigating to DonationCertificate from button');
            navigation.navigate('DonationCertificate', {record: item});
          }}>
          <Icon name="certificate" size={16} color="#1890ff" />
          <Text style={styles.certificateText}>查看证书</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={donationRecords}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  listContainer: {
    padding: 15,
  },
  recordCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  projectImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  recordInfo: {
    flex: 1,
    marginLeft: 12,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  recordDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1890ff',
    marginRight: 10,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  recordFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  statusTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 12,
  },
  certificateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f7ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  certificateText: {
    fontSize: 12,
    color: '#1890ff',
    marginLeft: 4,
  },
});

export default DonationHistoryScreen;
