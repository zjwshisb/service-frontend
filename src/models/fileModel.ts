import React, { useState } from 'react';
import { getFiles } from '@/services';
import { values } from 'lodash';
import { useModel } from '@umijs/max';
import { useDebounce, useHistoryTravel } from 'ahooks';
import { useOptions } from '@/hooks/useOptions';

type FileValue = API.File | API.File[];

type selectFileProps = {
  type?: API.FileType;
  count?: number;
  defaultValue?: API.File[];
};

export default function FileModel() {
  const [open, setOpen] = useState(false);

  const [count, setCount] = useState(1);
  const [fileType, setFileType] = useState<API.FileType | API.FileType[] | undefined>();

  const allFileTypes = useOptions('file-types');

  const {
    value: dirLinks,
    setValue: setDirLinks,
    backLength,
    forwardLength,
    back,
    forward,
  } = useHistoryTravel<API.File[]>([]);

  const [checked, setChecked] = useState<API.File[]>([]);

  const [files, setFiles] = React.useState<API.File[]>([]);

  const [loading, setLoading] = React.useState(false);

  const { initialState } = useModel('@@initialState');

  const lastDir = React.useMemo(() => {
    if (dirLinks) {
      return dirLinks.length > 0 ? dirLinks[dirLinks.length - 1] : undefined;
    }
    return undefined;
  }, [dirLinks]);

  const fetchFiles = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await getFiles({
        dir_id: lastDir ? lastDir.id : 0,
      });
      setFiles(res.data);
    } catch {}
    setLoading(false);
  }, [lastDir]);

  React.useEffect(() => {
    if (initialState?.currentUser) {
      fetchFiles().then();
    }
  }, [fetchFiles, initialState?.currentUser]);

  const onDirClick = React.useCallback(
    (file: API.File) => {
      const newLinks = dirLinks ? [...dirLinks] : [];
      newLinks.push(file);
      setDirLinks(newLinks);
    },
    [dirLinks, setDirLinks],
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

  const onSelect = React.useRef<() => void>();

  const onCancel = React.useRef<() => void>();

  const selectFile: (props?: selectFileProps) => Promise<FileValue> = React.useCallback(
    (props?: selectFileProps) => {
      const { count = 1, defaultValue = [], type = undefined } = props || {};
      setCount(count);
      setChecked(defaultValue);
      if (type) {
        setFileType(type);
      } else {
        setFileType(allFileTypes?.map((v) => v.value) as API.FileType[]);
      }
      setOpen(true);
      return new Promise((resolve, reject) => {
        onSelect.current = () => {
          setOpen(false);
          resolve(checked);
        };
        onCancel.current = () => {
          setOpen(false);
          reject();
        };
      });
    },
    [allFileTypes, checked],
  );

  const [filter, setFilter] = React.useState('');
  const debouncedFilter = useDebounce(filter, { wait: 300 });

  const filterFile = React.useMemo(() => {
    if (debouncedFilter) {
      return files.filter((v) => {
        return v.name.includes(debouncedFilter);
      });
    }
    return files;
  }, [files, debouncedFilter]);

  return {
    files: filterFile,
    setFilter,
    filter,
    loading,
    fileType,
    count,
    open,
    refresh: fetchFiles,
    selectFile,
    onSelect,
    onCancel,
    values,
    triggerChecked,
    checked,
    back,
    forward,
    backLength,
    forwardLength,
    lastDir,
    onDirClick,
  };
}
