import React, { Component } from 'react'
import { FlatList,Text, StyleSheet, View, Button, TouchableOpacity, Image, TextInput, ActivityIndicator,Alert } from 'react-native'
import axios from 'axios';

export default class ContactScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      page: 1,
      contacts: [],
      allContacts: [],
      loading: true,
      refreshing: false
    };
    this.duringMomentum = false
  }

  componentDidMount() {
    this.getContacts();
  }

  getContacts = async () => {
    this.setState({
      loading: true
    });
    const { data: { results: contacts } } = await axios.get(`https://randomuser.me/api/?results=30&page=${this.state.page}`);
    const users = [...this.state.contacts, ...contacts];
    if (this.state.refreshing) {
      users.reverse();
    }

    this.setState({
      contacts: users,
      allContacts: users,
      loading: false,
      refreshing: false
    })
  };

  loadMore = () => {
    if (!this.duringMomentum) {
      this.setState({
        page: this.state.page + 1,
      }, () => { this.getContacts(); });
      this.duringMomentum = false;
    }
  };

  onRefresh = () => {
    this.setState({
      page: 1,
      refreshing: true
    }, () => {
      this.getContacts();
    });
  }

  renderContactItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={[styles.itemContainer,
      { backgroundColor: index % 2 === 1 ? '#ebebeb' : '' }]} onPress={()=>{
        Alert.alert('User Info',`Name: ${item.name.first} ${item.name.last}\nLocation: ${item.location.state} ${item.location.city} \nCountry: ${item.country}`);
      }}>
        <Image style={styles.avatar} source={{ uri: item.picture.thumbnail }} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.name.first}{item.name.last}</Text>
          <Text style={styles.name}>{item.location.state}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  searchFilter=text=>{
    const newData=this.state.allContacts.filter(item=>{
      const listItem=item.name.first.toLowerCase() + item.name.last.toLowerCase() + item.location.state.toLowerCase()
      return listItem.indexOf(text.toLowerCase())> -1;
    });
    this.setState({
      contacts:newData,
    });
  };

  renderHeader =()=>{
    const {text}=this.state;
    return(
      <View style={styles.searchContainer}>
        <TextInput onFocus={()=>this.duringMomentum=true} 
        onBlur={()=>this.duringMomentum=false}
        onChangeText={text=>{
          this.setState({
            text
          });
          this.searchFilter(text);
        }}
        style={styles.searchInput} placeholder='Write Here...'/>
      </View>
    )
  }

  renderFooter =()=>{
    if(!this.state.loading) return null;
    return (
      <View style={{paddingVertical:20}}>
        <ActivityIndicator size="large"/> 
      </View>
    )
  }

  render() {
    return (
      <FlatList
        ListFooterComponent={this.renderFooter}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderContactItem}
        data={this.state.contacts}
        keyExtractor={(item)=>item.login.uuid}
        onEndReached={this.loadMore}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      />
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
      flex: 1,
      flexDirection: 'row',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#eee'
  },
  avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginHorizontal: 10
  },
  textContainer: {
      justifyContent: 'space-around'
  },
  name: {
      fontSize: 16
  },
  searchInput: {
      fontSize: 16,
      backgroundColor: '#ced6e0',
      padding: 10,
      borderRadius: 20,
  },
  searchContainer: {
      padding: 10,
      marginVertical: 30,
  }
})