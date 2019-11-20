---
sidebar: auto
---
# Linux常见命令

## 查看具体命令手册
```
$ man cp
```

## 文件和目录列表

#### 基本列表功能
::: tip
ls命令最基本的形式会显示当前目录下的文件和目录<br/>
-F参数在目录名后加正斜线(/),以方便用户在输出中分辨它们<br/>
-l参数会产生长列表格式的输出，包含目录中每个文件的更多详细信息<br/>
-a参数将显示当前目录下所有的文件和目录(包括一些隐藏的目录，如.ssh)<br/>
别忘了，还可以将多个参数结合起来使用
:::
```
$ ls
$ ls -F
$ ls -R
$ ls -l
$ ls -a
$ ls -FR
```

## 处理文件

#### 创建文件
::: tip
touch命令创建一个空文件
:::
```
$ touch test_one
```

#### 复制文件
::: tip
cp命令用于将文件和目录从一个位置复制到另一个位置
:::
在最基本的用法里，cp命令需要两个参数----源对象和目标对象
```
$ cp source destination
```
- 当source和destination参数都是文件名时，cp命令将源文件复制成一个新文件，并且以destination命名(注意：如果目标文件以及存在，cp命令可能并不会提醒这一点，最好加上-i参数，强制shell询问是否需要覆盖已有文件)
- `cp index.html /home/blet/`将index.html文件复制到/home/blet/目录下
- `cp -i /home/blet/nginx.conf .`将/home/blet/目录下的nginx.conf文件复制到当前目录(.表示当前目录)
- `cp -R Scripts/ Mod_Scripts`将整个Scripts目录中的内容复制到Mod_Scripts目录中，如果Mod_Scripts目录不存在，它将会被创建


#### 重命名文件
::: tip
mv命令可以将文件和目录从一个位置移动到另一个位置或重新命名
:::
- `mv test test2`将test重命名为test2
- `mv index.html work/`将index.html文件移动到work目录下
- `mv some_dir  /home/blet/work`将some_dir文件夹移动到 /home/blet/work目录下
- `mv /home/blet/test /home/blet/work/test2`将/home/blet/目录下的test文件移动到/home/blet/work/目录下并重命名为test2

#### 删除文件
::: tip
rm命令用于删除文件或文件夹下的所有内容
:::
```
$ rm index.html
$ rm -i index.html
$ rm -f index.html
```

## 处理目录

#### 创建目录
::: tip
mkdir命令创建一个新目录
:::
```
$ mkdir New_Dir
```
- 想要同时创建多个目录和子目录，需要加-p参数
- `mkdir -p New_Dir/Sub_Dir/Under_Dir`

#### 删除目录
::: tip
rmdir命令删除一个空目录
:::
```
$ rmdir New_Dir
```
- 想要一口气删除目录及其所有内容：
```
$ rm -rf work  '连work目录都一并删除'
$ rm -rf work/*  '删除work目录下的全部内容，但是work目录还在'
```


## 查看文件内容

#### 查看文件类型
::: tip
file命令可用于查看文件类型
:::
```
$ file my_file   'my_file：ASCII text'
$ file New_Dir   'New_Dir：directory'
```

#### 查看整个文件
::: tip
cat命令可用于查看文本文件中的所有数据
:::
```
$ cat file1
$ cat -n file1   '显示行号'
```

::: tip
more命令会显示文本文件的内容，但是在显示每页数据之后会停下来。
:::
```
$ more file1
```

::: tip
less命令是more命令的升级版
:::
```
$ less file1
```

#### 查看部分文件
::: tip
tail命令会显示文件最后几行的内容(默认情况下，它会显示文件的末尾10行)
:::
```
$ tail log_file
$ tail -n 2 log_file    '显示最后2行'
```

::: tip
head命令会显示文件开头那些行的内容(默认情况下，它会显示文件的前10行)
:::
```
$ head log_file
$ head -n 2 log_file    '显示前2行'
```


## 文件压缩

#### gzip压缩
::: tip
gzip压缩后的格式为：*.gz<br/>
这种压缩方式不能保存原文件；且不能压缩目录
:::
```
$ gzip test    'test.gz'
$ gunzip test.gz    'test'
```

#### tar压缩

- `-z(gzip)` 用gzip来压缩/解压缩文件
- `-j(bzip2)` 用bzip2来压缩/解压缩文件
- `-v(verbose)` 详细报告tar处理的文件信息
- `-c(create)` 创建新的档案文件
- `-x(extract)` 解压缩文件或目录
- `-f(file)` 使用档案文件或设备，这个选项通常是必选的
```
$ tar -zcvf test.tar.gz test
$ tar -zxvf file.tar.gz
```

## 搜索文件
::: tip
find命令可以快速查找文件或目录。
:::
```
$ find path -name filename
```
- `find . -name index.js`  查找所有名为index.js的文件
- `find components -name *.js `   查找指定类型的文件

## 查找文件中的关键字
::: tip
grep命令查找文件中的关键字。
:::
```
$ grep string [选项] file
```
- `grep React index.js`  在index.js文件中查找React关键字
- `grep -i React index.js`   -i参数不区分大小写
- `grep -c React index.js`   可以找到给定字符串/模式匹配的行数


## 远程服务器
::: tip
mac连接linux远程服务器
:::

```
$ sudo -i   '切换到root用户'
$ ssh -p port user@ip   'ssh -p 22 root@192.168.37.63'
```

::: tip
mac向linux远程服务端上传文件
:::
打开本地终端：输入命令scp 本地文件地址 root@服务端ip: 服务端路径

