
import React, {Component} from 'react';
import {Button, View, ActivityIndicator, FlatList, TouchableOpacity, Text } from 'react-native';
import styles from '../styles/List'

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      dataSource:[]
    };
  }

  componentDidMount(){
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
          loading: false,
          dataSource: responseJson
        })
        console.log(this.state.dataSource);
    })
    .catch(error=>console.log(error)) //to catch the errors if any
  }

  FlatListItemSeparator = () => {
    return (
      <View style={styles.separator}
      />
    );
  }

  renderItem = (data) =>  {
    return (
      <TouchableOpacity style={styles.list} onPress = { ()=> this.goToProfile(data) } >
      <Text style={styles.lightText}>{data.item.name}</Text>
      <Text style={styles.lightText}>{data.item.email}</Text>
      <Text style={styles.lightText}>{data.item.company.name}</Text>
      </TouchableOpacity>
    )
  }

  goToProfile = (data) => {
    console.log(data.item)
    this.props.navigation.navigate('Profile', { itemId: data.id, otherParam: data.item.company.name })
  }


  render() {

    if(this.state.loading){
      return(
        <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0c9"/>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data= {this.state.dataSource}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem= {item=> this.renderItem(item)}
          keyExtractor= {item=>item.id.toString()}
          />
      </View>


    );
  }
}
