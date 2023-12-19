import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import VirtualList from "@tarojs/components/virtual-list"

import './index.styl'

// 使用 definePageConfig 定义的页面配置对象不能使用变量
definePageConfig({
  navigationBarTitleText: '虚拟列表',
})

function buildData(offset = 0) {
  return Array(100)
    .fill(0)
    .map((_, i) => i + offset);
}

const Row = React.memo(({ id, index, data }: any) => {
  return (
    <View id={id} className={index % 2 ? "ListItemOdd" : "ListItemEven"}>
      Row {index} : {data[index]}
    </View>
  );
});

export default class List extends PureComponent <any> {
  state = {
    data: buildData(0),
  };

  render() {
    const { data } = this.state;
    const dataLen = data.length;
    return (
      <VirtualList
        height={700} /* 列表的高度 */
        width="100%" /* 列表的宽度 */
        item={Row} /* 列表单项组件，这里只能传入一个组件 */
        itemData={data} /* 渲染列表的数据 */
        itemCount={dataLen} /* 渲染列表的长度 */
        itemSize={100} /* 列表单项的高度  */
      />
    );
  }
}
