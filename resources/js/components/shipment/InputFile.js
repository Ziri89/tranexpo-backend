import React from "react";
import ImageUploader from "react-images-upload";
import "./InputFile.css";

const InputFile = props => {
    return (
        <React.Fragment>
            <label className="text-danger">{props.labelText}</label>
            <ImageUploader
                key="image-uploader"
                value={props.image}
                withIcon={true}
                singleImage={true}
                withPreview={true}
                label="Maximum file size: 1MB"
                onChange={props.onImage}
                imgExtension={[".jpg", ".png", ".jpeg"]}
                maxFileSize={1048576}
                fileSizeError=" file size is too big"
                dataURLKey="data_url"
            ></ImageUploader>
        </React.Fragment>
    );
};

export default InputFile;
