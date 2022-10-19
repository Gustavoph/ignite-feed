import styles from './Avatar.module.css'

export function Avatar({ hasBorder = true, src }) {
  return (
    <img
      alt=""
      src={src}
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
    />
  )
}
