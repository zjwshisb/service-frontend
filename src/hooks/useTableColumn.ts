import { useMemo } from 'react';
import { ProColumnType } from '@ant-design/pro-components';
import { genTableColumns, GenTableColumnsOption } from '@/utils/table';
import { useLatest } from 'ahooks';

export default function useTableColumn<T extends Record<any, any>>(
  column: ProColumnType<T>[],
  options?: GenTableColumnsOption,
) {
  const optionsRef = useLatest(options);

  return useMemo(() => {
    return genTableColumns(column, optionsRef.current);
  }, [column, optionsRef]);
}
