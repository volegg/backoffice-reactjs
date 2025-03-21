import { CreateForm } from "./Form";

type CreateFormProps = {
  submmitHandler: () => void;
}

export function CreateUser(props: CreateFormProps) {
  return <div><CreateForm {...props} /></div>
}