import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import FlipCard from './components/flipCard/flipCard';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flipCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#9c9',
    height: 200,
    margin: 10,
  },
  placeholder: {
    flex: 3,
  },
  frontCard: {
    backgroundColor: '#9c9',
  },
  backCard: {
    backgroundColor: '#c9c',
  },
});

class MemoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderFrontCard = () => (
    <View style={styles.frontCard}>
      <Text>front card</Text>
    </View>
  );

  renderBackCard = () => (
    <View style={styles.backCard}>
      <Text>front card</Text>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlipCard
          style={styles.flipCard}
          renderFrontCard={this.renderFrontCard}
          renderBackCard={this.renderBackCard}
        />
        <View style={styles.placeholder} />
      </View>
    );
  }
}

export default MemoryCard;
