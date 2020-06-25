import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
   },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
   },
  list:{
    paddingVertical: 4,
    margin: 5,
  },
  separator: {
    height: .5,
    width:"100%",
    backgroundColor:"#f4511e",
  },
  lightText: {
    alignSelf: "flex-start",
    color: 'white'
  },
  boldText: {
    paddingVertical: 4,
    margin: 5,
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: 'white'
  },
  posterImage: {
		height: 84,
		width: 84,
		borderRadius: 3
	},
});

export default styles;
