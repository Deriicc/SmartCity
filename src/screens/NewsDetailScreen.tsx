import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';

const NewsDetailScreen = ({route}) => {
  const {news} = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: news.image}} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{news.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.source}>{news.source}</Text>
          <Text style={styles.date}>{news.date}</Text>
        </View>
        <Text style={styles.body}>{news.summary}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  source: {
    fontSize: 14,
    color: '#1890ff',
  },
  date: {
    fontSize: 14,
    color: '#999',
  },
  body: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
});

export default NewsDetailScreen;
