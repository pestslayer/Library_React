import Input from "./Input";
import { useForm } from "react-hook-form";
import { server_calls } from "../api/server";
import { useDispatch, useStore } from "react-redux";
import { chooseTitle, chooseISBN, chooseAuthor, chooseLength, chooseType } from "../redux/slices/RootSlice";


interface InventoryFormProps {
  id?: string[];
  onClose: () => void;
}

const InventoryForm = (props: InventoryFormProps) => {
  const { register, handleSubmit } = useForm({});
  const dispatch = useDispatch();
  const store = useStore();

  const onSubmit = (data: any, event: any) => {
    console.log(`ID: ${typeof props.id}`)
    console.log(props.id)
    console.log(data)
    if (props.id && props.id.length > 0) {
        server_calls.update(props.id[0], data)
        setTimeout ( () => {window.location.reload()}, 500)
        console.log(`Updated: ${ data.first } ${ props.id }`)
    } else {
        dispatch(chooseTitle(data.title));
        dispatch(chooseISBN(data.isbn));
        dispatch(chooseAuthor(data.author_name));
        dispatch(chooseLength(data.book_length));
        dispatch(chooseType(data.book_type));
        console.log(data + "in dispatch")

        server_calls.create(store.getState())
        setTimeout( () => {window.location.reload()},500)
        event.target.reset()

        props.onClose();
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-sans font-semibold ">Manage Books</h1>
        <div>
          <label className="" htmlFor="title"></label>
          <Input  {...register("title")} name="title" placeholder="Title" />
        </div>
        <div>
          <label htmlFor="isbn"></label>
          <Input {...register("isbn")} name="isbn" placeholder="ISBN" />
        </div>
        <div>
          <label htmlFor="author_name"></label>
          <Input
            {...register("author_name")}
            name="author_name"
            placeholder="Author"
          />
        </div>
        <div>
          <label htmlFor="book_length"></label>
          <Input
            {...register("book_length")}
            name="book_length"
            placeholder="Book Length"
          />
        </div>
        <div>
          <label htmlFor="book_type"></label>
          <Input
            {...register("book_type")}
            name="book_type"
            placeholder="Book Type"
          />
        </div>
        <div className="flex p-1">
          <button className="flex justify-center ml-20 m-3 bg-indigo-300 p-2 rounded hover:bg-indigo-500 text-white">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;
