import React, { useState } from 'react';
import { getFiles } from '@/services';
import { useRequest } from '@umijs/max';
import { values } from 'lodash';

type OnFileSelect = (f: FileValue) => void;

type FileValue = API.File | API.File[];

type selectFileProps = {
  type?: API.FileType;
  count?: number;
  checked?: API.File[];
};

export default function FileModel() {
  const [open, setOpen] = useState(false);

  const [count, setCount] = useState(1);

  const [fileType, setFileType] = useState<API.FileType | API.FileType[] | undefined>();

  const [currentDir] = useState<API.File>();

  const [checked, setChecked] = useState<API.File[]>([]);

  const { data, loading, run } = useRequest(
    async () => {
      return getFiles({
        dir_id: currentDir ? currentDir.id : 0,
        last_id: checked.length > 0 ? checked[checked.length - 1].id : 0,
      });
    },
    {
      initialData: [],
    },
  );

  const triggerChecked = React.useCallback(
    (f: API.File) => {
      if (count > 1) {
        setChecked((prevState) => {
          const newState = [...prevState];
          const index = newState.findIndex((v) => v.id === f.id);
          if (index > -1) {
            newState.splice(index, 1);
          } else {
            if (newState.length < count) {
              newState.push(f);
            }
          }
          return newState;
        });
      } else {
        setChecked((prevState) => {
          if (prevState.length === 0 || prevState[0].id !== f.id) {
            return [f];
          } else {
            return [];
          }
        });
      }
    },
    [count],
  );

  const onSelect = React.useRef<OnFileSelect>();

  const onCancel = React.useRef<() => void>();

  const selectFile: (props?: selectFileProps) => Promise<FileValue> = React.useCallback(
    (props?: selectFileProps) => {
      const { count = 1, checked = [], type = undefined } = props || {};
      setCount(count);
      setChecked(checked);
      setFileType(type);
      setOpen(true);
      return new Promise((resolve, reject) => {
        onSelect.current = (f: FileValue) => {
          setOpen(false);
          resolve(f);
        };
        onCancel.current = () => {
          reject();
        };
      });
    },
    [],
  );

  return {
    data,
    loading,
    fileType,
    count,
    open,
    getFiles: run,
    selectFile,
    onSelect,
    onCancel,
    setOpen,
    values,
    triggerChecked,
    checked,
  };
}
