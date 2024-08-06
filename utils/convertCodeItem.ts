export function convertCodeItem(code: string) {
  return code.replace("/", "+").replace(".", "_");
}
