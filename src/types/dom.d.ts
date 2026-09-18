interface FormDataConstructor {
  new (form?: HTMLFormElement | EventTarget | null, submitter?: HTMLElement | null): FormData;
}
