import React from "react";

import Image from "next/image";

type ContainerProps = {
  materialData: {
    id: string;
    name: string;
    url: string;
  }[];
};

export function Container({ materialData }: ContainerProps) {
  return (
    <>
      <div className="flex flex-row flex-wrap items-center justify-center">
        {materialData.map((item) => {
          return (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center w-[180px] h-[180px] gap-1"
            >
              <Image src={item.url} alt={item.name} width={60} height={60} />
              <label
                htmlFor={item.name}
                className="text-center text-nowrap font-semibold text-sm break-keep"
              >
                {item.name}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}
