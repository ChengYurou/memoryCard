import React from 'react';
import { View, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';

class FlipCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={this.props.style}>
        <Animated.View>
          <Text>test</Text>
        </Animated.View>
      </View>
    );
  }
}

FlipCard.propTypes = {
  style: PropTypes.number,
};

FlipCard.defaultProps = {
  style: null,
};

export default FlipCard;
