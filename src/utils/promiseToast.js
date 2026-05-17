import { toast } from "react-toastify";

export const promiseToast = async (
    url,
    options = {},
    messages = {}
) => {


    const {
        loading = "Loading...",
        success = "Success",
        error = "Something went wrong, Please try again later.",
    } = messages;


    const toastConfig = {};

    if (loading !== false) {
        toastConfig.pending = loading;
    }

    if (success !== false) {
        toastConfig.success = typeof success === "function"
            ? {
                render({ data }) {
                    return success(data);
                }
            }
            : success;
    }

    toastConfig.error = typeof error === "function"
        ? {
            render({ data }) {
                return error(data);
            }
        }
        : error;


    return toast.promise(

        fetch(url, options)
            .then(async (res) => {

                const data = await res.json();

                if (!res.ok) {
                    throw data;
                }

                return data;
            }),

        toastConfig
    );
};