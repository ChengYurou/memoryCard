import React from 'react';
import { View, StyleSheet } from 'react-native';

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
});

class MemoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <FlipCard style={styles.flipCard} isFlipped={false} />
        <View style={styles.placeholder} />
      </View>
    );
  }
}

export default MemoryCard;
