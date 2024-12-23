import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const categories = [
  '市政建设',
  '环境保护',
  '交通出行',
  '教育医疗',
  '社区服务',
  '公共安全',
  '文化体育',
  '其他',
];

const departments = [
  '市政维修部门',
  '环保部门',
  '交通管理部门',
  '教育局',
  '卫生局',
  '公安局',
  '文化局',
];

// 添加分类与部门的映射关系
const categoryToDepartment = {
  市政建设: '市政维修部门',
  环境保护: '环保部门',
  交通出行: '交通管理部门',
  教育医疗: '卫生局',
  社区服务: '社区服务中心',
  公共安全: '公安局',
  文化体育: '文化局',
  其他: '市政维修部门',
};

const NewComplaintScreen = ({navigation, route}) => {
  const initialCategory = route.params?.category || '其他';
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [department, setDepartment] = useState(
    categoryToDepartment[initialCategory],
  );
  const [phone, setPhone] = useState('');
  const [images, setImages] = useState([]);

  // 添加分类变化的处理函数
  const handleCategoryChange = value => {
    setCategory(value);
    setDepartment(categoryToDepartment[value]);
  };

  const handleSubmit = () => {
    if (!title.trim() || !content.trim() || !phone.trim()) {
      Alert.alert('提示', '请填写完整信息');
      return;
    }
    // 这里添加提交逻辑
    Alert.alert('成功', '诉求已提交', [
      {
        text: '确定',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {initialCategory === '其他' && (
        <View style={styles.section}>
          <Text style={styles.label}>诉求分类</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={handleCategoryChange} // 使用新的处理函数
              style={styles.picker}
              dropdownIconColor="#666"
              mode="dropdown">
              {categories.map((cat, index) => (
                <Picker.Item key={index} label={cat} value={cat} color="#333" />
              ))}
            </Picker>
          </View>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.label}>标题</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="请输入标题"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>诉求内容</Text>
        <TextInput
          style={styles.contentInput}
          value={content}
          onChangeText={setContent}
          placeholder="请详细描述您的诉求"
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>承办单位</Text>
        <View style={styles.pickerContainer}>
          <Text style={styles.departmentText}>{department}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>联系电话</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="请输入联系电话"
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>提交</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  contentInput: {
    height: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  picker: {
    height: 60, // 增加高度
    width: '100%',
    color: '#333',
  },
  departmentText: {
    fontSize: 16,
    color: '#333',
    padding: 15,
  },
  submitButton: {
    backgroundColor: '#1890ff',
    margin: 15,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewComplaintScreen;
