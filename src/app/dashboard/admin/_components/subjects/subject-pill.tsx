"use client";
import { DeleteSubjectAction } from "@/action/subject";
import AlertModal from "@/components/ui/alert-modal";
import { Subject } from "@prisma/client";
import { Edit, Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AddSubjectDialog } from "./add-subject-dialog";

interface Props {
  data: Subject;
  isEdit?: boolean;
}

const SubjectPill = ({ data, isEdit }: Props) => {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    startTransition(() => {
      DeleteSubjectAction(data.id)
        .then((res) => {
          if (!res.success) {
            toast.error(res.message);
          } else {
            toast.success(res.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        })
        .finally(() => {
          setOpen(false);
        });
    });
  };
  return (
    <>
      <div className="py-3 px-4 text-center  justify-center  inline-flex items-center rounded-[50px] border   text-md font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground ">
        {data.name}
        {isEdit && (
          <>
            <Trash
              className="text-red-500 size-4 ml-2 hover:text-red-600 transition duration-300 cursor-pointer"
              onClick={() => setOpen((p) => !p)}
            />
            <AddSubjectDialog
              initialData={data}
              trigger={
                <Edit className="text-blue-500 size-4 ml-2 hover:text-blue-600 transition duration-300 cursor-pointer" />
              }
            />
          </>
        )}
      </div>

      <AlertModal
        isOpen={open}
        loading={pending}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
    </>
  );
};

export default SubjectPill;
