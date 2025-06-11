import { Suspense } from "react";
import FinalResetPassForm from "./_components/final-reset-pass-form";

const Page = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full mx-auto">
        <Suspense>
          <FinalResetPassForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
