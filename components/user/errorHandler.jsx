import { useEffect } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const ErrorHandler = ({ error }) => {
  const router = useRouter();

  useEffect(() => {
    const handleErrorResponse = () => {
      if (error.response) {
        if (error.response.data.error) {
          toast.error(error.response.data.error);

          setTimeout(() => {
            toast.error("Periksa kembali inputan...");
          }, 1500);
        }
        if (
          error.response.data.message === "Unauthenticated." ||
          error.response.data.errors
        ) {
          toast.error("Session habis,Silahkan login kembali");

          // setTimeout(() => {
          //   router.push("/login");
          // }, 1500);
        }
      } else if (error.request) {
        toast.error("No response received");
      } else {
        toast.error("Error setting up the request");
      }
    };

    handleErrorResponse();
  }, [error, router]);

  return null;
};

export default ErrorHandler;
