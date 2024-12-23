import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

interface Exhibition {
  id: string;
  title: string;
  description: string;
  image: {uri: string};
  date: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'ended';
  registrationDeadline: string;
  organizer: string;
  scale: string;
  fee: string;
  contact: string;
  highlights: string[];
}

interface NavigationProps {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

// 模拟数据
const exhibition: Exhibition = {
  id: '1',
  title: '2024智能制造展',
  description: '展示最新工业自动化技术和智能制造解决方案',
  image: {
    uri: 'https://images.pexels.com/photos/3846766/pexels-photo-3846766.jpeg',
  },
  date: '2024-05-15 至 2024-05-18',
  location: '北京国际展览中心',
  status: 'upcoming',
  registrationDeadline: '2024-04-30',
  organizer: '中国工业协会',
  scale: '50,000平方米',
  fee: '免费',
  contact: '010-88888888',
  highlights: [
    '展示最新工业自动化设备和解决方案',
    '行业专家技术交流论坛',
    '现场技术演示和互动体验',
    '企业对接交流活动',
  ],
};

const ExhibitionDetailScreen = ({
  navigation,
  route,
}: {
  navigation: NavigationProps;
  route: {params: {id: string}};
}) => {
  const getStatusColor = (status: Exhibition['status']) => {
    switch (status) {
      case 'upcoming':
        return '#52c41a';
      case 'ongoing':
        return '#1890ff';
      case 'ended':
        return '#999';
    }
  };

  const getStatusText = (status: Exhibition['status']) => {
    switch (status) {
      case 'upcoming':
        return '即将开始';
      case 'ongoing':
        return '进行中';
      case 'ended':
        return '已结束';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={exhibition.image} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{exhibition.title}</Text>

        <View style={styles.statusContainer}>
          <Text
            style={[
              styles.status,
              {color: getStatusColor(exhibition.status)},
            ]}>{`${getStatusText(exhibition.status)}`}</Text>
          {exhibition.status === 'upcoming' && (
            <Text style={styles.deadline}>
              报名截止：{exhibition.registrationDeadline}
            </Text>
          )}
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Icon name="calendar" size={20} color="#666" />
            <Text style={styles.infoText}>{exhibition.date}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="map-marker" size={20} color="#666" />
            <Text style={styles.infoText}>{exhibition.location}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="account-group" size={20} color="#666" />
            <Text style={styles.infoText}>主办方：{exhibition.organizer}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="ruler-square" size={20} color="#666" />
            <Text style={styles.infoText}>展览规模：{exhibition.scale}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="currency-usd" size={20} color="#666" />
            <Text style={styles.infoText}>参展费用：{exhibition.fee}</Text>
          </View>
          <View style={styles.infoItem}>
            <Icon name="phone" size={20} color="#666" />
            <Text style={styles.infoText}>联系电话：{exhibition.contact}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>展会介绍</Text>
          <Text style={styles.description}>{exhibition.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>展会亮点</Text>
          {exhibition.highlights.map((highlight, index) => (
            <View key={index} style={styles.highlightItem}>
              <Icon name="check-circle" size={16} color="#52c41a" />
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>
      </View>

      {exhibition.status === 'upcoming' && (
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() =>
            navigation.navigate('ExhibitionRegistration', {id: exhibition.id})
          }>
          <Text style={styles.registerButtonText}>立即报名</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: width,
    height: width * 0.6,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 15,
  },
  deadline: {
    fontSize: 14,
    color: '#f50',
  },
  infoSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  registerButton: {
    backgroundColor: '#1890ff',
    margin: 15,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExhibitionDetailScreen;
