
import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import Toast from 'react-native-root-toast';
import { TMDB_URL, TMDB_IMG_URL , TMDB_API_KEY } from '../constants/api';
import axios from 'axios';
import styles from '../styles/List'
import { checkConnectivity } from '../utils/check_connectivity'

export default class GenreList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      dataSource:[]
    };
  }

  componentDidMount(){
    this.getGenresList()
  }

  async getGenresList() {
    isConnected = await checkConnectivity();
    if(!isConnected){
      Toast.show( 'No Internet connection. Please try again later', {
                  duration: 3000,
                  position: Toast.positions.BOTTOM,
                  opacity: 0.9,
                  visible: true,
                  backgroundColor:'white',
                  textColor: 'black'
                });
      this.setState({isLoading: false})
      return
    }

    let url = `${TMDB_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`
    axios.get(url)
      .then(response => {
      console.log('getting data from axios', response.data  );
      if (response.errors)
        Toast.show(responseJson.errors.full_messages || responseJson.errors, {
          duration: 5000,
          position: Toast.positions.BOTTOM,
          opacity: 0.8,
          visible: true
        });
      setTimeout(() => {
        this.setState({
          loading: false,
          dataSource: response.data.genres
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

  renderItem = (genre) =>  {
    return (
      <TouchableOpacity style={styles.list} onPress = { ()=> this.goToMoviesList(genre.item) } >
        <Text style={styles.boldText}>{genre.item.name}</Text>
      </TouchableOpacity>
    )
  }

  goToMoviesList = (genre) => {
    this.props.navigation.navigate('MoviesList', { itemId: genre.id, otherParam: genre.name, name: `${genre.name} Movies`})
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
