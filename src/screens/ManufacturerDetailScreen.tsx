import React, {useState, useRef} from 'react';
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
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';

const {width} = Dimensions.get('window');

interface Manufacturer {
  id: string;
  name: string;
  description: string;
  image: {uri: string};
  category: string;
  location: string;
  establishedYear: string;
  scale: string;
  products: string[];
  certifications: string[];
  contact: {
    address: string;
    phone: string;
    email: string;
    website: string;
  };
}

// 模拟数据
const manufacturer: Manufacturer = {
  id: '1',
  name: '智能科技有限公司',
  description:
    '专注于工业自动化解决方案的高新技术企业，提供智能制造整体解决方案。',
  image: {
    uri: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg',
  },
  category: '自动化',
  location: '北京市',
  establishedYear: '2010年',
  scale: '500-1000人',
  products: [
    '工业机器人',
    '智能��产线',
    'AGV物流系统',
    'MES系统',
    '工业物联网平台',
  ],
  certifications: [
    'ISO9001质量管理体系认证',
    'ISO14001环境管理体系认证',
    '国家高新技术企业',
    '工业机器人生产许可证',
  ],
  contact: {
    address: '北京市海淀区科技园区888号',
    phone: '010-88888888',
    email: 'contact@smarttech.com',
    website: 'www.smarttech.com',
  },
};

interface NavigationProps {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

interface RouteProps {
  params: {
    id: string;
  };
}

interface Props {
  navigation: NavigationProps;
  route: RouteProps;
}

const ManufacturerDetailScreen: React.FC<Props> = ({navigation, route}) => {
  const [activeTab, setActiveTab] = useState('info'); // info, products, contact
  const [isPaused, setIsPaused] = useState(true);
  const videoRef = useRef(null);

  const onFullscreenPlayerWillPresent = () => {
    // 强制横屏
    Orientation.lockToLandscape();
  };

  const onFullscreenPlayerWillDismiss = () => {
    // 退出全屏时恢复竖屏
    Orientation.lockToPortrait();
  };

  const renderInfo = () => (
    <View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>企业简介</Text>
        <Text style={styles.description}>{manufacturer.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>基本信息</Text>
        <View style={styles.infoItem}>
          <Icon name="tag" size={20} color="#666" />
          <Text style={styles.infoText}>行业类别：{manufacturer.category}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="map-marker" size={20} color="#666" />
          <Text style={styles.infoText}>所在地区：{manufacturer.location}</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="calendar" size={20} color="#666" />
          <Text style={styles.infoText}>
            成立时间：{manufacturer.establishedYear}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="account-group" size={20} color="#666" />
          <Text style={styles.infoText}>企业规模：{manufacturer.scale}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>资质认证</Text>
        {manufacturer.certifications.map((cert, index) => (
          <View key={index} style={styles.certItem}>
            <Icon name="check-circle" size={16} color="#52c41a" />
            <Text style={styles.certText}>{cert}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderProducts = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>主营产品</Text>
      {manufacturer.products.map((product, index) => (
        <TouchableOpacity
          key={index}
          style={styles.productItem}
          onPress={() => navigation.navigate('ProductDetail', {id: index + 1})}>
          <Text style={styles.productName}>{product}</Text>
          <Icon name="chevron-right" size={20} color="#999" />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderContact = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>联系方式</Text>
      <View style={styles.contactItem}>
        <Icon name="map-marker" size={20} color="#666" />
        <Text style={styles.contactText}>{manufacturer.contact.address}</Text>
      </View>
      <View style={styles.contactItem}>
        <Icon name="phone" size={20} color="#666" />
        <Text style={styles.contactText}>{manufacturer.contact.phone}</Text>
      </View>
      <View style={styles.contactItem}>
        <Icon name="email" size={20} color="#666" />
        <Text style={styles.contactText}>{manufacturer.contact.email}</Text>
      </View>
      <View style={styles.contactItem}>
        <Icon name="web" size={20} color="#666" />
        <Text style={styles.contactText}>{manufacturer.contact.website}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{
              uri: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
            }}
            poster={manufacturer.image.uri}
            posterResizeMode="cover"
            style={styles.video}
            paused={isPaused}
            repeat={true}
            controls={true}
            resizeMode="cover"
            onFullscreenPlayerWillPresent={onFullscreenPlayerWillPresent}
            onFullscreenPlayerWillDismiss={onFullscreenPlayerWillDismiss}
          />
        </View>

        <View style={styles.header}>
          <Text style={styles.name}>{manufacturer.name}</Text>
        </View>

        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'info' && styles.activeTab]}
            onPress={() => setActiveTab('info')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'info' && styles.activeTabText,
              ]}>
              企业信息
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'products' && styles.activeTab]}
            onPress={() => setActiveTab('products')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'products' && styles.activeTabText,
              ]}>
              产品服务
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'contact' && styles.activeTab]}
            onPress={() => setActiveTab('contact')}>
            <Text
              style={[
                styles.tabText,
                activeTab === 'contact' && styles.activeTabText,
              ]}>
              联系方式
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {activeTab === 'info' && renderInfo()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'contact' && renderContact()}
        </View>
      </ScrollView>
    </View>
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
  header: {
    padding: 15,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#1890ff',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#1890ff',
    fontWeight: 'bold',
  },
  content: {
    padding: 15,
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
  certItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  certText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productName: {
    fontSize: 14,
    color: '#333',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  videoContainer: {
    width: width,
    height: width * 0.6,
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

export default ManufacturerDetailScreen;