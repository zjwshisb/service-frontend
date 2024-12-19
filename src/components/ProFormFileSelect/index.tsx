import { FormItemProps } from '@ant-design/pro-components';
import { Form } from 'antd';
import React from 'react';
import { Icon } from '@iconify/react';
import { useModel } from '@umijs/max';
import { isArray } from 'lodash';
import { When } from 'react-if';
import FileItem from '@/components/FileItem';

type ItemFileValue = API.File | API.File[];

type FileSelectProps = {
  value?: ItemFileValue;
  width?: string | number;
  height?: string | number;
  type?: API.FileType;
  onChange?: (f?: ItemFileValue) => void;
  count?: number;
};

const FileSelect: React.FC<FileSelectProps> = (props) => {
  const { width = '100px', height = '100px', value, count = 1 } = props;

  const { selectFile } = useModel('fileModel');

  const canSelectCount = React.useMemo(() => {
    if (!value) {
      return count;
    } else {
      if (count === 1) {
        return 0;
      }
      if (isArray(value)) {
        return count - value.length;
      }
      return count;
    }
  }, [count, value]);

  const handleSelectFile = React.useCallback(() => {
    if (canSelectCount > 0) {
      selectFile({
        type: props.type,
        count: canSelectCount,
      }).then((res) => {
        if (!props.onChange) {
          return;
        }
        if (count === 1) {
          if (res.length > 0) {
            props.onChange(res[0]);
          }
        } else {
          if (isArray(value)) {
            props.onChange([...value, ...res]);
          }
        }
      });
    }
  }, [canSelectCount, count, props, selectFile, value]);

  const RemoveIcon = () => {
    return (
      <Icon
        onClick={(e) => {
          e.stopPropagation();
          if (props.onChange) {
            props.onChange(undefined);
          }
        }}
        className={'z-30 cursor-pointer text-red-600 text-lg absolute right-[-10px] top-[-10px]'}
        icon={'clarity:remove-line'}
      ></Icon>
    );
  };

  return (
    <div
      onClick={handleSelectFile}
      className={'border border-dashed relative'}
      style={{ width, height }}
    >
      <When condition={!!value}>
        <RemoveIcon />
      </When>
      <When condition={!value}>
        <div className={'w-full h-full flex items-center justify-center cursor-pointer'}>
          <Icon className={'text-3xl'} icon={'mdi-light:plus'}></Icon>
        </div>
      </When>
      <When condition={value && !isArray(value)}>
        {() => (
          <FileItem
            border={false}
            file={value as API.File}
            width={width}
            height={height}
          ></FileItem>
        )}
      </When>
    </div>
  );
};

const ProFormFileSelect: React.FC<
  FormItemProps & {
    fieldProps?: Omit<FileSelectProps, 'value' | 'onChange'>;
  }
> = (props) => {
  const { fieldProps, ...itemProps } = props;

  return (
    <Form.Item {...itemProps}>
      <FileSelect {...fieldProps} />
    </Form.Item>
  );
};

export default ProFormFileSelect;
