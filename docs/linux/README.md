---
sidebar: auto
---
# Linux常见命令

## 生成公钥
```sh
$ ssh-keygen
```
- `cd ~/.ssh` 公钥存放在家目录下的.ssh目录
- `cat id_rsa.pub` 用cat命令浏览并复制公钥
- `vi /etc/hosts` 在根目录下的etc下的hosts文件里配置host


## 查看具体命令手册
```
$ man cp
```

## cd命令
```
$ cd ~       '返回家目录'
$ cd /       '返回根目录'
$ cd -       '返回进入此目录之前所在的目录'
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
```sh
$ scp /Users/blet/Desktop/linux/work.tar.gz root@37.120.206.158:/root
```


## 检测程序

#### 探查进程
::: tip
ps命令用来查看系统进程信息
:::
```
$ ps   '默认情况下，ps命令只会显示当前用户的进程'
$ ps -ef  '查看系统上运行的所有进程'
```

#### 实时监测进程
::: tip
top命令跟ps命令相似，能够显示进程信息，但它是实时显示的
:::
```
$ top
```

#### 结束进程
::: tip
kill命令可通过进程ID(PID)给进程发信号，默认情况下，kill命令会向命令行列出的全部PID发送一个TERM信号，来告诉进程可能的话就停止运行。不过，如果有不服从管教的进程，那它通常会忽略这个请求。如果要强制终止，-s参数支持指定其他信号。
:::

```
$ kill
$ kill PID
$ kill -s HUP PID    '强制进程终止运行'
```


## 监测磁盘空间

#### 使用df命令
::: tip
df命令可以让你很方便的查看所有已挂载磁盘的使用情况
:::
```
$ df
$ df -h   '-h参数会把输出中的磁盘空间按照用户易读的形式显示'
```

#### 使用du命令
::: tip
du命令可以显示某个特定目录(默认情况下是当前目录)的磁盘使用情况
:::
```
$ du
$ du -h
```



## yum命令

::: tip
yum 命令是 CentOS 系统中的包管理工具，基於RPM包管理，能够从指定的服务器自动下载RPM包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软体包，无须繁琐地一次次下载、安装。
yum提供了查找、安装、删除某一个、一组甚至全部软件包的命令，而且命令简洁而又好记。
:::

yum语法

```
$ yum [options] [command] [package ...]
```
- options：可选，选项包括-h（帮助），-y（当安装过程提示选择全部为"yes"），-q（不显示安装的过程）等等。
- command：要进行的操作。
- package操作的对象。

yum常用命令
- `yum check-update` 列出所有可更新的软件清单
- `yum update` 更新所有软件
- `yum install <package_name>` 仅安装指定的软件
- `yum update <package_name>` 仅更新指定的软件
- `yum list` 列出所有可安裝的软件清单
- `yum remove <package_name>` 删除软件包
- `yum search <keyword>` 查找软件包
- 清除缓存命令:
  - `yum clean packages` 清除缓存目录下的软件包
  - `yum clean headers` 清除缓存目录下的 headers
  - `yum clean oldheaders` 清除缓存目录下旧的 headers
  - `yum clean, yum clean all (= yum clean packages; yum clean oldheaders)` 清除缓存目录下的软件包及旧的headers



## apt-get命令
::: tip
apt-get 命令是 Ubuntu 系统中的包管理工具，基於dpkg包管理，可以用来安装、卸载包，也可以用来升级包，还可以用来把系统升级到新的版本
:::

apt-get 语法

```
$ apt-get [options] command
```

::: tip
apt 可以看作 apt-get 和 apt-cache 命令的子集, 可以为包管理提供必要的命令选项
apt-get 虽然没被弃用，但作为普通用户，还是应该首先使用 apt
:::

apt-get常用命令
- `apt-get install` 安装软件包           'apt install'
- `apt-get remove` 移除软件包            'apt remove'    
- `apt-get purge` 移除软件包及配置文件     'apt purge'
- `apt-get update` 刷新存储库索引         'apt update'
- `apt-get upgrade` 升级所有可升级的软件包  'apt upgrade'
- `apt-get autoremove` 自动删除不需要的包   'apt autoremove'
- `apt-get dist-upgrade` 在升级软件包时自动处理依赖关系  'apt full-upgrade'
- `apt-cache search` 搜索应用程序         'apt search'
- `apt-cache show` 显示装细节            'apt show'

另外，apt还有一些自己的命令
- `apt list` 列出包含条件的包（已安装，可升级等）
- `apt edit-sources` 编辑源列表

```
$ apt list --installed      '查询已安装的包'
$ apt list --upgradable     '查询哪些软件包可以升级'
```
 
当然，还可以使用dpkg命令来查询系统中已经安装了哪些包
```
$ dpkg -l      '列出当前系统中所有的包'
$ dpkg -l | less     '和参数less一起使用在分屏查看'
$ dpkg -l wget       '查看wget安装版本'
$ dpkg -L wget       '查看wget安装目录'
```

查看ubantu的版本
```
$ cat /etc/issue
```

查看内核版本
```
$ uname -r
```


## wget命令

::: tip
wget命令用来从指定的URL下载文件。wget非常稳定，它在带宽很窄的情况下和不稳定网络中有很强的适应性，如果是由于网络的原因下载失败，wget会不断的尝试，直到整个文件下载完毕。如果是服务器打断下载过程，它会再次联到服务器上从停止的地方继续下载。这对从那些限定了链接时间的服务器上下载大文件非常有用。
:::

wget 语法
```
$ wget [options] url
```

```
$ wget http://www.linuxde.net/testfile.zip
```
::: tip
wget默认会以最后一个符号/的后面的字符来命令，对于动态链接的下载通常文件名会不正确。
为了解决这个问题，我们可以使用参数-O来指定一个文件名。
:::

```
$ wget -O wordpress.zip http://www.linuxde.net/download.aspx?id=1080
```

#### 使用wget断点续传
::: tip
使用wget -c重新启动下载中断的文件，对于我们下载大文件时突然由于网络等原因中断非常有帮助，我们可以继续接着下载而不是重新下载一个文件。
:::

```
$ wget -c http://www.linuxde.net/testfile.zip
```

#### wget限速下载
::: tip
当你执行wget的时候，它默认会占用全部可能的宽带下载。但是当你准备下载一个大文件，而你还需要下载其它文件时就有必要限速了。
:::

```
$ wget --limit-rate=300k http://www.linuxde.net/testfile.zip
```

#### 使用wget后台下载
::: tip
对于下载非常大的文件的时候，我们可以使用参数-b进行后台下载，你可以使用以下命令来察看下载进度：
`tail -f wget-log`
:::

```
$ wget -b http://www.linuxde.net/testfile.zip
```


## curl命令
::: tip
curl 是常用的命令行工具，用来请求 Web 服务器。它的名字就是客户端（client）的 URL 工具的意思。
它的功能非常强大，命令行参数多达几十种。如果熟练的话，完全可以取代 Postman 这一类的图形界面工具。
:::

#### 查看网页源码
::: tip
不带有任何参数时，curl 就是发出 GET 请求, 服务器返回的内容会在命令行输出
:::
```
$ curl www.sina.com
```

#### 设置用户代理
::: tip
`-A`参数指定客户端的用户代理标头，即User-Agent。curl 的默认用户代理字符串是curl/[version]
:::
```
$ curl -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' https://google.com
```
::: tip
也可以通过`-H`参数直接指定标头，更改User-Agent
:::
```
$ curl -H 'User-Agent: php/1.0' https://google.com
```

#### 发送cookie
::: tip
`-b`参数用来向服务器发送 Cookie
:::
```
$ curl -b 'foo=bar' https://google.com
```
上面命令会生成一个标头Cookie: foo=bar，向服务器发送一个名为foo、值为bar的 Cookie。

```
$ curl -b 'foo1=bar' -b 'foo2=baz' https://google.com   '发送两个 Cookie'
$ curl -b cookies.txt https://www.google.com     '读取本地文件cookies.txt里的Cookie'
```

#### 将服务器设置的 Cookie 写入一个文件
```
$ curl -c cookies.txt https://www.google.com
```

#### 发送 POST 请求的数据体
::: tip
`-d`参数用于发送 POST 请求的数据体
:::
```
$ curl -d 'login=emma' -d 'password=123' -X POST  https://google.com/login
```

#### 添加 HTTP 请求的标头
::: tip
`-H`参数添加 HTTP 请求的标头
:::
```
$ curl -H 'Accept-Language: en-US' https://google.com
```

#### 查看服务器回应的 HTTP 标头
```
$ curl -i https://www.example.com     '先输出标头，然后空一行，再输出网页的源码'
$ curl -I https://www.example.com     '只输出HTTP 标头'
```

#### 指定 HTTP 请求的方法
::: tip
`-X`参数指定 HTTP 请求的方法
:::
```
$ curl -X POST https://www.example.com
```

#### 将服务器的回应保存成文件
::: tip
`-o`参数将服务器的回应保存成文件，等同于wget命令
:::
```
$ curl -o example.html https://www.example.com
$ curl -O https://www.example.com/foo/bar.html    '并将 URL 的最后部分当作文件名'
```








