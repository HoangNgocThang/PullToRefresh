import React, { Component } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, RefreshControl } from 'react-native';
import axios from 'axios';

export default class App2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      refreshing: false
    };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      console.log('res:', res);
      this.setState({
        users: res.data
      })
    } catch (error) {
      console.log('error:', error);
    } finally {
      this.setState({
        refreshing: false
      })
    }
  }

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.item}>
        <Text>Name: {item.name}</Text>
        <Text>Email: {item.email}</Text>
      </View>
    )
  }

  _onRefresh = () => {
    setTimeout(() => {
      this.setState({
        users:[], // clear data
        refreshing: true // set loading
      })
      this.getUsers();
    }, 2500)
  }

  render() {
    const { users, refreshing } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          refreshControl=
          {<RefreshControl
            refreshing={refreshing}
            onRefresh={this._onRefresh}
          />}
          renderItem={this._renderItem}
          data={users}
          keyExtractor={item => `key-${item.id}`}
        />
      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: '100%',
    height: 30,
    marginTop: 16
  }
})
