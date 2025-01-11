import React from 'react';
import { useModel } from '@umijs/max';
import Wrapper from '../Wrapper';
import classNames from 'classnames';
import { MessageOutlined } from '@ant-design/icons';
import { Empty, Segmented } from 'antd';
import WaitingItem from './WaitingItem';
import { useClickAway } from 'ahooks';

const Index = () => {
  const { setOnMessage } = useModel('chat.websocket');

  const { waitingUsers, setWaitingUsers } = useModel('chat.waitingUsers');
  const { notify } = useModel('chat.notification');

  React.useEffect(() => {
    setOnMessage((action: API.Action<API.WaitingUser[]>) => {
      if (action.action === 'waiting-users') {
        setWaitingUsers((prevState) => {
          if (prevState.length < action.data.length) {
            notify('有新的用户待接入');
          }
          return action.data;
        });
      }
    }, 'waiting-users');
  }, [notify, setOnMessage, setWaitingUsers]);

  const reverseData = React.useMemo(() => {
    return [...waitingUsers].reverse();
  }, [waitingUsers]);

  const [active, setActive] = React.useState(false);

  const [types, setTypes] = React.useState('user');

  const ref = React.useRef<HTMLDivElement>(null);

  useClickAway(() => {
    setActive(false);
  }, ref.current?.parentElement);
  return (
    <>
      <div
        ref={ref}
        className={classNames(
          'absolute z-30 top-0 flex flex-col left-[60px] h-full bg-[#f7f7f7] overflow-hidden transition-all',
          {
            'w-0': !active,
            'border-r': active,
            'w-[280px]': active,
          },
        )}
      >
        <div className={'flex items-center justify-center py-4 flex-shrink-0'}>
          <Segmented
            value={types}
            onChange={setTypes}
            options={[
              {
                label: `待接入用户(${reverseData.length})`,
                value: 'user',
              },
            ]}
          />
        </div>
        <div className={'flex-1'}>
          <div>
            {reverseData.map((item) => {
              return <WaitingItem user={item} key={item.id} />;
            })}
            {reverseData.length === 0 && <Empty className={'mt-4'}></Empty>}
          </div>
        </div>
      </div>
      <Wrapper
        onClick={() => {
          setActive((v) => !v);
        }}
        badge={{
          count: waitingUsers.length,
        }}
        active={active}
      >
        <MessageOutlined />
      </Wrapper>
    </>
  );
};
export default Index;
