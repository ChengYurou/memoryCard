import React from 'react';
import * as _ from 'lodash';
import {
  ScrollView,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  scrollableContentContainer: {
    flexGrow: 1,
  },
  flipCardMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  backTransform: {
    transform: [{ scaleX: -1 }],
  },
});

const FLIP_MODE = {
  HORIZONTAL: 'HORIZONTAL',
  VERTICAL: 'VERTICAL',
};

class FlipCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      isFlipped: false,
      isFlipping: false,
      flipAnimation: new Animated.Value(0),
    };
  }

  getTransformByFlipMode = () => {
    const interpolate = this.state.flipAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });
    return ({
      [FLIP_MODE.HORIZONTAL]: ([{ rotateY: interpolate }]),
      [FLIP_MODE.VERTICAL]: ([{ rotateX: interpolate }]),
    })[this.props.flipMode];
  };

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
          duration: this.props.animationDuration,
          useNativeDriver: true,
        },
      ).start(() => {
        this.setState({ isFlipping: false });
      });
    }
  };

  renderBackCard = () => {
    if (this.props.isBackCardScrollable) {
      return (
        <ScrollView
          style={{ height: this.state.height }}
          contentContainerStyle={styles.scrollableContentContainer}
        >
          {this.props.renderBackCard()}
        </ScrollView>
      );
    }
    return this.props.renderBackCard();
  };

  renderContent = () => {
    if (this.state.isFlipped) {
      return (
        <View style={styles.backTransform}>
          {this.renderBackCard()}
        </View>
      );
    }
    return this.props.renderFrontCard();
  };

  render() {
    return (
      <View
        style={this.props.style}
        onLayout={(event) => {
          this.setState({ height: event.nativeEvent.layout.height });
        }}
      >
        <View style={this.state.isFlipping && styles.flipCardMask} />
        <Animated.View style={{ transform: this.getTransformByFlipMode() }}>
          {this.renderContent()}
        </Animated.View>
      </View>
    );
  }
}

FlipCard.propTypes = {
  style: PropTypes.number,
  renderFrontCard: PropTypes.func.isRequired,
  renderBackCard: PropTypes.func.isRequired,
  flipMode: PropTypes.oneOf(_.values(FLIP_MODE)),
  isBackCardScrollable: PropTypes.bool,
  animationDuration: PropTypes.number,
};

FlipCard.defaultProps = {
  style: null,
  flipMode: FLIP_MODE.HORIZONTAL,
  isBackCardScrollable: false,
  animationDuration: 300,
};

FlipCard.constants = {
  flipMode: FLIP_MODE,
};

export default FlipCard;
