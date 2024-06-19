import { useEffect, useState } from 'react';

function MainContent() {
  const [itemData, setItemData] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  const [showCoverImageModal, setShowCoverImageModal] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['itemData'], (result) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
      if (result.itemData) {
        setItemData(result.itemData);
        setTitle(result.itemData.title);
        console.log(`Fetched itemData: ${JSON.stringify(result.itemData)}`);
      } else {
        console.log('Item Data not found in storage');
      }
    });
  }, []);

  return (
    // <div className="mx-8 flex min-h-screen flex-col items-center justify-center text-white md:w-1/2 md:flex-row">
    //   <div className="rounded-lg bg-gray-800 p-8 shadow-lg">
    //     <h1 className="text-2xl font-bold text-slate-400 hover:text-slate-300">
    //       {!itemData ? 'Loading...' : itemData.title}
    //     </h1>

    //     <img
    //       src=""
    //       alt="immmmmmm"
    //       onClick={() => setShowCoverImageModal(!showCoverImageModal)}
    //     ></img>

    //     {showCoverImageModal && (
    //       <Modal>
    //         <CoverImage coverImage={coverImage} />
    //       </Modal>
    //     )}

    //     <div className="flex">
    //       <label
    //         htmlFor="title"
    //         className="p-2 text-lg font-bold text-slate-400 hover:text-slate-300"
    //       >
    //         Title
    //       </label>
    //       <input
    //         id="title"
    //         type="text"
    //         class="ml-2 flex-1 rounded border-none bg-gray-800 p-2 text-lg font-bold text-slate-400 focus:outline-none focus:ring-2 focus:ring-gray-800"
    //       />
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-col items-center justify-center">
      <h1 className="xsm:text-2xl text-lg font-bold text-slate-400 hover:text-slate-300">
        Cover Image
      </h1>
      <div className="xsm:flex-row flex flex-col items-center">
        <label
          htmlFor="title"
          className="xsm:text-xl m-2 text-lg font-bold text-slate-400 hover:text-slate-300"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          defaultValue={'Write Title'}
          className="xsm:text-lg m-2 w-full flex-1 border-b border-transparent bg-gray-800 text-sm font-bold text-slate-400 hover:border-b hover:border-gray-300 focus:border-b focus:border-gray-300 focus:outline-none focus:ring-0 md:w-auto"
        />
      </div>
    </div>
  );
}
export default MainContent;
