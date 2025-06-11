import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { OnAcceptFreeTrialReq } from "@/action/free-trial";
import { Check, Loader2, X } from "lucide-react";
import moment from "moment";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { FreeTrialWithSlot } from "./free-trial-column";

interface Props {
  data: FreeTrialWithSlot;
}
const FreeTrialRequesAction = ({ data }: Props) => {
  const [openAcceptModal, setOpenAcceptModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<string>("");
  const [isAccepting, startAccepting] = useTransition();

  const onAccpet = () => {
    const time = data.preferredSlots.find(
      (slot) => slot.id === selectedDateTime
    );

    if (!time?.date || !time.time) {
      toast.warning("Please select a time");
      return;
    }

    startAccepting(() => {
      OnAcceptFreeTrialReq({
        date: time.date,
        time: time.time,
        reqId: data.id,
      }).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
        setSelectedDateTime("");
        setOpenAcceptModal(false);
      });
    });
  };

  return (
    <div className="space-x-3">
      <AlertDialog open={openAcceptModal} onOpenChange={setOpenAcceptModal}>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="outline">
            <Check />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Schedule Free Trial</AlertDialogTitle>
            <AlertDialogDescription>
              Please select a date and time for the free trial session.
            </AlertDialogDescription>

            <div className="pt-5 ">
              <RadioGroup
                value={selectedDateTime}
                onValueChange={setSelectedDateTime}
                className=" grid grid-cols-2 gap-5"
              >
                {data.preferredSlots.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted"
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={`option-${option.id}`}
                    />
                    <Label
                      htmlFor={`option-${option.id}`}
                      className="flex flex-1 cursor-pointer justify-between"
                    >
                      <span className="font-medium">
                        {moment(option.date).format("D MMMM, YYYY")}
                      </span>
                      <span className="text-muted-foreground">
                        {option.time}
                      </span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              disabled={!selectedDateTime || isAccepting}
              onClick={onAccpet}
            >
              Continue {isAccepting && <Loader2 className="animate-spin" />}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="icon" variant="destructive">
            <X />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject free trial request?</AlertDialogTitle>
            <AlertDialogDescription>
              This action will reject the user&apos;s free trial request. You
              can’t undo this decision.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FreeTrialRequesAction;
