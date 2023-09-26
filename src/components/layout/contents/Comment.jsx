import { useContent } from '@/contexts/Content';
import { useDeleteComment, useStorageData } from '@/hooks';
import { calcTimeDifference, getDateTime } from '@/utils';
import { number, object } from 'prop-types';
import { ProfileImage } from '..';
import { ReactComponent as TrashCan } from '/src/assets/trashCan_Contents.svg';

function Comment({ data, index }) {
  const storageData = useStorageData();
  const { handleDeleteComment } = useDeleteComment(data);
  const { setSelectedComment, openModal, setOpenModal } = useContent();
  const handleOpenModal = (e) => {
    if (openModal === false && (e.key === 'Enter' || e.type === 'click')) {
      setSelectedComment({
        id: data.id,
        nickname: data.commenterNickname,
        reply: data.reply,
      });

      setOpenModal(true);
    }
    return;
  };

  return (
    <>
      <ProfileImage
        nickname={data.expand?.commenter.nickname}
        imageName={[data.commenter, data.expand?.commenter.profile_image]}
      />

      <div className="flex flex-col gap-y-px">
        <div className="flex gap-x-2">
          <span className="text-lionly-sm-bold">
            {data.expand?.commenter.nickname}
          </span>

          <time
            dateTime={`${getDateTime(data.created)}`}
            className="text-lionly-sm text-lionly-gray-2"
          >
            {calcTimeDifference(data.created)}
          </time>

          {storageData.id === data.commenter ? (
            <TrashCan
              tabIndex="0"
              role="button"
              type="button"
              onClick={() => {
                handleDeleteComment(data.id);
              }}
              className="w-3 fill-lionly-primary-color transition-all hover:scale-125"
            />
          ) : null}
        </div>

        <p className="text-lionly-sm">{data.comment}</p>

        {data.collectionName === 'comments' ? (
          <span
            id={`writeReply${index}`}
            tabIndex="0"
            role="button"
            aria-haspopup="true"
            aria-pressed={openModal ? true : false}
            onKeyDown={(e) => handleOpenModal(e, data)}
            onClick={(e) => handleOpenModal(e, data)}
            className="w-fit cursor-pointer text-lionly-sm text-lionly-gray-2"
          >
            답글 달기
          </span>
        ) : null}
      </div>
    </>
  );
}

Comment.propTypes = {
  data: object,
  index: number,
};

export default Comment;
