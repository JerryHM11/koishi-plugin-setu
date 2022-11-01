import { Context, Schema } from 'koishi'

export const name = 'setu'

export interface Config {}

const koishi_1 = require("koishi");

export function apply(ctx: Context) {
  // write your plugin here
  ctx.command('lolicon')
  .option('tags', '-t tags 填入想要搜索的tags，支持多tag，tag之间用空格隔开')
  .option('r18', '-r r18 0为非R18，1为R18，2为混合', {fallback: 1})
  .action(async ({ options }) => {
    try {
      let event = ctx.http.get("https://api.lolicon.app/setu/v2")
      let data = event['data']
      if (event['error'] !== '') {
        return "请求出错。";
      } else if (event['error'] === '' && data.length === 0) {
        return "查无此图。";
      } else {
        let pid = data["pid"];let uid = data["uid"];
        let title = data["title"];let author = data["author"];let ext = "." + data["ext"];
        let size = data["width"] + "*" + data["height"];let tags = data["tags"].join(" ");
        let url = data["urls"];let small_url = url.split(ext)[0] + "_p0_master1200" + ext;
        return (`pid: ${pid}\nuid: ${uid}\ntitle: ${title}\nsuthor: ${author}\nsize: ${size}\ntags: ${tags}\nurl: ${url}`, ctx.http.get());
      }
    } catch (error) {
      ctx.logger('tools').warn(error);
      return '请求失败。';
    };
  });

  ctx.command('pixiv')
  .option('', '')
  .option('', '')
  .action(async ({ options }) => {
    return;
  })
}
