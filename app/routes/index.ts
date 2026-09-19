import { redirect } from "react-router";

export const loader = () => {
  return redirect("/et", 301);
};
