import dayjs from 'dayjs';

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??[-+=&;%@.\w_]*#?\w*)?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export function formatTime(time: string) {
  const now = dayjs();
  const date = dayjs(time);
  if (now.isSame(date, 'date')) {
    return date.format('HH:mm:ss');
  }
  const diffDay = now.diff(date, 'day');
  switch (diffDay) {
    case 1: {
      return '昨天 ' + date.format('HH:mm:ss');
    }
    case 2: {
      return '前天 ' + date.format('HH:mm:ss');
    }
    default: {
      return date.format('YYYY-MM-DD HH:mm:ss');
    }
  }
}
