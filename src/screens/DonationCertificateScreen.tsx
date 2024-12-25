import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

const DonationCertificateScreen = ({route, navigation}: any) => {
  const {record} = route.params;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `我为"${record.projectTitle}"项目捐款${record.amount}元，获得爱心证书！`,
        title: '爱心证书分享',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = () => {
    // TODO: 实现证书下载功能
    alert('证书已保存到相册');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.certificateContainer}>
        {/* 证书内容 */}
        <View style={styles.certificate}>
          <View style={styles.certificateBorder}>
            <View style={styles.cornerTL} />
            <View style={styles.cornerTR} />
            <View style={styles.cornerBL} />
            <View style={styles.cornerBR} />
          </View>
          <View style={styles.certificateContent}>
            <View style={styles.headerDecoration}>
              <Icon name="heart" size={24} color="#1890ff" />
            </View>
            <Text style={styles.certificateTitle}>爱心捐赠证书</Text>
            <Text style={styles.certificateNo}>
              证书编号：{record.certificateId}
            </Text>
            <View style={styles.seal}>
              <Icon name="check-decagram" size={60} color="#1890ff20" />
            </View>
            <Text style={styles.certificateText}>
              兹证明
              <Text style={styles.highlightText}> {record.donorName} </Text>于
              <Text style={styles.highlightText}> {record.date} </Text>
              通过
              <Text style={styles.highlightText}>
                {record.paymentMethod === 'alipay' ? '支付宝' : '微信支付'}
              </Text>
              为
              <Text style={styles.highlightText}> {record.projectTitle} </Text>
              项目捐赠人民币
              <Text style={styles.highlightText}>
                {' '}
                {record.amount.toFixed(2)}{' '}
              </Text>
              元
            </Text>
            <View style={styles.certificateFooter}>
              <Text style={styles.certificateDate}>
                颁发日期：{record.date.split(' ')[0]}
              </Text>
              <View style={styles.stamp}>
                <Icon name="shield-check" size={40} color="#1890ff40" />
                <Text style={styles.stampText}>爱心公益</Text>
              </View>
            </View>
          </View>
        </View>

        {/* 操作按钮 */}
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.downloadButton]}
            onPress={handleDownload}>
            <Icon name="download" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>保存证书</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.shareButton]}
            onPress={handleShare}>
            <Icon name="share-variant" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>分享证书</Text>
          </TouchableOpacity>
        </View>

        {/* 证书说明 */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            <Icon name="information" size={16} color="#1890ff" /> 证书说明
          </Text>
          <Text style={styles.infoText}>• 本证书是您参与公益项目的证明</Text>
          <Text style={styles.infoText}>• 证书编号可用于验证真实性</Text>
          <Text style={styles.infoText}>• 您可以随时下载或分享证书</Text>
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
  certificateContainer: {
    padding: 20,
    alignItems: 'center',
  },
  certificate: {
    width: width - 40,
    aspectRatio: 0.707, // A4纸比例
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  certificateBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: '#1890ff20',
    margin: 10,
  },
  cornerTL: {
    position: 'absolute',
    top: -2,
    left: -2,
    width: 20,
    height: 20,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#1890ff',
  },
  cornerTR: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#1890ff',
  },
  cornerBL: {
    position: 'absolute',
    bottom: -2,
    left: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#1890ff',
  },
  cornerBR: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#1890ff',
  },
  certificateContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerDecoration: {
    marginBottom: 20,
  },
  certificateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  certificateNo: {
    fontSize: 12,
    color: '#666',
    marginBottom: 30,
  },
  seal: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  certificateText: {
    fontSize: 16,
    lineHeight: 28,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  highlightText: {
    color: '#1890ff',
    fontWeight: '500',
  },
  certificateFooter: {
    width: '100%',
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  certificateDate: {
    fontSize: 14,
    color: '#666',
  },
  stamp: {
    alignItems: 'center',
  },
  stampText: {
    fontSize: 12,
    color: '#1890ff40',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    minWidth: 140,
    justifyContent: 'center',
  },
  downloadButton: {
    backgroundColor: '#52c41a',
  },
  shareButton: {
    backgroundColor: '#1890ff',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 5,
  },
});

export default DonationCertificateScreen;
