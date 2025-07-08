import React, { useEffect, useState } from "react";

import Image from "next/image";

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
    console.log(inventoryValues);
  }

  return (
    <>
      <form action={(e) => onSubmit(e)}>
        <div className="flex items-center justify-evenly">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            type="submit"
          >
            Save Locally
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
