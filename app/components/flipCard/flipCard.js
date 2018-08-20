import React from 'react';
import {
  View, Text, Animated,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import * as _ from 'lodash';


const styles = StyleSheet.create({
  back: {
    backgroundColor: '#9c9',
  },
  face: {
    backgroundColor: '#c9c',
  },
});

class FlipCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: props.isFlipped,
      isFlipping: false,
      flipAnimation: new Animated.Value(0),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFlipped !== this.state.isFlipped) {
      this.setState({ isFlipped: nextProps.isFlipped });
    }
  }

  toggleCard = () => {
    if (!this.state.isFlipping) {
      this.setState({ isFlipping: true });
      const nextIsFlipped = !this.state.isFlipped;
      if (!this.timer) {
        this.timer = setTimeout(() => {
          this.setState({ isFlipped: nextIsFlipped }, () => {
            this.timer = null;
          });
        }, 120);
      }
      Animated.timing(
        this.state.flipAnimation,
        {
          toValue: _.toNumber(nextIsFlipped),
          duration: 300,
          useNativeDriver: true,
        },
      ).start(() => {
        this.setState({ isFlipping: false });
      });
    }
  };

  renderContent = () => {
    if (this.state.isFlipped) {
      const transform = [];
      transform.push({ scaleX: -1 });
      return (
        <View style={[{ transform }, styles.back]}>
          <Text>back</Text>
        </View>
      );
    }
    return (
      <View style={styles.face}>
        <Text>face</Text>
      </View>
    );
  };

  render() {
    const transform = [
      {
        rotateY: this.state.flipAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '180deg'],
        }),
      },
    ];
    return (
      <TouchableOpacity
        style={this.props.style}
        onPress={this.toggleCard}
      >
        <Animated.View style={{ transform }}>
          {this.renderContent()}
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

FlipCard.propTypes = {
  style: PropTypes.number,
  isFlipped: PropTypes.bool,
};

FlipCard.defaultProps = {
  style: null,
  isFlipped: false,
};

export default FlipCard;
