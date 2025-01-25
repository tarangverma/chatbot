import {useState, useEffect} from 'react';
import { useLocation, Link, useParams } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { ENV_PROXY } from '@/configs/globalVariable';


async function fetchUploadedList() {
  const token = localStorage.getItem('token');
  const response = await fetch(`${ENV_PROXY}/v1/upload`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}

import { FaSpinner } from 'react-icons/fa';

// ...

function DeleteButton({entity_id, className, removeItemFromList}) {
  const [isLoading, setIsLoading] = useState(false);

  async function deleteEntity(entity_id) {
    setIsLoading(true); // set loading state to true
    const token = localStorage.getItem('token');
    const response = await fetch(`${ENV_PROXY}/v1/upload/${entity_id}`, {
      "method": "DELETE",
      "headers": {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("data", data);
    setIsLoading(false); // set loading state to false
    removeItemFromList(entity_id);
    return data;
  }

  const handleDelete = (entity_id) => {
    deleteEntity(entity_id);
  };

  const deleteButton = (
    <Typography
      as="a"
      href="#"
      className="custom-delete-button"
    >
      Delete
    </Typography>
  );

  if (!isLoading) {
    return (
      <td className={className} onClick={()=>{handleDelete(entity_id)}}>
        <Typography  as="a" href="#">
          <Chip
            value="Delete"
            className={`py-0.5 px-2 text-[11px] custom-delete-button`}
          />  
        </Typography>
      </td>
    )
  }

  return (
    <td className={`${className} min-w-[250px] max-w-[250px] whitespace-normal break-all`}>
        <FaSpinner className="animate-spin" />
    </td>
  )
}


export function Dashboard() {
  const [uploadedList, setUploadedList] = useState([]);

  function removeItemFromList(id) {
    console.log("id", id);
    console.log(uploadedList.length);
    const newList = uploadedList.filter((item) => item._id !== id);
    console.log(newList.length);
    setUploadedList(newList);
  }

  useEffect(() => {
    let intervalId;

    async function fetchUploadedData() {
      try {
        const response = await fetchUploadedList();
        setUploadedList(response);

        // Check if any element has a state of 'pending'
        const hasPending = response.some(element => element.state === 'pending');

        // Set an interval to fetch data every 5 seconds only if there's a 'pending' state
        if (hasPending && !intervalId) {
          intervalId = setInterval(() => {
            fetchUploadedData();
          }, 10000);
        } else if (!hasPending && intervalId) {
          // Clear the interval if there are no pending items
          clearInterval(intervalId);
          intervalId = null;
        }
      } catch (error) {
        console.error("error", error);
      }
    }

    fetchUploadedData();

    // Clean up the interval when the component is unmounted or the effect reruns
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  useEffect(() => {
    console.log("uploadedList", uploadedList);
  }, [uploadedList]);

  return (
    <div className="mt-12 mb-8 flex flex-col">
      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["url", "uploaded on", "status", ""].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uploadedList.map(
                ({ _id, created_at, state, url, character_count }, key) => {
                  const parts = url.split("/");
                  const chipColour = state=="done"?"custom-green-chip":"custom-pending-button"
                  if (parts.length > 3 && parts[0] === "" && parts[1] === "tmp") {
                    url = parts.slice(3).join("/");
                  }
                  const className = `py-3 px-5 custom-text ${
                    key === uploadedList.length - 1
                      ? ""
                      : ""
                  }`;
                  return (
                    <tr key={_id}>
                      <td className={`${className} min-w-[250px] max-w-[250px] whitespace-normal break-all`}>
                        <div className="flex items-center">
                          {url}
                        </div>
                      </td>
                      <td className={`custom-text min-w-[250px] max-w-[250px] whitespace-normal break-all`}>
                        {`${new Intl.DateTimeFormat("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        }).format(new Date(created_at))} - ${new Intl.DateTimeFormat("en-GB", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }).format(new Date(created_at))}`}
                      </td>
                      <td className={`${className} min-w-[250px] max-w-[250px] whitespace-normal break-all`}>
                        <Chip
                          value={state}
                          className={`py-0.5 px-2 text-[11px] ${chipColour}`}
                        />
                      </td>
                      <DeleteButton entity_id={_id} className={className} removeItemFromList={removeItemFromList}/>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Dashboard;
