import materialData from "@/public/materials.json";

import { Container } from "@/components/Container";

export default function Home() {
  return (
    <>
      <div className="grid col-start-2">
        <div className="grid px-4 py-6 md:px-6 md:py-8">
          <div className="flex flex-col justify-start items-center">
            <h1 className="font-bold text-3xl pb-4">FGO Item Inventory</h1>
            <Container materialData={materialData} />
          </div>
        </div>
      </div>
    </>
  );
}
