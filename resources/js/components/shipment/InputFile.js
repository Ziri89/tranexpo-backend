import React from "react";
import ImageUploader from "react-images-upload";
import "./InputFile.css";

const InputFile = props => {
    return (
        <React.Fragment>
            <label className="text-danger">
                {props.labelText}
                <input type="hidden" id="urlInput" value={props.url} />
            </label>
            <ImageUploader
                key="image-uploader"
                withIcon={true}
                singleImage={true}
                withPreview={true}
                label="Maximum size file: 1MB"
                onChange={props.onImage}
                imgExtension={[".jpg", ".png", ".jpeg"]}
                maxFileSize={1048576}
            ></ImageUploader>
        </React.Fragment>
    );
};

export default InputFile;
