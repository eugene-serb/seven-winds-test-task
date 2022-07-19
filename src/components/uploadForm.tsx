import React from 'react';

interface IUploadForm {
    sendBlobs: Function,
};

class UploadForm extends React.Component<IUploadForm> {

    private inputFiles: React.RefObject<HTMLInputElement>;
    private blobFiles: Array<Blob>;
    private fileCount: number;
    private fileType: string;

    constructor(props: IUploadForm) {
        super(props);

        this.inputFiles = React.createRef<HTMLInputElement>();
        this.blobFiles = [] as Blob[];
        this.fileCount = 0;
        this.fileType = 'text/plain';

        this.onClick = this.onClick.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
    };

    sendBlobs(): void {
        this.props.sendBlobs(this.blobFiles);
        this.blobFiles = [] as Blob[];
    };

    onChangeInput(): void {
        if (this.inputFiles.current?.files?.length) {

            this.fileCount = this.inputFiles.current.files.length;

            for (let i = 0; i < this.inputFiles.current.files.length; i++) {

                const reader = new FileReader();
                reader.readAsBinaryString(this.inputFiles.current.files[i]);
                console.log(this.inputFiles.current.files[i]);

                reader.onload = () => {
                    const result: string = reader.result as string;
                    console.log(result);
                    const blob: Blob = new Blob([result], { type: this.fileType });
                    this.blobFiles.push(blob as Blob);
                    this.fileCount--;
                    if (this.fileCount === 0) {
                        this.sendBlobs();
                    };
                };

                reader.onerror = () => {
                    console.error('[ERROR] File read error.');
                    this.fileCount--;
                    if (this.fileCount === 0) {
                        this.sendBlobs();
                    };
                };
            };
        };
    };

    onClick(event: React.FormEvent): void {
        event.preventDefault();
        this.inputFiles.current?.click();
    };

    render() {
        return (
            <form className='banner'>
                <button
                    onClick={this.onClick}
                    className='button'
                >Click</button>
                <input
                    ref={this.inputFiles}
                    onChange={this.onChangeInput}
                    type='file'
                    accept={this.fileType}
                    multiple
                    className='hidden'
                />
            </form>
        );
    };
};

export default UploadForm;
