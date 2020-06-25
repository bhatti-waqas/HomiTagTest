import React, {Component} from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    ScrollView,
    Image
  } from 'react-native';

import { TMDB_URL, TMDB_IMG_URL , TMDB_API_KEY } from '../constants/api';
import axios from 'axios';
import styles from '../styles/Movie'

export default class MovieDetails extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      dataSource:{}
    };
  }

  componentDidMount(){
    const { itemId } = this.props.route.params;
    const { title } = this.props.route.params;
    console.log("item id is", itemId);
    console.log("title  is", title);
    let url = `${TMDB_URL}/movie/${itemId}?api_key=${TMDB_API_KEY}&append_to_response=casts,images`
    axios.get(url)
      .then(response => {
      console.log('getting data from axios', response.data  );
      setTimeout(() => {
        this.setState({
          loading: false,
          dataSource: response.data
        })
      }, 2000)
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let height = 200;
    if(this.state.loading){
      return(
        <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0c9"/>
        </View>
      )
    }
    let info  = this.state.dataSource
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={{ height }}>
          <Image source={{ uri: `${TMDB_IMG_URL}/w780/${(info.backdrop_path)}` }} style={styles.imageBackdrop} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>{info.original_title}</Text>
          <Text style={styles.tagline}>{info.tagline}</Text>
          <View style={styles.genre}>
            {
              info.genres.map(item => (
                <Text key={item.id} style={styles.genreItem}>{item.name}</Text>
              ))
            }
          </View>
          <Text style={styles.overview}>{info.overview}</Text>
          <Text style={styles.title}>Cast:</Text>
        </View>
        {
          info.casts.cast.map(item => (
  					<View key={item.cast_id} style={styles.castContainer}>
  						<Image source={{ uri: `${TMDB_IMG_URL}/w185/${item.profile_path}` }} style={styles.castImage} />
  						<View style={styles.characterContainer}>
  							<Text style={styles.characterName}>
  								{item.name}
  							</Text>
  							<Text style={styles.asCharacter}>
  								{item.character && `as ${item.character}`}
  							</Text>
  						</View>
  					</View>
  				))
        }
      </ScrollView>

    );
  }
}
