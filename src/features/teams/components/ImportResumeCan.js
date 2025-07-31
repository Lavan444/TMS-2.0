import React, { useState, useEffect, useRef } from "react";
import { Tooltip } from 'primereact/tooltip';
import { FileUpload } from 'primereact/fileupload';
import { useNavigate } from "react-router-dom";

const ImportResumeCan = () => {
    const navigate = useNavigate();
    const fileUploadRef = useRef(null);

    const customBase64Uploader = async (event) => {
        try {
            // Access the uploaded file
            const file = event.files[0];  // Fixed typo: was 'event.files[0]'
            console.log("File selected:", file);

            // Redirect the user immediately after file submission
            navigate("/candidate-editform");

            // Optional: Process the file in the background
            const blob = await fetch(file.objectURL).then(r => r.blob());
            const reader = new FileReader();
            reader.readAsDataURL(blob);

            reader.onloadend = function () {
                const base64data = reader.result; // Base64 encoded data
                console.log("Base64 Encoded Data:", base64data);
            }
        } catch (error) {
            console.error("Error during file upload:", error);
        }
    };

    return (
        <React.Fragment>
            <Tooltip
                target=".import"
                content="Import Resume"
                position="top"
            />
            <FileUpload
                mode="basic"
                name="demo[]"
                customUpload={true}
                uploadHandler={customBase64Uploader}
                accept="*/*"  // Correct accept attribute
                chooseLabel="Import Resume"
                chooseOptions={{
                    className: "p-button p-button-icon-only import icons-btn me-1",
                    icon: "pi pi-file-import",
                    iconOnly: true,
                }}
                auto // This will trigger upload immediately on file selection
                style={{ display: 'inline-block' }}
            />
        </React.Fragment>
    );
};

export default ImportResumeCan;