import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Exhibition {
  id: string;
  title: string;
  description: string;
  image: {uri: string};
  date: string;
  location: string;
  status: 'upcoming' | 'ongoing' | 'ended';
  registrationDeadline: string;
}

// 模拟数据
const exhibitions: Exhibition[] = [
  {
    id: '2',
    title: '2024世界智能制造博览会',
    description: '全球智能制造技术与解决方案展示交流平台',
    image: require('../../assets/image1.png'),
    date: '2024-12-10 至 2024-12-22',
    location: '南京国际博览中心',
    status: 'upcoming',
    registrationDeadline: '2024-05-31',
  },
  {
    id: '3',
    title: '2024世界智能网联汽车大会（WICV）',
    description: '展示智能网联汽车最新技术发展与应用',
    image: require('../../assets/image2.png'),
    date: '2024-07-15 至 2024-07-18',
    location: '上海国家会展中心',
    status: 'upcoming',
    registrationDeadline: '2024-06-30',
  },
];

const ExhibitionListScreen = ({navigation}) => {
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

  const renderExhibition = ({item}: {item: Exhibition}) => (
    <TouchableOpacity
      style={styles.exhibitionItem}
      onPress={() => navigation.navigate('ExhibitionDetail', {id: item.id})}>
      <Image source={item.image} style={styles.exhibitionImage} />
      <View style={styles.exhibitionInfo}>
        <Text style={styles.exhibitionTitle}>{item.title}</Text>
        <Text style={styles.exhibitionDescription}>{item.description}</Text>
        <View style={styles.exhibitionDetails}>
          <View style={styles.detailItem}>
            <Icon name="calendar" size={16} color="#666" />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Icon name="map-marker" size={16} color="#666" />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text
            style={[
              styles.status,
              {color: getStatusColor(item.status)},
            ]}>{`${getStatusText(item.status)}`}</Text>
          {item.status === 'upcoming' && (
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() =>
                navigation.navigate('ExhibitionRegistration', {id: item.id})
              }>
              <Text style={styles.registerButtonText}>立即报名</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={exhibitions}
        renderItem={renderExhibition}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 15,
  },
  exhibitionItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    overflow: 'hidden',
  },
  exhibitionImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  exhibitionInfo: {
    padding: 15,
  },
  exhibitionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  exhibitionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  exhibitionDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 15,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#1890ff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ExhibitionListScreen;
