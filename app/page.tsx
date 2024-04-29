import { Suspense } from "react";
import { type NextPage } from "next";

import Encorder from "../feature/encoder";

const Page: NextPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Encorder />
    </Suspense>
  );
};

export default Page;
