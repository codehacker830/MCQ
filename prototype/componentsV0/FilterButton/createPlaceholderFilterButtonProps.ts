import { FilterButtonProps } from ".";

export const createPlaceholderFilterButtonProps = (): FilterButtonProps => ({
  onChange: () => {
    //
  },
  options: ["Daily", "Weekly", "Monthly"],
  value: "Weekly",
});
