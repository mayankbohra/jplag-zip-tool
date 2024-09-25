import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadPage() {
    const [files, setFiles] = useState([]);
    const [language, setLanguage] = useState('c');
    const [uploading, setUploading] = useState(false);
    const [downloadLinks, setDownloadLinks] = useState([]);
    const [showUploadButton, setShowUploadButton] = useState(true);

    useEffect(() => {
        checkFolders();
    }, []);

    const checkFolders = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/upload/check-folders');
            const data = await response.json();
            if (data.uploadsEmpty && data.resultsEmpty) {
                setShowUploadButton(true);
            } else {
                setShowUploadButton(false);
                setDownloadLinks(data.zipFiles);
            }
        } catch (error) {
            console.error('Error checking folders:', error);
        }
    };

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const file of files) {
            formData.append('files', file);
        }
        formData.append('language', language);

        setUploading(true);
        toast.info('Uploading files...');

        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                toast.success(result.message || 'Files uploaded and processed successfully.');
                setShowUploadButton(false);
                setDownloadLinks(result.zipFiles);
            } else {
                const errorResult = await response.json();
                toast.error(errorResult.message || 'Failed to upload files.');
            }
        } catch (error) {
            toast.error('Error occurred during file upload.');
        } finally {
            setUploading(false);
        }
    };

    const handleClearFiles = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/upload/clear-files', {
                method: 'DELETE',
            });
            if (response.ok) {
                toast.success('All files cleared successfully.');
                setDownloadLinks([]);
                setShowUploadButton(true);
            } else {
                const errorResult = await response.json();
                toast.error(errorResult.message || 'Failed to clear files.');
            }
        } catch (error) {
            toast.error('Failed to clear files.');
        }
    };

    const handleCheckClick = () => {
        window.open('https://jplag.github.io/JPlag/', '_blank');
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card p-4 shadow-sm">
                        <h2 className="text-center mb-4">Upload Files</h2>
                        {showUploadButton ? (
                            <form onSubmit={handleUpload}>
                                <div className="mb-3">
                                    <input
                                        type="file"
                                        name="files"
                                        className="form-control"
                                        multiple
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <select
                                        value={language}
                                        className="form-select"
                                        onChange={(e) => setLanguage(e.target.value)}
                                    >
                                        <option value="c">C</option>
                                        <option value="python">Python</option>
                                        <option value="cpp">C++</option>
                                        <option value="java">Java</option>
                                    </select>
                                </div>
                                {!uploading && (
                                    <button type="submit" className="btn btn-primary w-100">Upload</button>
                                )}
                            </form>
                        ) : (
                            <>
                                {downloadLinks.length > 0 && (
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>File Name</th>
                                                <th>Download Link</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {downloadLinks.map((file, index) => (
                                                <tr key={index}>
                                                    <td>{file}</td>
                                                    <td>
                                                        <a href={`http://localhost:5000/results/${file}`} className="btn btn-link" download>
                                                            Download
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-danger" onClick={handleClearFiles}>
                                        Clear Files
                                    </button>
                                    <button className="btn btn-info" onClick={handleCheckClick}>
                                        Check
                                    </button>
                                </div>
                            </>
                        )}
                        {uploading && <div className="text-center mt-3"><p>Uploading...</p></div>}
                    </div>
                    <p className="text-center mt-4">
                        Made with ❤️ by <a href="https://www.linkedin.com/in/rsoran/" target="_blank" rel="noopener noreferrer">Ravindra</a> & <a href="https://mayankbohra.netlify.app/" target="_blank" rel="noopener noreferrer">Mayank</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default UploadPage;
