import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Tooltip,
  Progress,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";
import { BACKEND_URL, ENV_PROXY } from "@/configs/globalVariable";


const UploadButton = ({selectedFiles, setSelectedFiles}) => {
  console.log("selectedFiles", selectedFiles)
  const [isDragging, setIsDragging] = useState(false);

  const handleFileInput = async (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);
    setSelectedFiles([...selectedFiles, ...e.dataTransfer.files]);
  };
  return (
    <div className="flex items-center justify-center">
      <label
        htmlFor="upload-button"
        className={`flex flex-col items-center justify-center border-2 border-gray-600 rounded-md w-64 h-64 cursor-pointer p-4 text-center transition-all ${
          isDragging ? "bg-gray-300" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
        <span
          className={`text-lg font-medium transition-all ${
            isDragging ? "text-gray-600" : ""
          }`}
        >
          {selectedFiles.length
            ? `${selectedFiles.length} file${
                selectedFiles.length > 1 ? "s" : ""
              } added`
            : "Drag and drop files here or click here"}
        </span>
        <input
          id="upload-button"
          type="file"
          onChange={handleFileInput}
          multiple
          className="hidden"
        />
      </label>
    </div>
  );
};


const CrawlForm = ({url, setUrl}) => {
    const [fetchedLinks, setFetchedLinks] = useState([]);
    const [loading, setLoading] = useState(false);
  
    async function crawlUrl(url) {
        if (loading) return;
        setLoading(true);
        const req = {url: url}
        const response = await fetch(`${ENV_PROXY}/api/v1/upload/crawl`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(req)
        });
        const data = await response.json();
        setFetchedLinks(data.urls || []);
        setLoading(false);
        return data;
      }

    return (
      <div className="flex flex-col justify-center mb-10 pr-12 pl-12">
        <div className="form-container">
          <h1 className="text-center">Crawl website</h1>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="https://artificialworkflow.com"
                name="heading"
                className="w-full px-4 py-2 my-3  mr-2 border rounded-md focus:outline-none focus:shadow-outline-blue"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                onClick={() => crawlUrl(url)}
                disabled={loading}
              >
                {loading ? "crawling..." : "Crawl"}
              </button>
            </div>
            {fetchedLinks && fetchedLinks.length > 0 && <p className="text-center mt-3">Total URLs fetched: {fetchedLinks.length}</p>}
            This will crawl all the links starting with the URL (not including
            files on the website)
          </form>
        </div>
      </div>
    );
  };

export function Data() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function uploadFile(files, links) {
    if (loading) return;
    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    if (links && len(links) > 0) {
        formData.append("links", links);
    }
    const response = await fetch(`${ENV_PROXY}/api/v1/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setLoading(false);
    setSelectedFiles([])
    // Redirect to another route after a successful fetch call
    navigate('/dashboard/home');
    return data;
  }

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
           Upload company data
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 flex flex-col">
          <CrawlForm url={url} setUrl={setUrl} />
          <UploadButton selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
          <div className="flex justify-center mt-10 mb-10">
            <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                onClick = {() => uploadFile(selectedFiles, url)}
                >
                {loading ? "uploading and training..." : "Train chatbot"}
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Data;
