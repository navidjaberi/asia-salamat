export function useToEnglishDigits(str: string | number): string {
  var e = "۰".charCodeAt(0);
  str = str.toString().replace(/[۰-۹]/g, function (t: string): any {
    return t.charCodeAt(0) - e;
  });
  e = "٠".charCodeAt(0);
  str = str.replace(/[٠-٩]/g, function (t: string): any {
    return t.charCodeAt(0) - e;
  });
  return str;
}
