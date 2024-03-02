function Square({ value }) {
  return (
    <button className="square border-2 border-black bg-transparent px-4 py-2">
      {value}
    </button>
  );
}

export default function Board() {
  return (
    <>
      <div className="flex justify-center items-center flex-col h-screen">
        <div className="">
          <Square value="1" />
          <Square value="2" />
          <Square value="3" />
        </div>
        <div className="">
          <Square value="4" />
          <Square value="5" />
          <Square value="6" />
        </div>
        <div className="">
          <Square value="7" />
          <Square value="8" />
          <Square value="9" />
        </div>
      </div>
    </>
  );
}
