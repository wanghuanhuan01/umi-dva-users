import { fetchUsers, removeUsers, editUsers, createUsers } from '../services/users';

export default {
  nameSpace: 'users',
  state: {
    list: [],
    page: null,
    total: null,
  },
  effects: {
    *fetchUsers({ payload: { page = 1 } }, { call, put }) {
      const res = yield call(fetchUsers, page);
      if (res && !res.failed) {
        yield put({
          type: 'updateState',
          payload: {
            list: res.data,
            total: parseInt(res.headers['x-total-count'], 10),
            page: parseInt(page, 10),
          },
        });
      }
    },
    *removeUsers({ payload }, { call, put, select }) {
      const res = yield call(removeUsers, payload);
      const list  = yield select(state => state.users.list);
      if (res && !res.failed) {
        yield put({
          type: 'updateState',
          payload: {
            list: list.filter(({ id }) => id !== payload),
          },
        });
      }
    },
    *editUsers({ payload }, { call, put, select }) {
      const res = yield call(editUsers, payload);
      const list  = yield select(state => state.users.list);
      if (res && !res.failed) {
        yield put({
          type: 'updateState',
          payload: {
            list: list.map(item => item.id === payload.id ? Object.assign({}, item, payload.values) : item),
          },
        });
      }
    },
    *createUsers({ payload }, { call, put, select }) {
      const res = yield call(createUsers, payload);
      const list  = yield select(state => state.users.list);
      if (res && !res.failed) {
        list.unshift({ ...payload, id: list[list.length - 1].id + 1 });
      }
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({
            type: 'fetchUsers',
            payload: query,
          });
        }
      });
    },
  },
};
