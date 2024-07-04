import { useContext, useState } from "react";
import { BookMarkContext } from "../context/BookmarkContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const BookmarkForm = () => {
    const [form, setForm] = useState({id:1,title:"",link:""});

    const {updateBookmark,editingBookmark, clearEditingBookmark} = useContext(BookMarkContext);

    const navigate = useNavigate();
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        updateBookmark(form);
        navigate('/');
    }

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setForm({...form,[name]:value});
    }

    useEffect(() => {
      if(editingBookmark) {
        setForm(editingBookmark)
      }
    
    }, [editingBookmark])

    const handleCancel = () =>{
        clearEditingBookmark();
        navigate('/');
    }
    
  
    return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col item-center justify-center border rounded-lg w-96 h-96">
            <h1 className="text-center mt-4 text-2xl tracking-wider font-extralight"> {editingBookmark? 'Edit Bookmark' : 'Add Bookmark'} </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center justify-center w-full h-full">
                <input value={ form.title } name="title" onChange={handleChange} className="w-3/4 h-10 rounded-sm text-black p-4" type="text" placeholder="Title" required />
                <input value={ form.link } name="link" onChange={handleChange} className="w-3/4 h-10 rounded-sm text-black p-4" type="text" placeholder="bookmark url" required />
                <button className="border w-3/4 h-10 text-xl font-light hover:text-black hover:bg-white transition-all duration-300 ease-in-out" type="submit"> {editingBookmark? 'Update' : 'Add'} </button>
                {editingBookmark && <div onClick={handleCancel} className="text-lg font-light cursor-pointer" type="button" >Cancel</div>}
            </form>
        </div>
    </div>
  )
}

export default BookmarkForm