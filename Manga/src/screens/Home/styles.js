import { StyleSheet, Dimensions } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  tabbar: {
    backgroundColor: '#fcfcfc'
  },
  tab: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicator: {
    backgroundColor: '#29A829',
    height: 1
  },
  label: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: '500',
    marginBottom: 0,
    fontSize: 16
  }
});

export default styles;
