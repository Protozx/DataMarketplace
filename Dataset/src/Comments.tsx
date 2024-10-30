
interface Comment {
    id: number;
    author: string;
    content: string;
    date: string;
}

interface CommentsProps {
    comments: Comment[];
}

function Comments({ comments }: CommentsProps) {
    return (
        <div>
            {comments.length === 0 ? (
                <p>No hay comentarios disponibles.</p>
            ) : (
                <ul className="list-group">
                    {comments.map(comment => (
                        <li key={comment.id} className="list-group-item mt-2">
                            <h5>{comment.author} <small className="text-muted">{comment.date}</small></h5>
                            <p>{comment.content}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Comments;
