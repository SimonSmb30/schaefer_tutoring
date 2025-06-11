"use client";
import { CollectSlugResponse } from "@/action/recomendation";
import { Button } from "@/components/ui/button";
import { getBaseUrl } from "@/lib/utils";
import { EllipsisVertical, Share2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const QRCodeShareModal = dynamic(
  () => import("@/components/local/qr-code-modal"),
  { ssr: false }
);

interface Props {
  sevenDays: number;
  month: number;
  year: number;
  today: number;
}

const ReferralTracking = ({ sevenDays, month, year, today }: Props) => {
  const [isOpen, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isCollectingSlug, startCollecting] = useTransition();

  const onOpen = () => {
    const baseURL = getBaseUrl();
    startCollecting(() => {
      CollectSlugResponse()
        .then((res) => {
          if (!res.success) {
            toast.error(res.message);
            return;
          }

          // handle success
          setUrl(`${baseURL}/sign-up?ref=${res.slug}`);
          setOpen(true);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    });
  };

  const content = (
    <div className="grid grid-cols-1 gap-[16px] pb-[56px] md:grid-cols-4">
      <div className="rounded-[10px] border border-[#E8DFD6] py-4 pl-4 pr-[6px] md:col-span-1">
        <p className="flex items-center justify-between text-sm font-normal leading-[16px] text-[#6B7280]">
          Today Referrals <EllipsisVertical className="h-[24px] w-[24px]" />
        </p>
        <p className="pt-[16px] text-2xl font-medium leading-[29px] text-[#1F2937] md:text-3xl md:leading-[36px]">
          {today}
        </p>
      </div>
      <div className="rounded-[10px] border border-[#E8DFD6] py-4 pl-4 pr-[6px] md:col-span-1">
        <p className="flex items-center justify-between text-sm font-normal leading-[16px] text-[#6B7280]">
          Last 7 Days <EllipsisVertical className="h-[24px] w-[24px]" />
        </p>
        <p className="pt-[16px] text-2xl font-medium leading-[29px] text-[#1F2937] md:text-3xl md:leading-[36px]">
          {sevenDays}
        </p>
      </div>
      <div className="rounded-[10px] border border-[#E8DFD6] py-4 pl-4 pr-[6px] md:col-span-1">
        <p className="flex items-center justify-between text-sm font-normal leading-[16px] text-[#6B7280]">
          This Month <EllipsisVertical className="h-[24px] w-[24px]" />
        </p>
        <p className="pt-[16px] text-2xl font-medium leading-[29px] text-[#1F2937] md:text-3xl md:leading-[36px]">
          {month}
        </p>
      </div>
      <div className="rounded-[10px] border border-[#E8DFD6] py-4 pl-4 pr-[6px] md:col-span-1">
        <p className="flex items-center justify-between text-sm font-normal leading-[16px] text-[#6B7280]">
          This Year <EllipsisVertical className="h-[24px] w-[24px]" />
        </p>
        <p className="pt-[16px] text-2xl font-medium leading-[29px] text-[#1F2937] md:text-3xl md:leading-[36px]">
          {year}
        </p>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="rounded-[16px] border border-input p-[24px] md:p-[32px] lg:p-[40px]">
        <h4 className="pb-[32px] text-lg font-medium leading-[21px] text-[#1F2937] md:pb-[40px] md:text-xl md:leading-[24px]">
          Referral Tracking
        </h4>

        {content}

        <div>
          <h6 className="text-lg font-semibold leading-[21px] text-[#1F2937]">
            Refer People To Schafer-turoring Platform
          </h6>
          <p className="pt-[8px] text-[10px] text-base font-normal leading-[19px] text-[#4B5563]">
            Share your unique QR code to invite others to Schafer-turoring
            Platform.
          </p>
          <div className="pb-[78px] pt-[32px] md:pb-0">
            <Button
              size="lg"
              className="flex items-center gap-[8px] px-[16px] py-[14px] text-base font-semibold leading-[19px] text-white"
              onClick={() => onOpen()}
              disabled={isCollectingSlug}
            >
              <Share2 className="block h-[18px] w-[18px] text-white md:hidden" />{" "}
              Share QR Code
            </Button>
          </div>
        </div>
      </div>

      {url && (
        <QRCodeShareModal
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          qrCodeValue={url}
        />
      )}
    </div>
  );
};

export default ReferralTracking;
