import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './User.less';
import { PAGE_SIZE } from '../constants';

@connect(({ users, loading }) => ({
  dataSource: users.list,
  total: users.total,
  current: users.page,
  loadingUsers: loading.effects['users/fetchUsers'] || loading.effects['users/removeUsers'],
}))
class Users extends React.Component {
  /**
   * 列表删除
   */
  deleteHandler = (id) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/removeUsers',
      payload: id,
    });
  }

  /**
   * 列表分页(因为在models中监听了路由改变事件，所以这里直接通过跳转路由的方式来调用分页查询)
   */
  handleChangePageList = page => {
    const { dispatch } = this.props;
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page },
    }));
  }

  render () {
    const { dataSource, total, current, loadingUsers } = this.props;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="">{text}</a>,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Website',
        dataIndex: 'website',
        key: 'website',
      },
      {
        title: 'Operation',
        key: 'operation',
        render: (text, { id }) => (
          <span className={styles.operation}>
            <a href="">Edit</a>
            <Popconfirm title="Confirm to delete?" onConfirm={() => this.deleteHandler(id)}>
              <a href="">Delete</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    return (
      <div>
        <div>
          <Table
            loading={loadingUsers}
            columns={columns}
            dataSource={dataSource}
            rowKey={record => record.id}
            pagination={false}
          />
          <Pagination
            className="ant-table-pagination"
            total={total}
            current={current}
            pageSize={PAGE_SIZE}
            onChange={this.handleChangePageList}
          />
        </div>
      </div>
    )
  }
}
export default Users;

