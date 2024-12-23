import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface MenuItemProps {
  icon: string;
  title: string;
  onPress: () => void;
}

const MenuItem = ({icon, title, onPress}: MenuItemProps) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <Icon name={icon} size={24} color="#666" />
    <Text style={styles.menuText}>{title}</Text>
    <Icon name="chevron-right" size={24} color="#ccc" />
  </TouchableOpacity>
);

interface ProfileScreenProps {
  navigation: {
    navigate: (screen: string) => void;
    reset: (config: {index: number; routes: {name: string}[]}) => void;
  };
}

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://via.placeholder.com/100x100',
          }}
          style={styles.avatar}
        />
        <Text style={styles.username}>Admin</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem
          icon="account-circle"
          title="个人信息"
          onPress={() => navigation.navigate('PersonalInfo')}
        />
        <MenuItem
          icon="lock-reset"
          title="修改密码"
          onPress={() => navigation.navigate('ChangePassword')}
        />
        <MenuItem
          icon="message-text"
          title="意见反馈"
          onPress={() => navigation.navigate('Feedback')}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>退出登录</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    margin: 20,
    backgroundColor: '#ff4d4f',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
