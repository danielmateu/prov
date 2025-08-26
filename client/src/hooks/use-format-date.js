import { format } from "date-fns";
export const formatDateYYYYMMDD = (date = new Date()) => {
    // console.log({ date });
    return format(date, "yyyyMMdd") || format(new Date(), "yyyyMMdd");
};