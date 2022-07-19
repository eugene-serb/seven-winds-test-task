import React from 'react';
import UploadForm from './components/uploadForm';

function App() {
    function sendBlobs(blobFiles: Blob[]): void {
        console.log('[App][sendBlobs]: ', blobFiles);
    };

    return (
        <div className='banner-container'>
            <UploadForm sendBlobs={sendBlobs as Function} />
        </div>
    );
};

export default App;
