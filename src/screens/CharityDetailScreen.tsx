import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

const CustomProgressBar = ({progress}: {progress: number}) => (
  <View style={styles.progressBarContainer}>
    <View style={[styles.progressBar, {width: `${progress * 100}%`}]} />
  </View>
);

const ProjectProgress = ({status}: {status: string}) => {
  const steps = ['发起', '审核', '募款', '执行', '结束'];
  const currentIndex = steps.indexOf(status);
  const progress = (currentIndex + 1) / steps.length;

  return (
    <View style={styles.projectProgressContainer}>
      <View style={styles.progressStepsContainer}>
        <View style={styles.progressLine}>
          <View
            style={[styles.progressLineFill, {width: `${progress * 100}%`}]}
          />
        </View>
        {steps.map((step, index) => (
          <View
            key={step}
            style={[
              styles.stepContainer,
              {left: `${(index / (steps.length - 1)) * 100}%`},
            ]}>
            <View
              style={[
                styles.stepDot,
                index <= currentIndex && styles.activeStepDot,
                {borderWidth: 2, borderColor: '#fff'},
              ]}>
              {index <= currentIndex && <View style={styles.innerDot} />}
            </View>
            <Text
              style={[
                styles.stepText,
                index <= currentIndex && styles.activeStepText,
              ]}>
              {step}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const CharityDetailScreen = ({navigation, route}: any) => {
  const {project} = route.params;
  const progress = project.currentAmount / project.targetAmount;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Image
          source={{uri: project.image}}
          style={styles.projectImage}
          defaultSource={{
            uri: 'https://via.placeholder.com/400x200?text=Loading...',
          }}
        />
        <View style={styles.content}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{project.category}</Text>
          </View>
          <Text style={styles.title}>{project.title}</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Icon name="calendar-range" size={20} color="#666" />
                <Text style={styles.infoLabel}>开始时间</Text>
                <Text style={styles.infoValue}>{project.startDate}</Text>
              </View>
              <View style={styles.infoItem}>
                <Icon name="account-group" size={20} color="#666" />
                <Text style={styles.infoLabel}>参与人数</Text>
                <Text style={styles.infoValue}>{project.donorCount}人</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>项目进度</Text>
            <ProjectProgress status={project.status} />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>筹款进度</Text>
            <CustomProgressBar progress={progress} />
            <View style={styles.amountContainer}>
              <View>
                <Text style={styles.amountLabel}>已筹金额</Text>
                <Text style={styles.currentAmount}>
                  ¥{project.currentAmount.toLocaleString()}
                </Text>
              </View>
              <View style={styles.targetAmount}>
                <Text style={styles.amountLabel}>目标金额</Text>
                <Text style={styles.amountValue}>
                  ¥{project.targetAmount.toLocaleString()}
                </Text>
              </View>
            </View>
            <Text style={styles.percentage}>
              完成进度：{Math.floor(progress * 100)}%
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>项目介绍</Text>
            <Text style={styles.description}>{project.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.floatingButtonContainer}>
        <View style={styles.donationInfo}>
          <Text style={styles.donationLabel}>目标金额</Text>
          <Text style={styles.donationAmount}>
            ¥{project.targetAmount.toLocaleString()}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.donateButton}
          onPress={() => navigation.navigate('DonationPayment', {project})}>
          <Icon name="heart" size={20} color="#fff" style={styles.donateIcon} />
          <Text style={styles.donateButtonText}>立即捐款</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },
  scrollView: {
    flex: 1,
    marginBottom: 60,
  },
  projectImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  categoryTag: {
    backgroundColor: '#1890ff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginTop: 2,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  projectProgressContainer: {
    height: 80,
    marginTop: 10,
    paddingHorizontal: 30,
  },
  progressStepsContainer: {
    flex: 1,
    position: 'relative',
  },
  progressLine: {
    position: 'absolute',
    top: 12,
    left: 12,
    right: 12,
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
  },
  progressLineFill: {
    height: '100%',
    backgroundColor: '#1890ff',
    borderRadius: 2,
  },
  stepContainer: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{translateX: -12}],
  },
  stepDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeStepDot: {
    backgroundColor: '#e6f7ff',
    borderColor: '#1890ff',
  },
  innerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1890ff',
  },
  stepText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeStepText: {
    color: '#1890ff',
    fontWeight: '500',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 15,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1890ff',
    borderRadius: 4,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  currentAmount: {
    fontSize: 20,
    color: '#1890ff',
    fontWeight: 'bold',
  },
  targetAmount: {
    alignItems: 'flex-end',
  },
  amountValue: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  percentage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'right',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  donationInfo: {
    flex: 1,
  },
  donationLabel: {
    fontSize: 12,
    color: '#666',
  },
  donationAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  donateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1890ff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  donateIcon: {
    marginRight: 5,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CharityDetailScreen;
