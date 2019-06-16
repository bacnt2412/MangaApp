import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  viewMore: {
    color: '#4286f4'
  },
  cover_container: {
    position: 'relative',
    marginBottom: 40
  },
  cover_image: {
    height: 240,
    opacity: 0.875
  },
  avatar_container: {
    width: 100,
    height: 160,
    borderRadius: 3,
    aspectRatio: 0.6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'rgba(32, 32, 32, 0.66)'
  },
  avatar_image: {
    width: 100,
    height: 160,
    borderRadius: 3
  },
  detail_container: {
    position: 'absolute',
    right: 0,
    marginLeft: 16,
    marginRight: 16
  },
  detail_name: {
    fontWeight: '300',
    fontSize: 25,
    color: '#FFFFFF',
    marginBottom: 3
  },
  description_container: {
    padding: 10
  },
  description_title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  }
});

export default styles;
