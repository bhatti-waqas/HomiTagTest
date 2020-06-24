
import React, {Component} from 'react';
import {
  Button,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Text
} from 'react-native';
import { TMDB_URL, TMDB_API_KEY } from '../constants/api';
import axios from 'axios';
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
    let url = `${TMDB_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${1}`
    axios.get(url)
            .then(response => {
                console.log('getting data from axios', response.data  );
                setTimeout(() => {
                    this.setState({
                        loading: false,
                        dataSource: response.data.results
                    })
                }, 2000)
            })
            .catch(error => {
                console.log(error);
            });

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
      <Text style={styles.lightText}>{data.item.original_title}</Text>
      <Text style={styles.lightText}>{data.item.overview}</Text>
      <Text style={styles.lightText}>{data.item.original_title}</Text>
      </TouchableOpacity>
    )
  }

  goToProfile = (data) => {
    console.log(data.item)
    this.props.navigation.navigate('Profile', { itemId: data.item.id, otherParam: data })
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
