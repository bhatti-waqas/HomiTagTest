import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
	textStyle: {
		color: 'white',
		paddingTop: 10,
		fontSize: 12,
		fontWeight: 'bold'
	},
	contentContainer: {
		flex: 1,
		marginTop: 157
	},
	container: {
		backgroundColor: '#0a0a0a'
	},
	imageBackdrop: {
		height: 248,
		backgroundColor: 'black'
	},
  details: {
		paddingLeft: 10,
		flex: 1,
		paddingTop: 50
	},
	title: {
		color: 'white',
		fontSize: 22,
		fontWeight: '500',
		paddingTop: 10
	},
	tagline: {
		color: '#999',
    fontWeight: '300',
		fontSize: 15
	},
  overview: {
    marginTop: 10,
		color: 'white',
    fontWeight: '300',
		fontSize: 15
	},
	genre: {
    marginTop: 15,
		flexDirection: 'row'
	},
	genreItem: {
		textAlign: 'left',
		fontSize: 11,
		marginRight: 5,
		color: 'white'
	},
  castContainer: {
    marginTop: 10,
    paddingLeft: 10,
		flexDirection: 'row',
		marginBottom: 15
	},
  characterContainer: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: 16
	},
	characterName: {
		color: 'white',
		flexDirection: 'column',
		fontSize: 16,
		fontWeight: '500'
	},
	asCharacter: {
		color: '#999'
	},
  castImage: {
		width: 60,
		height: 60,
		borderRadius: 60 / 2
	},
});

export default styles;
