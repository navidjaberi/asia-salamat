export function uesGetRoute(url:string, keyword:string) : string | null {
    const keywordIndex = url.indexOf(keyword);
    if (keywordIndex !== -1) {
      return url.slice(keywordIndex + keyword.length);
    } else {
      return null;
    }
  }