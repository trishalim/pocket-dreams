import { getUser } from "@/app/actions/user";

export const userQueryOptions = {
  queryKey: ["user"],
  queryFn: () => {
    return getUser();
  },
};
