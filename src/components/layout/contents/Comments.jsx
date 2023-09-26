import { object } from 'prop-types';
import ReplyModal from './ReplyModal';
import Comment from './comment';

function Comments({ data }) {
  return (
    <section className="px-4">
      <h4 className="sr-only">Comments</h4>
      <ReplyModal />
      <ul className="relative flex flex-col gap-y-3">
        {data.expand.comments &&
          data.expand.comments?.map((comment, index) => (
            <li key={comment.id} className="relative flex flex-col">
              <div className="flex gap-x-3">
                <Comment data={comment} index={index} />
              </div>

              <ul>
                {comment.expand?.reply?.map((reply) => (
                  <li key={reply.id} className="ml-12 mt-3 flex gap-x-3">
                    <Comment data={reply} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </section>
  );
}

Comments.propTypes = {
  data: object,
};

export default Comments;
