import { useController } from "react-hook-form";
const useFormController = (control, name) => {
  const {
    field: { ref, ...fieldProps },
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: "",
  });

  // console.log(fieldProps);

  return {
    error,
    ...fieldProps,
  };
};

export default useFormController;
