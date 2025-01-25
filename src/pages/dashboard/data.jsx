import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Tabs,
  TabsHeader,
  Tab,
} from "@material-tailwind/react";
import { useState } from "react";
import { BACKEND_URL, ENV_PROXY } from "@/configs/globalVariable";


const UploadButton = ({selectedFiles, setSelectedFiles, uploadFile, loading}) => {
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
    <>
    <div className="flex items-center justify-center">
      <label
        htmlFor="upload-button"
        className={`flex flex-col items-center justify-center border-2 border-[#454545] rounded-md w-64 h-64 cursor-pointer p-2 mt-8 text-center transition-all ${
          isDragging ? "bg-gray-300" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <svg aria-hidden="true" className="w-20 h-13 mb-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
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
    <div className="flex justify-center mt-5 mb-5">
      <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded custom-button"
          onClick = {() => uploadFile(selectedFiles, [])}
          >
          {loading ? "uploading and training..." : "Train"}
      </button>
    </div>
    <div><h1 className="text-center mt-5">Click on Train once you have uploaded your relevant data</h1></div>
    </>
  );
};


const CrawlForm = ({url, setUrl, fetchedLinks, setFetchedLinks, uploadFile, trainLoading}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
  
    async function crawlUrl(url) {
      if (loading) return;
      setLoading(true);
      const req = { url: url };
      const token = localStorage.getItem("token");
    
      try {
        const response = await fetch(`${ENV_PROXY}/v1/upload/crawl`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(req),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setFetchedLinks(data.urls || []);
        setLoading(false);
        setError(false);
        return data;
      } catch (error) {
        setFetchedLinks([]);
        console.error('Error occurred while crawling the URL:', error);
        setLoading(false);
        setError('Error occurred while crawling the URL')
        // Handle the failure case as needed, e.g., show a notification, update the UI, etc.
      }
    }

    return (
      <div className="flex flex-col justify-center mb-10 pr-12 pl-12">
    <div className="form-container">
    <form onSubmit={(event) => event.preventDefault()}>
      <div className="flex flex-col md:flex-row items-center">
        <div className="flex-1 md:mr-2">
          <input
            type="text"
            placeholder="https://artificialworkflow.com"
            name="heading"
            className="w-full px-4 py-2 my-3 border rounded-md focus:outline-none focus:shadow-outline-blue"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="pd-4">
            This will crawl all the links starting with the URL (not including files on the website)
          </div>
        </div>
        <div className="buttons-wrapper flex items-center">
          <div className="buttons flex md:flex-col items-center md:items-start">
            <button
              type="submit"
              className="bg-white-500 py-2 px-4 rounded border hover:bg-gray-100 mt-5"
              onClick={() => crawlUrl(url)}
              style={{ border: "1px solid #000000", minWidth: "6rem", borderRadius: "5px" }}
              disabled={loading || url == ""}
            >
              {loading ? "crawling..." : "Crawl"}
            </button>
            <button
              type="submit"
              className="hover:bg-green-600 py-2 px-4 rounded custom-button md:mt-2"
              onClick={() => uploadFile([], [...fetchedLinks, url])}
              style={{ minWidth: "6rem", borderRadius: "5px" }}
              disabled={trainLoading || loading || url === ""}
            >
              {trainLoading ? "uploading and training..." : "Train"}
            </button>
          </div>
        </div>
      </div>
      {fetchedLinks && fetchedLinks.length > 0 && (
          <p className="text-left mt-3">Total URLs fetched: {fetchedLinks.length}</p>
        )}
      {error && <p className="text-left text-red-500">{error}</p>}
    </form>
  </div>
</div>



    );
  };

  

export function Data() {
  const [fetchedLinks, setFetchedLinks] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function uploadFile(files, links) {
    console.log(files)
    console.log(links)
    if (loading || !files || !links || (files.length == 0 && links.length == 0)) return;
    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    if (links && links.length > 0 && links[0]) {
      links.forEach((link) => {
        formData.append("links", link);
      });
    }
  
    const token = localStorage.getItem("token");
    const response = await fetch(`${ENV_PROXY}/v1/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    setLoading(false);
    const data = await response.json();
    setSelectedFiles([]);
    // Redirect to another route after a successful fetch call
    navigate("/dashboard/home");
    return data;
  }
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 flex flex-col">
        <div className="border border-gray-300 p-4 m-4 rounded bg-white">
          <UploadButton selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} uploadFile={uploadFile} loading={loading}/>
        </div>
        <h1 className="p-4 rounded">Or Crawl a website</h1>
        <div className="border border-gray-300 p-4 ml-4 mr-4 rounded bg-white">
          <CrawlForm url={url} setUrl={setUrl} fetchedLinks={fetchedLinks} setFetchedLinks={setFetchedLinks} uploadFile={uploadFile} trainLoading={loading}/>
        </div>
        </CardBody>
      </div>
    </div>
  );
}

export default Data;
