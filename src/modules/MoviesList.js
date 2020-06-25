
import React, {Component} from 'react';
import {
  Button,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import Toast from 'react-native-root-toast';
import { TMDB_URL, TMDB_IMG_URL , TMDB_API_KEY } from '../constants/api';
import axios from 'axios';
import styles from '../styles/List'

export default class MoviesList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      dataSource:[]
    };
  }

  componentDidMount(){
    const { itemId } = this.props.route.params;
    const { title } = this.props.route.params;

    let url = `${TMDB_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${itemId}`
    axios.get(url)
      .then(response => {
      console.log('getting data from axios', response.data  );
      if (response.errors)
        console.log('errors');

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
      <View style = { {flexDirection: 'row', textAlign: 'left', fontSize: 15, backgroundColor:'black'} }>
        <TouchableOpacity style={styles.list} onPress = { ()=> this.goToMovieDetails(data) } >
          <Image source={{ uri: `${TMDB_IMG_URL}/w185/${data.item.poster_path}` }} style={styles.posterImage} />
          <Text style={styles.boldText}>{data.item.original_title}</Text>
          <Text style={styles.lightText}>{data.item.overview}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  goToMovieDetails = (data) => {
    console.log(data);
    this.props.navigation.navigate('MovieDetails', { itemId: data.item.id, name: `${data.item.original_title}`})
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
