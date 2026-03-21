export function replaceUnderscoreDash(str: string) {
  let temp = str;
  if (temp === "active") {
    temp = "Hoạt động";
  }
  return temp.replace(/[_-]/g, " ");
}
