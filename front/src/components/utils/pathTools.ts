/**
 * 将传入的 url 路径分解为从顶层到底层的 url 路径列表. 实例:
 * '/userinfo/2144/id' => ['/userinfo','/userinfo/2144','/userinfo/2144/id']
 * @param url: 传入的待分解的 url 路径
 */
export function urlToList(url: string): string[] {
  if (url == '/') return ['/'];
  const urlList = url.split('/').filter(i => i);   //去除空字符，即去除路径中有两个连续斜杠的元素
  return urlList.map((urlItem, index) => {
    return `/${urlList.slice(0, index + 1).join('/')}`;
  });
}
