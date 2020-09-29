/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, FlatList, Alert} from 'react-native';
import {ListItem} from 'react-native-elements';
import axios from 'axios';

export default class App extends Component {
  constructor(...args) {
    super(...args);

    this.state = {list: []};
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.name}
      subtitle={'Status: ' + item.status}
      leftAvatar={{source: {uri: item.image}}}
      bottomDivider={true}
      onPress={() =>
        Alert.alert(
          item.name,
          `species: ${item.species}, \n status: ${item.status} \n location ${item.location.name}`,
        )
      }
    />
  );

  componentDidMount() {
    axios.get('https://rickandmortyapi.com/api/character').then((response) => {
      this.setState({list: response.data.results});
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.list}
          renderItem={this.renderItem}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
