import React, { useEffect } from 'react';
import TextInput from '../UI/input/TextInput';
import CustomSelect from '../UI/select/CustomSelect';
import { useLocation, useNavigate } from 'react-router-dom';
import cls from './comment-filter.module.scss';

const CommentFilter = ({ filter, setFilter, optionsOrder, optionsQuery }) => {
  const location = useLocation();
  const route = useNavigate();

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    let key;
    for (const value of search.keys()) {
      key = value;
    }
    let name = search.get(key);
    name = name ? name : '';
    key = key ? key : 'id';
    setFilter({ ...filter, query: name, queryField: key });
  }, []);

  const filterChange = ({ queryField, query }) => {
    route(`/comments/?${queryField}=${query}`);
    setFilter({ ...filter, query, queryField });
  };

  return (
    <div className={cls.root}>
      <div className={cls.query}>
        <CustomSelect
          options={optionsQuery}
          defaultValue={'Поле поиска'}
          value={filter.queryField}
          onChange={(target) =>
            filterChange({ queryField: target.value, query: filter.query })
          }
        />
        <TextInput
          placeholder={'Поиск комментария'}
          value={filter.query}
          onChange={({ target }) =>
            filterChange({ queryField: filter.queryField, query: target.value })
          }
        />
      </div>
      <div className={cls.order}>
        <CustomSelect
          label={'Сортировка по'}
          options={optionsOrder}
          defaultValue={'Сортировка по'}
          value={filter.sort}
          onChange={(target) => setFilter({ ...filter, sort: target.value })}
        />
      </div>
    </div>
  );
};

export default CommentFilter;
