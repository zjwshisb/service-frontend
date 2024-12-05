import { useMemo } from 'react';
import { ProColumnType } from '@ant-design/pro-components';
import { genTableColumns, GenTableColumnsOption } from '@/utils/table';

export default function useTableColumn<T extends Record<any, any>>(
  column: ProColumnType<T>[],
  options?: GenTableColumnsOption,
) {
  return useMemo(() => {
    return genTableColumns(column, options);
  }, [column, options]);
}
