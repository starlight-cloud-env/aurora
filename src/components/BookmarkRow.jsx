import MediaRow from './MediaRow'

const BookmarkRow = ({ items, openItem }) => {
  if (!items || items.length === 0) {
    return null
  }

  return <MediaRow title="My Bookmarks" items={items} openItem={openItem} />
}

export default BookmarkRow
