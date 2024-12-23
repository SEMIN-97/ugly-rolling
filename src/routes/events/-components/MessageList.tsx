import { FC } from 'react';
import styles from './messageList.module.scss';

interface MessageItemProp {
  message: string;
  image: string;
  nickname: string;
  date: string;
}

interface MessageListProp {
  items: MessageItemProp[] | undefined;
}

export const MessageList: FC<MessageListProp> = ({
  items
}) => {
  return (
    <ul>
      {
        items?.length ? (
          items.map((item => (
            <li key={`${item.date}${item.nickname}`}>
              <div className={styles.imageContainer}>
                <img src={`/assets/images/ornaments/${item.image}.png`} alt=""/>
              </div>
              <div className={styles.messageContainer}>
                <strong>{item.nickname} <span className={styles.date}>{item.date}</span></strong>
                <p>{item.message}</p>
              </div>
            </li>
          )))
        ) : (
          <p className={styles.emptyMessage}>등록된 메세지가 없습니다</p>
        )
      }
    </ul>
  );
};