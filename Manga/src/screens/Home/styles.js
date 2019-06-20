import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  tabbar: {
    backgroundColor: 'rgba(0,0,0,0)'
  },
  tab: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicator: {
    backgroundColor: '#29A829',
    height: 1,
  },
  label: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: 'bold',
    marginBottom: 0,
    fontSize: 12,
    textTransform: 'capitalize'
  },
});

export default styles;
