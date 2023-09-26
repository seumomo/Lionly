import pb from '@/api/pocketbase';
import useContentData from './useContentData';

function useDeleteComment(data) {
  const { refetch } = useContentData();
  const handleDeleteComment = async (recordId) => {
    if (
      confirm(
        `${
          data.collectionName === 'comments' ? '댓글' : '답글'
        }을 삭제하시겠습니까?`
      )
    ) {
      await pb.collection(data.collectionName).delete(recordId);

      data.reply.length > 0
        ? data.reply.forEach(
            async (reply) => await pb.collection('reply').delete(reply)
          )
        : null;

      await refetch();

      return;
    }

    return;
  };

  return { handleDeleteComment };
}

export default useDeleteComment;
