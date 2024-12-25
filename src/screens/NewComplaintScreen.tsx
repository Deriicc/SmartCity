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
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const departments = {
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
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [images, setImages] = useState([]);

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 3,
    });

    if (result.assets) {
      setImages([...images, ...result.assets]);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim() || !location.trim() || !phone.trim()) {
      Alert.alert('提示', '请填写完整信息');
      return;
    }

    const newComplaint = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
      department: departments[category],
      location: location.trim(),
      phone: phone.trim(),
      images: images.map(img => img.uri),
      submitTime: new Date().toLocaleString(),
      status: '处理中',
      completed: false,
    };

    try {
      // 获取现有诉求列表
      const existingComplaints = await AsyncStorage.getItem('complaints');
      const complaints = existingComplaints
        ? JSON.parse(existingComplaints)
        : [];

      // 添加新诉求到列表开头
      complaints.unshift(newComplaint);

      // 保存更新后的列表
      await AsyncStorage.setItem('complaints', JSON.stringify(complaints));

      Alert.alert('成功', '诉求已提交', [
        {
          text: '确定',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('错误', '保存失败，请重试');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>诉求分类</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={value => setCategory(value)}
            style={styles.picker}
            mode="dropdown">
            {categories.map((cat, index) => (
              <Picker.Item key={index} label={cat} value={cat} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>诉求标题</Text>
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
        <Text style={styles.label}>地��位置</Text>
        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
          placeholder="请输入具体地点"
        />
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

      <View style={styles.section}>
        <Text style={styles.label}>承办单位</Text>
        <View style={styles.departmentContainer}>
          <Text style={styles.departmentText}>{departments[category]}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>图片上传</Text>
        <View style={styles.imageContainer}>
          {images.map((image, index) => (
            <Image
              key={index}
              source={{uri: image.uri}}
              style={styles.previewImage}
            />
          ))}
          {images.length < 3 && (
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleImagePick}>
              <Icon name="camera-plus" size={24} color="#999" />
              <Text style={styles.uploadText}>添加图片</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>提交诉求</Text>
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
  },
  picker: {
    height: 50,
  },
  departmentContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
  },
  departmentText: {
    fontSize: 14,
    color: '#333',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
  },
  uploadButton: {
    width: 80,
    height: 80,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
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
