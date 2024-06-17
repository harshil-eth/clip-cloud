import { useState, useEffect } from 'react';
import CoverImage from './CoverImage';
import Modal from 'react-bootstrap/Modal';

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
        <div className="mx-8 flex min-h-screen w-1/2 items-center justify-center text-white">
            <div className="rounded-lg bg-gray-800 p-8 shadow-lg">
                <h1 className="text-2xl font-bold text-slate-400 hover:text-slate-300">
                    {!itemData ? 'Loading...' : itemData.title}
                </h1>
                <img src="" alt="immmmmmm" onClick={() => setShowCoverImageModal(!showCoverImageModal)}></img>
                {showCoverImageModal &&
                    <Modal>
                        <CoverImage coverImage={coverImage} />
                    </Modal>
                }
            </div>
        </div>
    );
}
export default MainContent;
