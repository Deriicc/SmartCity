import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CommunityServiceScreen = ({navigation}: any) => {
  const [selectedCommunity, setSelectedCommunity] = useState('幸福小区');

  const communityServices = [
    {
      id: '1',
      title: '生活缴费',
      icon: 'cash-multiple',
      color: '#1890ff',
      items: [
        {id: '1-1', name: '水费', icon: 'water'},
        {id: '1-2', name: '电费', icon: 'flash'},
        {id: '1-3', name: '燃气费', icon: 'fire'},
        {id: '1-4', name: '物业费', icon: 'home'},
      ],
    },
    {
      id: '2',
      title: '便民服务',
      icon: 'account-group',
      color: '#52c41a',
      items: [
        {id: '2-1', name: '社保查询', icon: 'shield-check'},
        {id: '2-2', name: '公积金', icon: 'bank'},
        {id: '2-3', name: '垃圾分类', icon: 'delete'},
        {id: '2-4', name: '天气预报', icon: 'weather-partly-cloudy'},
      ],
    },
    {
      id: '3',
      title: '社区活动',
      icon: 'calendar-month',
      color: '#722ed1',
      items: [
        {id: '3-1', name: '活动报名', icon: 'clipboard-text'},
        {id: '3-2', name: '投票调查', icon: 'vote'},
        {id: '3-3', name: '志愿服务', icon: 'hand-heart'},
        {id: '3-4', name: '邻里互助', icon: 'account-multiple-check'},
      ],
    },
    {
      id: '4',
      title: '物业服务',
      icon: 'home-city',
      color: '#eb2f96',
      items: [
        {id: '4-1', name: '报修服务', icon: 'tools'},
        {id: '4-2', name: '访客登记', icon: 'account-key'},
        {id: '4-3', name: '快递代收', icon: 'package-variant'},
        {id: '4-4', name: '建议投诉', icon: 'message-alert'},
      ],
    },
  ];

  const weatherInfo = {
    temperature: '26°C',
    weather: '多云',
    aqi: '优',
    humidity: '65%',
  };

  return (
    <ScrollView style={styles.container}>
      {/* 社区选择 */}
      <View style={styles.communityHeader}>
        <View style={styles.communitySelector}>
          <Icon name="home-city" size={24} color="#1890ff" />
          <Text style={styles.communityName}>{selectedCommunity}</Text>
          <Icon name="chevron-down" size={20} color="#666" />
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="bell" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* 天气信息 */}
      <View style={styles.weatherCard}>
        <View style={styles.weatherMain}>
          <Icon name="weather-partly-cloudy" size={40} color="#1890ff" />
          <Text style={styles.temperature}>{weatherInfo.temperature}</Text>
        </View>
        <View style={styles.weatherDetails}>
          <Text style={styles.weatherText}>{weatherInfo.weather}</Text>
          <Text style={styles.weatherText}>空气{weatherInfo.aqi}</Text>
          <Text style={styles.weatherText}>湿度{weatherInfo.humidity}</Text>
        </View>
      </View>

      {/* 服务分类 */}
      {communityServices.map(category => (
        <View key={category.id} style={styles.serviceCategory}>
          <View style={styles.categoryHeader}>
            <Icon name={category.icon} size={20} color={category.color} />
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </View>
          <View style={styles.serviceGrid}>
            {category.items.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.serviceItem}
                onPress={() => {
                  if (item.route) {
                    navigation.navigate(item.route);
                  } else {
                    navigation.navigate(item.name);
                  }
                }}>
                <View
                  style={[
                    styles.serviceIcon,
                    {backgroundColor: `${category.color}15`},
                  ]}>
                  <Icon name={item.icon} size={24} color={category.color} />
                </View>
                <Text style={styles.serviceName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* 社区公告 */}
      <View style={styles.noticeSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>社区公告</Text>
          <TouchableOpacity>
            <Text style={styles.moreText}>更多</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.noticeList}>
          <TouchableOpacity style={styles.noticeItem}>
            <Icon name="bullhorn" size={16} color="#1890ff" />
            <Text style={styles.noticeText} numberOfLines={1}>
              关于本周六进行小区环境消杀的通知
            </Text>
            <Text style={styles.noticeDate}>03-20</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noticeItem}>
            <Icon name="bullhorn" size={16} color="#1890ff" />
            <Text style={styles.noticeText} numberOfLines={1}>
              电梯年度维护检修安排
            </Text>
            <Text style={styles.noticeDate}>03-19</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  communityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  communitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityName: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 8,
    color: '#333',
  },
  notificationButton: {
    padding: 8,
  },
  weatherCard: {
    margin: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weatherMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 32,
    fontWeight: '500',
    marginLeft: 10,
    color: '#333',
  },
  weatherDetails: {
    flexDirection: 'row',
    gap: 15,
  },
  weatherText: {
    fontSize: 14,
    color: '#666',
  },
  serviceCategory: {
    marginBottom: 15,
    backgroundColor: '#fff',
    padding: 15,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
    color: '#333',
  },
  serviceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  serviceItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 15,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 12,
    color: '#666',
  },
  noticeSection: {
    margin: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  moreText: {
    fontSize: 14,
    color: '#1890ff',
  },
  noticeList: {
    gap: 10,
  },
  noticeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  noticeDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default CommunityServiceScreen;
