import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Api from '../../services/api';

class ListChapter extends PureComponent {
  constructor(props) {
    super(props);
    let { idManga } = props;

    this.state = {
      isFirstLoad: false,
      isLoadMore: false,
      idManga,
      listChapter: []
    };
  }

  componentDidMount = async () => {
    let res = await Api.getListChapterByIdManga({
      idManga: this.state.idManga
    });
    if (res && res.status === 200) {
      this.setState({ listChapter: res.data.listChapter });
    }
  };
  render() {
    const { listChapter } = this.state;
    return (
      <View style={{ padding: 10, paddingTop: 0 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 5
          }}>
          Danh sách chapter:{' '}
        </Text>
        { listChapter && listChapter.map(item => {
          return (
            <View key={item._id}>
              <Text style={{ color: 'white' }}>{item.name}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

export default ListChapter;
