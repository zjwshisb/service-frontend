import { ProColumnType, ProTableProps, ParamsType } from '@ant-design/pro-components';

export type GenTableColumnsOption = {
  index?: boolean;
  created_at?: boolean;
  updated_at?: boolean;
};

export function genTableColumns<T extends Record<any, any>>(
  column: ProColumnType<T>[],
  options?: GenTableColumnsOption,
): ProColumnType<T>[] {
  const { index = true, created_at = true, updated_at = true } = options || {};
  if (index) {
    column.unshift({
      title: '#',
      valueType: 'index',
      width: 80,
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
}
export function getDefaultConfig<
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(): ProTableProps<DataType, Params, ValueType> {
  return {
    rowKey: 'id',
    search: {
      defaultCollapsed: true,
    },
    form: {
      syncToUrl: true,
    },
  };
}
