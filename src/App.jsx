import './App.css'
import BookmarkForm from './components/BookmarkForm'
import { Routes, Route } from 'react-router-dom';
import BookmarkProvider from './context/BookmarkProvider';
import BookmarkList from './components/BookmarkList';
import NotFound from './components/NotFound';

const App = ()=> {

  return (
    <>
    <BookmarkProvider>
      <Routes>
        <Route path='/' element={<BookmarkList />}></Route>
        <Route path='/add' element={<BookmarkForm />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BookmarkProvider>
    </>
  )
}

export default App
