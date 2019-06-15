import { StyleSheet } from 'react-native';
import Const from '../../utils/const';

const styles = StyleSheet.create({
  container: { padding: 10, paddingTop: 0 },
  title_container: { flex: 1, flexDirection: 'row' },
  title_text: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5
  },
  view_more: {
    color: Const.COLOR.LOADDING,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    alignSelf: 'center',
    marginTop: 10
  },
  item_container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e5e5e5'
  },
  item_name: {
    flex: 1,
    fontSize: 16,
    marginRight: 10
  }
});

export default styles;
