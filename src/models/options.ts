import React from 'react';
import { getOptions as fetchOptions } from '@/services';

export default function () {
  const [options, setOptions] = React.useState<Partial<Record<API.OptionType, API.Option[]>>>({});

  const getOptions = React.useCallback(
    async (type: API.OptionType) => {
      if (options[type]) {
        return Promise.resolve(options[type]);
      } else {
        const res = await fetchOptions(type);
        setOptions((prevState) => {
          const newState = { ...prevState };
          newState[type] = res.data;
          return newState;
        });
        return res.data;
      }
    },
    [options],
  );

  return { getOptions, options };
}
