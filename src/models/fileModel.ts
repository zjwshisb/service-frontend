import React, { useState } from 'react';
import { getFiles } from '@/services';
import { values } from 'lodash';
import { useModel } from '@umijs/max';
import { useDebounce, useHistoryTravel } from 'ahooks';

type fileTypes = API.SelectFileType | API.SelectFileType[];

type selectFileProps = {
  type?: API.SelectFileType | API.SelectFileType[];
  count?: number;
  defaultValue?: API.File[];
};

export default function FileModel() {
  const [open, setOpen] = useState(false);

  const [count, setCount] = useState(1);
  const [fileType, setFileType] = useState<fileTypes | undefined>();

  const { getOptions } = useModel('options');

  const [allFileTypes, setAllFileType] = React.useState<API.Option[]>([]);
  React.useEffect(() => {
    getOptions('file-types').then((res) => setAllFileType(res));
  }, [getOptions]);

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

  const onSelect = React.useRef<(file: API.File[]) => void>();

  const onCancel = React.useRef<() => void>();

  const selectFile: (props?: selectFileProps) => Promise<API.File[]> = React.useCallback(
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
        onSelect.current = (v: API.File[]) => {
          setOpen(false);
          resolve(v);
        };
        onCancel.current = () => {
          setOpen(false);
          reject();
        };
      });
    },
    [allFileTypes],
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
