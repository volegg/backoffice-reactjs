import { CreateForm } from "./Form";

type CreateFormProps = {
  submit: () => void;
}

export function CreateUser(props: CreateFormProps) {
  return <CreateForm {...props} />;
}