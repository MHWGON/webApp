import Buffer from 'express';
import { Stats } from 'fs';
const fs = require('fs');

const fileReadStream = (filePath: string) => {
    fs.createReadStream(__dirname + filePath, {
        encoding: 'utf-8'
    }).pipe();
    // 注意pipe前是读取文件，pipe后是写入文件
    // 网络请求中的res: Response 是可写流，可以通过 fs.createReadStream(__dirname + filePath, {}).pipe(res); 返回
};

/* eslint-disable */
// 读取文件
fs.readFile('',(err: Error, data: Buffer) => {});
fs.readFileSync('', {}, (error: Error, data: Buffer) => {});   // 同步
fs.readdir('文件目录', (err: Error, dirs: string[]) => {});     // 读取目录文件内容
fs.readdirSync('文件目录', {}, (err: Error, dirs: string[]) => {});     // 读取目录文件内容
fs.stat('',(err: Error, stats: Stats)=> {   // 读取目录或文件并判断
    if(stats.isFile()){}
});

// 写入文件
fs.writeFile('','file content',(err: Error) => {} );
fs.writeFileSync('', ' async file content', {} );   // 同步写入文件
fs.appendFile('', 'append content', (err: Error) => {});    // 文件内容后追加
fs.appendFileSync('', 'async file content', {});

//删除文件
fs.unlink('', (err: Error) => {});
fs.unlinkSync('');  // 同步删除

// 文件夹创建
fs.mkdir('./testDir',(err: Error) => {});
// 文件夹重命名
fs.rename('./testDir', './newDir', (err: Error) => {});
// 文件夹删除
fs.rmdir('./testDir', (err: Error) => {});
