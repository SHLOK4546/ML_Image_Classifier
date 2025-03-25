import React from "react";

const FileUpload = ({ dropzoneRef, onClassify }) => (
  <div className="col-sm-4">
    <div className="row">
      <div className="col-12 mx-auto">
        <div ref={dropzoneRef} className="dropzone">
          <div className="dz-message needsclick">
            <img
              src="./images/upload.png"
              alt="upload"
              width="50"
              height="50"
            />
            <br />
            <span className="note needsclick">
              Drop files here or click to upload
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-3">
      <div className="col-3 mx-auto">
        <button onClick={onClassify} className="btn btn-success">
          event.preventDefault(); Classify
        </button>
      </div>
    </div>
  </div>
);

export default FileUpload;
