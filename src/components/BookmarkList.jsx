import { useContext, useState } from "react";
import { BookMarkContext } from "../context/BookmarkContext";
import { Link, useNavigate } from "react-router-dom";
import 'remixicon/fonts/remixicon.css';
import {ToastContainer} from 'react-toastify';

const BookmarkList = () => {

    const {bookmarks,removeBookmark, editUpdate, exportBookmarks} = useContext(BookMarkContext);

    const [search, setSearch] = useState('');

    const navigate = useNavigate();


    const filterBookmarks = bookmarks.filter(bookmark =>
        bookmark.title.toLowerCase().includes(search.toLowerCase())
    )

    const handleEdit = (bookmark) =>{
        editUpdate(bookmark);
        navigate('/add');
    }

  return (
    <div className="w-screen h-screen flex flex-col items-center gap-4">
        
        <div className="flex w-screen items-center justify-between px-4">
            <h1 className="m-4 font-extralight text-5xl">Bookmarks Manager</h1>
            <div>
                <Link to="/add"> <button className="border p-2 rounded-full hover:text-black hover:bg-white transition-all duration-300 ease-in-out text-lg font-extralight">Add Bookmark</button> </Link>
                <button onClick={exportBookmarks} className="border p-2 rounded-full hover:text-black hover:bg-white transition-all duration-300 ease-in-out text-lg font-extralight">Export Bookmarks</button>
            </div>
        </div>
        
        
        <div className="border w-1/2 h-3/4 overflow-y-auto overflow-x-hidden rounded-lg ">
        
            <div className="flex items-center justify-between p-4 border bg-black rounded-lg">
                <h1 className="mt-2 font-extralight text-nowrap sm:text-lg md:text-2xl lg:text-4xl">Added Bookmarks</h1>
                <input type="text" value={search} onChange={(e)=>{setSearch(e.target.value)}} placeholder="search" className="p-2 bg-transparent border h-[40px] rounded-lg " />
            </div>
        
        
        {filterBookmarks.length!=0? 
        
        <div className="flex flex-col gap-4 p-4">
            {filterBookmarks&& (
                filterBookmarks.map((item,index)=>(
                    <div key={index} className="border p-2 w-full rounded-md flex items-center justify-between">
                        <div>
                            <h1 className="font-bold text-xl"> {item.title} </h1>
                            <a href={item.link} target="_blank" rel="noopener noreferrer"> <p className="font-light text-slate-400"> {item.link} </p> </a>
                        </div>
                        
                        <div className="flex gap-4">
                            <i onClick={()=>handleEdit(item)} className="ri-edit-2-line text-2xl text-green-500 cursor-pointer"></i>
                            <i onClick={()=>removeBookmark(item.id)} className="ri-delete-bin-2-line text-2xl text-red-500 cursor-pointer"></i>
                        </div>
                    </div>
                ))
            )}
        </div>:
        <div className="flex items-center justify-center h-full">
            <h1 className="text-4xl text-shadow-sm font-extralight mt-2">No Bookmarks to show</h1>
        </div>
        }
        
        </div>
        <ToastContainer 
        position="bottom-right"
        >

        </ToastContainer>
    </div>
  )
}

export default BookmarkList;