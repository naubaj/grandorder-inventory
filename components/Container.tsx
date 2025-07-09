import React, { useEffect, useState } from "react";

import { MdiBin } from "@/public/MdiBin";

import Image from "next/image";
import { toast } from "react-hot-toast";

const localStorageKey = "inventory";
const ITEM_LENGTH = 94;

type ContainerProps = {
  materialData: {
    id: string;
    name: string;
    url: string;
  }[];
};

export function Container({ materialData }: ContainerProps) {
  const [inventory, setInventory] = useState<Array<string> | string[]>([]);

  useEffect(() => {
    const inventoryData = localStorage.getItem(localStorageKey);
    if (inventoryData) {
      setInventory(JSON.parse(inventoryData));
    } else {
      const defaultValues = Array(ITEM_LENGTH).fill(0);
      setInventory(defaultValues);
    }
  }, []);

  function onSubmit(e: FormData) {
    // Store only values
    const inventoryValues: Array<string> = [];
    // push inputted values
    for (const value of e.values()) {
      inventoryValues.push(value.toString());
    }
    // Save in local storage + inventory array
    localStorage.setItem(localStorageKey, JSON.stringify(inventoryValues));
    setInventory(inventoryValues);
    toast.success("Saved to Browser");
  }

  function exportData() {
    const exportInventory: { name: string; quantity: number }[] = [];
    // Format material data
    materialData.map((item, i) => {
      exportInventory.push({
        name: item.name,
        quantity: parseInt(inventory[i]),
      });
    });
    // Call Function to download the file
    downloadFile({
      data: JSON.stringify(exportInventory),
      fileName: "fgo-inventory.json",
      fileType: "text/json",
    });
    // Toast
    toast.success("Exported as fgo-inventory.json");
  }

  // Trigger a file download using blob and <a> tag
  function downloadFile({
    data,
    fileName,
    fileType,
  }: {
    data: string;
    fileName: string;
    fileType: string;
  }) {
    // Create a blobl with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor elemtn and dispatch a click event on it
    // to trigger a download
    const a = document.createElement("a");
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onloadend = (readerEvent: ProgressEvent<FileReader>) => {
      if (readerEvent?.target?.result) {
        const resultString = readerEvent?.target?.result;
        // Double Parse to read the JSON file
        const object: { name: string; quantity: string }[] = JSON.parse(
          JSON.parse(JSON.stringify(resultString))
        );
        const inventoryValues = object.map((data) => data.quantity);
        // Save to local storage
        localStorage.setItem(localStorageKey, JSON.stringify(inventoryValues));
        setInventory(inventoryValues);
        // Toast
        toast.success("Data Imported");
      }
    };
  }

  function resetData() {
    const defaultValues = Array(ITEM_LENGTH).fill(0);
    setInventory(defaultValues);
    localStorage.removeItem(localStorageKey);
    // Toast
    // toast.success("Delete successful");
    toast("Inventory Reset Successful", { icon: <MdiBin /> });
  }

  return (
    <>
      <div className="flex items-center gap-4 pb-3">
        <label
          htmlFor="uploadInput"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Import data
        </label>
        <input
          id="uploadInput"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e)}
          accept="application/JSON"
        />

        <button
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
          onClick={resetData}
        >
          Reset
        </button>

        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
          onClick={exportData}
        >
          Export to JSON
        </button>
      </div>

      <form action={(e) => onSubmit(e)}>
        <div className="flex items-center justify-evenly">
          <button
            className="bg-neutral-600 hover:bg-neutral-700 text-white font-semibold py-2 px-4 rounded"
            type="submit"
          >
            Save
          </button>
        </div>

        <div className="flex flex-row flex-wrap items-center justify-center">
          {materialData.map((item, i) => {
            return (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center w-[180px] h-[180px] gap-1"
              >
                <Image
                  src={item.url}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="w-auto"
                />
                <label
                  htmlFor={item.name}
                  className="text-center text-nowrap font-semibold text-sm break-keep"
                >
                  {item.name}
                </label>
                <input
                  type="text"
                  name={item.name}
                  defaultValue={inventory[i]}
                  className="text-center w-[50px] bg-gray-50 border border-gray-300 text-black"
                  inputMode="numeric"
                  pattern="0|[1-9][0-9]*"
                  maxLength={4}
                />
              </div>
            );
          })}
        </div>
      </form>
    </>
  );
}
