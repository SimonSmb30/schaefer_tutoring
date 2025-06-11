import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import RegistrationForm from "./_components/registration-form";

const Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full rounded-[10px] border-[1px] border-[#F4F0EB] bg-white shadow-md px-[28px] py-[32px] md:w-[456px]">
        <div className="sapce-y-[8px]">
          <h3 className="text-center font-inter text-[28px] font-medium leading-[33.69px] text-primary">
            Sign Up
          </h3>
          <p className="text-center font-inter text-[16px] leading-[19.36px] text-[#6B7280]">
            Provide your email and choose a password
          </p>
        </div>
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Loader2 className="animate-spin" />
            </div>
          }
        >
          <RegistrationForm />
        </Suspense>
      </div>
    </div>
  );
};

export default Page;
