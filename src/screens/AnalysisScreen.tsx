import React from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {PieChart, BarChart} from 'react-native-chart-kit';

const {width} = Dimensions.get('window');

// 职位数据
const jobAnalysisData = [
  {
    name: '前端开发',
    count: 150,
    color: '#1890ff',
    legendFontColor: '#666',
  },
  {
    name: '后端开发',
    count: 120,
    color: '#13c2c2',
    legendFontColor: '#666',
  },
  {
    name: 'UI设计',
    count: 80,
    color: '#722ed1',
    legendFontColor: '#666',
  },
  {
    name: '产品经理',
    count: 100,
    color: '#eb2f96',
    legendFontColor: '#666',
  },
  {
    name: '测试工程师',
    count: 60,
    color: '#faad14',
    legendFontColor: '#666',
  },
  {
    name: '其他',
    count: 90,
    color: '#52c41a',
    legendFontColor: '#666',
  },
];

const AnalysisScreen = () => {
  // 计算总数和百分比
  const total = jobAnalysisData.reduce((sum, item) => sum + item.count, 0);

  // 修改饼图数据，添加标签
  const pieData = jobAnalysisData.map(item => ({
    name: item.name,
    population: item.count,
    color: item.color,
    legendFontColor: item.legendFontColor,
    legendFontSize: 12,
    labelColor: '#000',
  }));

  // 准备条形图数据
  const barData = {
    labels: jobAnalysisData.map(item => item.name),
    datasets: [
      {
        data: jobAnalysisData.map(item => item.count),
        color: (opacity = 1) => `rgba(24, 144, 255, ${opacity})`,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.7,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    formatYLabel: value => `${value}人`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  return (
    <ScrollView style={styles.container}>
      {/* 饼图卡片 */}
      <View style={styles.card}>
        <Text style={styles.title}>招聘岗位分布（饼图）</Text>
        <Text style={styles.subtitle}>总职位数：{total}</Text>
        <View style={styles.chartWrapper}>
          <PieChart
            data={pieData}
            width={width - 30}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            center={[(width - 30) / 4, 0]}
            absolute
            hasLegend={false}
            avoidFalseZero={true}
            showValuesOnTopOfBars={true}
            showLabels={true}
            labelStyle={{
              color: '#000',
              fontSize: 12,
            }}
          />
        </View>
        <View style={styles.legendContainer}>
          {jobAnalysisData.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={[styles.legendDot, {backgroundColor: item.color}]} />
              <View style={styles.legendTextContainer}>
                <Text style={styles.legendTitle}>{item.name}</Text>
                <Text style={styles.legendCount}>
                  {item.count}人 ({((item.count / total) * 100).toFixed(1)}%)
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 条形图卡片 */}
      <View style={[styles.card, styles.barChartCard]}>
        <Text style={styles.title}>招聘岗位分布（条形图）</Text>
        <BarChart
          data={barData}
          width={width * 0.8}
          height={280}
          yAxisLabel=""
          yAxisSuffix="人"
          chartConfig={chartConfig}
          style={styles.barChart}
          showValuesOnTopOfBars={true}
          fromZero={true}
          verticalLabelRotation={45}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  legendContainer: {
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 15,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendTextContainer: {
    flex: 1,
  },
  legendTitle: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  legendCount: {
    fontSize: 12,
    color: '#666',
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -15,
  },
  barChartCard: {
    paddingVertical: 20,
    marginTop: 10,
  },
  barChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default AnalysisScreen;
