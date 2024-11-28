import { useMemo } from 'react';
import { ProColumnType } from '@ant-design/pro-components';
type useTableColumnOption = {
  index?: boolean;
  created_at?: boolean;
  updated_at?: boolean;
};
export default function useTableColumn<T extends Record<any, any>>(
  column: ProColumnType<T>[],
  options?: useTableColumnOption,
) {
  const { index = true, created_at = true, updated_at = true } = options || {};
  return useMemo(() => {
    if (index) {
      column.unshift({
        title: '#',
        valueType: 'index',
      });
    }
    if (created_at) {
      column.push({
        dataIndex: 'created_at',
        title: '创建时间',
        width: '100px',
      });
    }
    if (updated_at) {
      column.push({
        dataIndex: 'updated_at',
        title: '最后修改时间',
        width: '100px',
      });
    }
    return column.map((v) => {
      return {
        ...v,
        search: v.search === undefined ? false : v.search,
        align: v.align || 'center',
      };
    });
  }, [column, created_at, index, updated_at]);
}
