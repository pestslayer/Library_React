import InventoryForm from "./InventoryForm";

type Props = {
    id?: string[];
  open: boolean;
  onClose: () => void;
};

const Modal = (props: Props) => {
  if (!props.open) return <></>;
  return (
    <div
      onClick={props.onClose}
      className="fixed w-full h-full flex overflow-auto z-1 justify-center align-middle bg-indigo-600 bg-opacity-25"
    >
      <div
        className="max-w-600px w-2/5 fixed flex z-1 mt-20  bg-gradient-to-b from-white to-indigo-500 bg-opacity-30 shadow-xl rounded "
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="w-full flex flex-col">
          <div className="flex flex-row space-apart">
            <p
              className="flex justify-start m-3 bg-indigo-400 p-2 rounded hover:bg-indigo-500 text-white"
              onClick={props.onClose}
            >
              X
            </p>
        </div>
          <div className="flex flex-col items-center text-center mt-3 p-2">
          <InventoryForm id={props.id} onClose={props.onClose}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
