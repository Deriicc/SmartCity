import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 模拟数据
const initialRecords = [
  {
    id: '1',
    plateNumber: '京A12345',
    fee: '16元',
    enterTime: '2024-03-15 10:30',
    exitTime: '2024-03-15 12:30',
    parkingLot: '中央广场停车场',
  },
  {
    id: '2',
    plateNumber: '京B67890',
    fee: '24元',
    enterTime: '2024-03-14 14:20',
    exitTime: '2024-03-14 17:20',
    parkingLot: '商业中心停车场',
  },
  // ... 更多记录
];

const ParkingRecordsScreen = () => {
  const [records, setRecords] = useState(initialRecords.slice(0, 5));
  const [enterTime, setEnterTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [showAll, setShowAll] = useState(false);

  const handleSearch = () => {
    // 这里实现时间段查询逻辑
    const filtered = initialRecords.filter(record => {
      const enter = new Date(record.enterTime);
      const exit = new Date(record.exitTime);
      const searchEnter = enterTime ? new Date(enterTime) : null;
      const searchExit = exitTime ? new Date(exitTime) : null;

      if (searchEnter && searchExit) {
        return enter >= searchEnter && exit <= searchExit;
      } else if (searchEnter) {
        return enter >= searchEnter;
      } else if (searchExit) {
        return exit <= searchExit;
      }
      return true;
    });

    setRecords(filtered.slice(0, showAll ? undefined : 5));
  };

  const renderRecord = ({item}) => (
    <View style={styles.recordItem}>
      <Text style={styles.plateNumber}>{item.plateNumber}</Text>
      <Text style={styles.parkingLot}>{item.parkingLot}</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>入场：{item.enterTime}</Text>
        <Text style={styles.time}>出场：{item.exitTime}</Text>
      </View>
      <Text style={styles.fee}>费用：{item.fee}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="入场时间 (YYYY-MM-DD HH:mm)"
            value={enterTime}
            onChangeText={setEnterTime}
          />
          <TextInput
            style={styles.input}
            placeholder="出场时间 (YYYY-MM-DD HH:mm)"
            value={exitTime}
            onChangeText={setExitTime}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Icon name="magnify" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={records}
        renderItem={renderRecord}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      {!showAll && records.length >= 5 && (
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => {
            setShowAll(true);
            setRecords(initialRecords);
          }}>
          <Text style={styles.moreButtonText}>查看更多</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchButton: {
    width: 40,
    height: 40,
    backgroundColor: '#1890ff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  list: {
    padding: 15,
  },
  recordItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  plateNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  parkingLot: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  timeContainer: {
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    color: '#999',
  },
  fee: {
    fontSize: 16,
    color: '#f50',
    fontWeight: 'bold',
  },
  moreButton: {
    margin: 15,
    padding: 15,
    backgroundColor: '#1890ff',
    borderRadius: 8,
    alignItems: 'center',
  },
  moreButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ParkingRecordsScreen;
