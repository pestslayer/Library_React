import { useState } from "react";
import Modal from './Modal'
import { server_calls } from "../api/server";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetData } from "../custom-hooks/FetchData";

const columns: GridColDef[] = [
    {field: 'id', headerName: "ID", width: 90, hide: true},
    {field: 'title', headerName: "Title", flex: 1},
    {field: 'isbn', headerName: "isbn", flex: 1},
    {field: 'author_name', headerName: "author_name", flex: 1},
    {field: 'book_length', headerName: "book_length", flex: 1},
    {field: 'book_type', headerName: "book_type", flex: 1}
]

const Datatable = () => {
  let [ open, setOpen ] = useState(false);
  const { inventoryData, getData } = useGetData();
  const [ selectionModel, setSelectonModel ] = useState<string[]>([])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  
  const deleteData = () => {
    selectionModel.forEach(itemId => {
        server_calls.delete(itemId).then(() => {
            console.log(`Deleted item with ID: ${itemId}`);
        }).catch(error => {
            console.error(`Error deleting item with ID ${itemId}:`, error);
        });
    });
    getData();
    setTimeout(() => {
        window.location.reload();
    }, 500);
}
  
    return (
    <>
        <Modal 
            id={selectionModel}
            open={open}
            onClose={handleClose}
    />
    <div className="flex flex-row justify-center pt-10">
        <div>
            <button
                className="p-3 bg-indigo-500 rounded m-3 hover:bg-indigo-600 hover:text-white"
                onClick={handleOpen}
            >
                Add Book
            </button>
        </div>
            <button onClick={handleOpen} className="p-3 bg-indigo-500 rounded m-3 hover:bg-indigo-600 hover:text-white">Update Book</button>
            <button onClick={deleteData} className="p-3 bg-indigo-500 rounded m-3 hover:bg-indigo-600 hover:text-white">Delete Book</button>
    </div>
    <div className={ open ? "hidden" : " container mx-10 my-5 flex flex-col ml-40 pl-10 "}
        style={{height: 400, width: '100%'}}
    >
        <h1 className="p-3 bg-indigo-400 my-2 rounded flex justify-center text-2xl">Book Stock</h1>
        <DataGrid rows={inventoryData} columns={columns} rowsPerPageOptions={[100]}
        checkboxSelection={true}
        onSelectionModelChange={ (item:any) => {
            setSelectonModel(item)
        }}
        />
    </div>
    </>

  )
}

export default Datatable