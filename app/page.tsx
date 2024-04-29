import { Suspense } from "react";
import { type NextPage } from "next";

import Encorder from "../feature/encoder";
 
export const runtime = "edge";

const Page: NextPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Encorder />
    </Suspense>
  );
};

export default Page;
