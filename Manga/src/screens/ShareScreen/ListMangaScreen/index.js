import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Api from '../../../services/api';
import Const from '../../../utils/const';
import { Loading, ListManga } from '../../../components';

class ListMangaScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isFirstLoading: true,
      isLoadMore: false,
      listManga: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({ isFirstLoading: true });
    let res = await Api.getListMangaByIdCategory({
      idCate: this.props.idCategory
    });
    if (res && res.status === 200) {
      this.setState({
        listManga: [...res.data.listManga],
        isFirstLoading: false
      });
      return;
    }
    this.setState({ isFirstLoading: false });
  };

  fucGetMoreData = async () => {
    this.setState({ isLoadMore: true });
    const { listManga } = this.state;
    let lastIdManga =
      listManga && listManga.length > 0
        ? listManga[listManga.length - 1]
        : null;
    let res = await Api.getListMangaByIdCategory({
      idCate: this.props.idCategory,
      lastIdManga
    });
    if (res && res.status === 200) {
      this.setState({
        listManga: [...listManga, ...res.data.listManga],
        isLoadMore: false
      });
      return;
    }
    this.setState({ isLoadMore: false });
  };
  render() {
    const { listManga, isFirstLoading, isLoadMore } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {isFirstLoading ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Loading />
          </View>
        ) : (
          <ListManga
            listManga={listManga}
            getMoreData={this.fucGetMoreData}
            isLoadMore={isLoadMore}
            componentId={Const.ID_SCREEN.LIBRARY}
          />
        )}
      </View>
    );
  }
}

export default ListMangaScreen;
