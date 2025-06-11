"use client";

// Package Imports
import { motion } from "framer-motion";
import { Loader2, Pencil, Save } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

// UI Components
import { updateProfile } from "@/action/profile";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { Separator } from "@/components/ui/separator";
import { useEdgeStore } from "@/lib/edgestore";
import {
  StudentProfileSchema,
  StudentProfileSchemaType,
} from "@/schemas/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  user: User;
}

const ProfileForm = ({ user }: Props) => {
  const [editable, setEditable] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageLoader, setImageLoader] = useState(false);
  const [isPending, startTransition] = useTransition();

  const { edgestore } = useEdgeStore();
  const router = useRouter();

  const form = useForm<StudentProfileSchemaType>({
    resolver: zodResolver(StudentProfileSchema),
    defaultValues: {
      name: user.name ?? "",
      image: user.image ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
    },
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageLoader(true);
      const res = await edgestore.publicFiles.upload({
        file,
        input: {}, // Provide the required input object here
      });
      form.setValue("image", res?.url || "");
      setImageLoader(false);
    }
  };

  const onSubmit = (data: StudentProfileSchemaType) => {
    startTransition(() => {
      updateProfile(data).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }
        // handle success
        router.refresh();

        if (res.emailChanged) {
          toast.warning(res.message);
        }
      });
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-tourHub-title2 text-[30px] font-bold font-inter">
            Profile
          </h2>
          <p className="text-tourHub-green-dark text-base mb-1">
            Manage your profile
          </p>
        </div>
        <Button
          className="text-sm  text-white rounded-md px-3 py-2"
          onClick={() => {
            if (editable) {
              form.handleSubmit(onSubmit)();
            }
            setEditable((prev) => !prev);
          }}
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Saving
            </>
          ) : editable ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save
            </>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </>
          )}
        </Button>
      </div>
      <Separator className="mb-4" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="col-span-2 flex items-center gap-x-4">
                <div className="h-[100px] w-[100px] flex justify-center items-center relative">
                  <motion.div
                    initial={{ filter: "blur(0px)" }}
                    animate={{
                      filter: imageLoader ? "blur(1px)" : "blur(0px)",
                      transition: { duration: 0.5 },
                    }}
                    className="h-full w-full rounded-full relative flex justify-center items-center"
                  >
                    {field.value ? (
                      <Image
                        src={field.value || "/placeholder.jpg"}
                        alt="profile+"
                        fill
                        className="rounded-full object-cover bg-gray-100"
                      />
                    ) : (
                      <div className="rounded-full object-cover bg-gray-100 w-full h-full flex justify-center items-center">
                        Profile +
                      </div>
                    )}
                  </motion.div>
                  {imageLoader && (
                    <Loader2 className="animate-spin h-5 w-5 absolute" />
                  )}
                </div>
                {editable && (
                  <>
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleUploadClick}
                      disabled={imageLoader}
                    >
                      Upload
                    </Button>
                  </>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                {editable && <FormLabel>Name</FormLabel>}
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    {...field}
                    className="disabled:opacity-100"
                    disabled={!editable}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-2 md:col-span-1">
                {editable && <FormLabel>Email</FormLabel>}
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Primary Email"
                    {...field}
                    className="disabled:opacity-70"
                    disabled={true}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                {editable ? (
                  <>
                    <FormLabel>Phone</FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput
                        placeholder="Enter your phone number"
                        {...field}
                        defaultCountry="TR"
                      />
                    </FormControl>

                    <FormMessage />
                  </>
                ) : (
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Phone number"
                      disabled={!editable}
                    />
                  </FormControl>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
