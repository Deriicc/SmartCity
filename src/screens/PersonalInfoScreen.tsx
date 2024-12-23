import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const PersonalInfoScreen = () => {
  const InfoItem = ({label, value}: {label: string; value: string}) => (
    <View style={styles.infoItem}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <InfoItem label="用户名" value="Admin" />
      <InfoItem label="手机号" value="138****8888" />
      <InfoItem label="邮箱" value="admin@example.com" />
      <InfoItem label="注册时间" value="2024-01-01" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  infoItem: {
    backgroundColor: '#fff',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    width: 80,
    fontSize: 16,
    color: '#666',
  },
  value: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default PersonalInfoScreen;
