import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import Api from '../../../services/api';
import Const from '../../../utils/const';
import { Loading, ListManga } from '../../../components';

class ListMangaScreen extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  getData = async data => {
    return await Api.getListMangaByIdCategory({
      idCate: this.props.idCategory,
      page: data && data.page ? data.page : 1
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ListManga getData={this.getData} componentId={Const.ID_SCREEN.HOME} />
      </View>
    );
  }
}

export default ListMangaScreen;
