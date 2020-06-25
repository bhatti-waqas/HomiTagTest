
import React, {Component} from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import Toast from 'react-native-root-toast';
import { TMDB_URL, TMDB_IMG_URL , TMDB_API_KEY } from '../constants/api';
import axios from 'axios';
import styles from '../styles/List'
import MovieRow from './MovieRow'
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

  goToMovieDetails = (data) => {
    console.log(data);
    this.props.navigation.navigate('MovieDetails', { itemId: data.id, name: `${data.original_title}`})
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
          renderItem= {item => <MovieRow info={item.item} goToMovieDetails = {this.goToMovieDetails} />}
          keyExtractor= {item=>item.id.toString()}
          />
      </View>
    );
  }
}
