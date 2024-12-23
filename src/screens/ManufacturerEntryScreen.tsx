import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface FormData {
  companyName: string;
  businessLicense: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  category: string;
  description: string;
}

const ManufacturerEntryScreen = ({navigation}) => {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    businessLicense: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    category: '',
    description: '',
  });

  const handleSubmit = () => {
    // 验证必填字段
    const requiredFields = [
      'companyName',
      'businessLicense',
      'contactPerson',
      'phone',
    ];
    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      Alert.alert('提示', '请填写必填信息');
      return;
    }

    // 提交表单
    Alert.alert('提示', '申请已提交，我们会尽快与您联系', [
      {
        text: '确定',
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  const renderField = (
    label: string,
    field: keyof FormData,
    required: boolean = false,
    multiline: boolean = false,
  ) => (
    <View style={styles.fieldContainer}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.required}>*</Text>}
      </View>
      <TextInput
        style={[styles.input, multiline && styles.multilineInput]}
        value={formData[field]}
        onChangeText={text => setFormData({...formData, [field]: text})}
        placeholder={`请输入${label}`}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="information" size={20} color="#666" />
        <Text style={styles.headerText}>
          请填写以下信息，我们的工作人员会尽快与您联系
        </Text>
      </View>

      <View style={styles.form}>
        {renderField('企业名称', 'companyName', true)}
        {renderField('营业执照号', 'businessLicense', true)}
        {renderField('联系人', 'contactPerson', true)}
        {renderField('联系电话', 'phone', true)}
        {renderField('电子邮箱', 'email')}
        {renderField('企业地址', 'address')}
        {renderField('主营类目', 'category')}
        {renderField('企业简介', 'description', false, true)}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>提交申请</Text>
        </TouchableOpacity>

        <Text style={styles.tips}>
          提示：带 * 号的为必填项，请认真填写以便我们及时与您取得联系
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e6f7ff',
  },
  headerText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  form: {
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  required: {
    color: '#f50',
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    fontSize: 14,
    color: '#333',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#1890ff',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tips: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default ManufacturerEntryScreen;
