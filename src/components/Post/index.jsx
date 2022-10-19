import { useState } from 'react'
import ptBR from 'date-fns/locale/pt-BR'
import { format, formatDistanceToNow } from 'date-fns'

import { Avatar } from '../Avatar'
import { Comment } from '../Comment'

import styles from './Post.module.css'

export function Post({ author, publishedAt, content }) {
  const [newCommentText, setNewCommentText] = useState('')
  const [comments, setComments] = useState(['Muito bom Diego, parabéns!! 👏👏'])

  const publishedAtFormatted = format(
    publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    },
  )

  const publishDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function ContentFormatted({ type, content }) {
    if (type === 'paragraph') {
      return <p>{content}</p>
    } else if (type === 'link') {
      return (
        <p>
          <a href="#">{content}</a>
        </p>
      )
    }
    return null
  }

  function handleCreateNewComment() {
    event.preventDefault()

    setComments([...comments, newCommentText])
    setNewCommentText('')
  }

  function handleNewCommentText() {
    setNewCommentText(event.target.value)
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time
          title={publishedAtFormatted}
          dateTime={new Date(publishedAt).toISOString()}
        >
          {publishDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(({ type, content }) => (
          <ContentFormatted key={content} content={content} type={type} />
        ))}
      </div>

      <form className={styles.commentForm} onSubmit={handleCreateNewComment}>
        <strong>Deixe seu feedback</strong>

        <textarea
          value={newCommentText}
          placeholder="Deixe um comentário"
          onChange={handleNewCommentText}
        />

        <footer>
          <button type="submit" className={styles.btn}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => (
          <Comment key={comment} comment={comment} />
        ))}
      </div>
    </article>
  )
}
