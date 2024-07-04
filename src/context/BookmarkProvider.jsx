import { useState } from 'react'
import { BookMarkContext } from './BookmarkContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line react/prop-types
const BookmarkProvider = ({children}) => {

    const [id, setId] = useState(1);
    const [bookmarks, setBookmarks] = useState([]);
    const [editingBookmark, setEditingBookmark] = useState(null);

    const exportNotify = () =>{
      toast("No Bookmarks to Export");
    }

    const removeNotify = () =>{
      toast("Bookmark deleted");
    }


    const updateId = () =>{
      setId(prev=>prev+1);
    }

    const updateBookmark = (bookmark) =>{
      bookmark = {...bookmark, id:id};
      if(editingBookmark) {
        setBookmarks(bookmarks.map(b=>(b.id===editingBookmark.id?bookmark:b)))
        setEditingBookmark(null);
      }else {
        console.log(bookmark);
        setBookmarks([bookmark,...bookmarks]);
        setId(id+1);
      }
    }

    const editUpdate = (bookmark) =>{
      setEditingBookmark(bookmark);
    }

    const removeBookmark = (id) => {
        const temp = bookmarks.filter(mark=>mark.id!==id);
        setBookmarks(temp);
        removeNotify();
    }

    const clearEditingBookmark = () => {
      setEditingBookmark(null);
    };

    const exportBookmarks = () => {

      if (bookmarks.length === 0) {
        exportNotify();
        return;
      }

      const htmlContent = `
        <html>
          <head><title>Bookmarks</title></head>
          <body>
            <h1>Bookmarks</h1>
            <ul>
              ${bookmarks.map(bookmark => `
                <li>
                  <a href="${bookmark.link}" target="_blank">${bookmark.title}</a>
                </li>
              `).join('')}
            </ul>
          </body>
        </html>
      `;
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'bookmarks.html';
      link.click();
      URL.revokeObjectURL(url);
    };

  return (
    <BookMarkContext.Provider value={{exportBookmarks, bookmarks, updateBookmark, id, updateId, removeBookmark,editingBookmark, editUpdate, clearEditingBookmark}}>
        {children}
    </BookMarkContext.Provider>
  )
}

export default BookmarkProvider;