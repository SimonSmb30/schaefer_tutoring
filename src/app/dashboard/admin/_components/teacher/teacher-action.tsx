"use client";
import { RemoveTeacher } from "@/action/authentication";
import AlertModal from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import { Subject, User } from "@prisma/client";
import { Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  data: User;
  subjects: Subject[];
}

const TeacherAction = ({ data }: Props) => {
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const onDelete = () => {
    startTransition(() => {
      RemoveTeacher(data.id)
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
      <div className="flex items-center gap-x-4">
        {/* <AddTeacherDialog
          trigger={
            <Button variant="outline" size="icon">
              <Edit className="text-blue-500 size-4  hover:text-blue-600 transition duration-300 cursor-pointer" />
            </Button>
          }
          subjects={subjects}
          initialData={data}
        /> */}
        <Button variant="outline" size="sm" onClick={() => setOpen((p) => !p)}>
          <Trash className="text-red-500 size-4 ml-2 hover:text-red-600 transition duration-300 cursor-pointer" />{" "}
          Remove
        </Button>
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

export default TeacherAction;
