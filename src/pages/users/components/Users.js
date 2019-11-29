/**
 * 用户列表组件
 */
import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, Popconfirm, Button } from 'antd';
import { routerRedux } from 'dva/router';
import styles from './User.less';
import UserModal from './UserModal';
import { PAGE_SIZE } from '../constants';

@connect(({ users, loading }) => ({
  dataSource: users.list,
  total: users.total,
  current: users.page,
  loadingUsers: loading.effects['users/fetchUsers'] ||
                loading.effects['users/removeUsers'] ||
                loading.effects['users/editUsers'] ||
                loading.effects['users/createUsers'],
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

  /**
   * 编辑列表
   */
  handleEditList = (id, values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/editUsers',
      payload: {
        id,
        values,
      },
    });
  }

  /**
   * 新建列表
   */
  createHandler = (values) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'users/createUsers',
      payload: values,
    }).then(() => console.log(this.props.dataSource));
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
        render: (text, record) => (
          <span className={styles.operation}>
            <UserModal record={record} onOk={this.handleEditList}>
              <a>Edit</a>
            </UserModal>
            <Popconfirm title="Confirm to delete?" onConfirm={() => this.deleteHandler(record.id)}>
              <a href="">Delete</a>
            </Popconfirm>
          </span>
        ),
      },
    ];
    return (
      <div>
        <div className={styles.create}>
          <UserModal record={{}} onOk={this.createHandler}>
            <Button type="primary">Create User</Button>
          </UserModal>
        </div>
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

