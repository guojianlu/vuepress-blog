---
sidebar: auto
---
# Git常见命令

## Git初始化

#### Git授权SSH
大多数 Git 服务器都会选择使用 SSH 公钥来进行授权。在 Github 或者 Gitlab 上提交代码，我们需要把 SSH 公钥复制托管到Github的
::: tip
personal setting -> ssh keys
:::

#### 生成 SSH-Key 方法
```
# 进入ssh目录
$ cd ~/.ssh           
# 生成ssh公私钥
$ ssh-keygen              
# 复制ssh公钥
$ cat ~/.ssh/id_rsa.pub   
```

## 初始化仓库
::: tip
可以在空目录初始化仓库，也能是已有的项目初始化仓库
:::
``` 
# 在当前目录新建一个Git代码库
$ git init                        

# 新建一个目录，将其初始化为Git代码库
$ git init <project-name>         

# clone git仓库
$ git clone <git-hub-url>  

# [高阶用法] clone git仓库并且制定分支
$ git clone <url> -b <branch> 
```

## Git忽略不应该跟踪的文件
::: tip
.gitignore 文件显式地指定了哪些文件不应被 Git 追踪，即被 Git 忽略掉。例如开发过程中 node_module，.vscode 等文件不需要被跟踪和提交，可以在初始化的忽略它们。
:::
```
# .gitignore 文件
node_module
.vscode
```

## Git配置

### 修改用户信息
```
# 配置信息列表
$ git config --list     

# 设置用户名
$ git config --global user.name "jerry"

# 设置邮箱
$ git config --global user.email 'xxxx@qq.com'
```

### 获取name和email
``` 
$ git config user.name
$ git config user.email
```

### 设置不同的仓库源
```
# 查看帮助
$ git remote --help                   

# 查看不同源
$ git remote

# 添加不同地址的源，并取一个别名
$ git remote add [name] [url]
$ git remote add origin git@github.com:xxxxx/xxx

# 删除一个源
$ git remote remove [name] 
```

### 第一次推送内容到master分支
::: tip
`-u`参数不仅把本地master分支的内容推送到远程仓库的master分支上，而且和远程仓库相关联起来<br/>
随后的远程推送内容，只需要`$ git push origin master`命令即可
:::
``` 
$ git push -u origin master
```

### 克隆远程仓库
::: tip
`git`协议是SSH协议，大部分克隆可以使用这种协议<br/>
`https`协议是口令协议，是针对只开发了https协议的网络
:::
```
$ git clone git@github.com:xxx/xxx
$ git clone https://github.com/xxx/xxx
```


## 添加文件
::: tip
可以添加一个或者多个文件
:::
```
$ git add readme.txt
$ git add file1.txt file2.txt
```

## 提交文件
::: tip
-m '说明注释' 代表本次提交的说明注释信息。
--amend 对最新一条commit 进行修正。
:::
::: tip
"amend" 是「修正」的意思。在提交时，如果加上 --amend 参数，Git 不会在当前 commit 上增加 commit，而是会把当前commit 里的内容和暂存区(stageing area)里的内容合并起来后创建一个新的 commit，用这个新的 commit 把当前 commit替换掉。所以 commit --amend 做的事就是它的字面意思:对最新一条commit 进行修正。
:::

```
$ git commit -m '说明注释'

# 对上一次commit进行修正
$ git add fix.txt		
$ git commit --amend
```

## 时光穿梭机

### 获取当前仓库的状态
```
$ git status
```

### 查看修改的内容
``` 
$ git diff
```

### 版本回退

#### 查看提交日志
::: tip
`HEAD`：代表当前版本<br/>
`HEAD^`：代表上一个版本<br/>
`HEAD^^`：代表上上一个版本
:::
```
$ git log
```

#### 查看命令日志
::: tip
`$ git reflog`查看的是每一次的命令的记录，头部有版本号
:::

#### 版本回退
::: tip
--hard 后面接HEAD或者具体的版本号<br/>
例如：`$ git reset --hard HEAD^`回退到上一个版本<br/>
例如：`$ git reset --hard 48e56e`回退到指定版本<br/>
注：回退后，`$ git log`命令不会输出该版本往后的版本记录，这时可以使用`$ git reflog`命令先找到版本号
:::
```
# 丢弃最新的提交
$ git reset --hard HEAD^
```
::: tip
reset 的本质: 移动 HEAD 以及它所指向的branch。
:::

::: tip
reset --hard: 重置工作目录。你的工作目录里的内容会被完全重置为和 HEAD 的新位置相同的内容。换句话说，就是你的未提交的修改会被全部擦掉。
:::

::: tip
reset --soft: 保留工作目录。 会在重置 HEAD 和 branch 时，保留工作目录和暂存区中的内容，并把重置 HEAD 所带来的新的差异放进暂存区。
:::

::: tip
reset 不加参数: 保留工作目录，并清空暂存区。reset 如果不加参数，那么默认使用 --mixed 参数。它的行为是:保留工作目录，并且清空暂存区。也就是说，工作目录的修改、暂存区的内容以及由 reset 所导致的新的文件差异，都会被放进工作目录。简而言之，就是「把所有差异都混合(mixed)放在工作目录中」。
:::



### 管理修改
::: tip
git 管理的是修改而不是文件
:::

::: tip
git reset HEAD test.txt    to unstage   撤销暂存
:::


#### 管理修改示例

- 修改文件
- 添加文件到暂存区
- 继续修改文件
- 提交文件到仓库

**结果**：git只会提交暂存区的内容，即只提交了第一次修改的内容，第二次修改的内容没有提交。

#### 办法一
- 先`$ git commit`提交第一次修改
- 再`$ git add`添加第二次修改
- 最后`$ git commit`提交第二次修改

#### 办法二
- 先不提交第一次修改
- `$ git add`添加第二次修改到暂存区
- `$ git commit`一起提交第一次、第二次的修改

### 撤销修改

撤销修改分三种情况

- `$ git add`之前
- `$ git commit`之前
- `$ git commit`之后

#### 情况一解决办法

直接使用`$ git checkout -- xxx`命令，丢掉当前工作区的修改
```
$ git checkout -- readme.txt
```

#### 情况二解决办法
- 首先使用`$ git reset HEAD xx`命令，撤销暂存区的修改
- 随后使用`$ git checkout -- xx`命令，丢弃工作区的修改
```
$ git reset HEAD readme.txt
$ git checkout -- readme.txt
```

#### 情况三解决办法

使用版本回退

### 删除文件
- 确定删除某一个文件
- 误删了某一个文件

#### 情况一解决办法
```
$ git rm test.txt
$ git commit -m 'sure remove test.txt'
```

#### 情况二解决办法
```
$ git reset HEAD test.txt
$ git checkout -- test.txt
```

## 分支管理
### 创建分支
```
$ git branch xxx
```
### 切换分支
```
$ git checkout xxx
```

#### 创建并切换分支的简写
```
$ git checkout -b xxx
```

### 查看所有分支
::: tip
带`*`号的表示当前分支
:::
```
$ git branch
# 查看本地分支及远端分支
$ git branch -la 
```

### 合并分支
```
$ git merge xxx
```

### 删除分支
```
# 强制删除本地分支
$ git branch -D [branchName]  

# 删除已经Merge过的分支
$ git branch -d [branchName] 

# 删除远端多余分支
git push -delete origin <branchName> 
```

### 解决冲突
当合并分支出现冲突时，可以利用`git status`查看冲突的位置<br>
手动解决冲突后
```
$ git add 冲突文件
$ git merge --continue

# 放弃解决冲突，取消 merge 
$ git merge —abort
```

### Bug分支
工作做一半，突然接到一个任务解决bug，该怎样进行合理的git操作

- `git stash`命令隐藏当前工作区
- `git checkout -b xx`命令创建并切换到bug分支
- `git add xx `  `git commit -m xx`修复提交bug分支
- `git checkout master`切换到主分支
- `git merge xxx`合并bug分支到主分支
- `git branch -d xx`删除bug分支
- `git stash pop`恢复隐藏的工作现成

### Feature分支
开发一个新功能mask1，但不保证后续这个新功能需不需要。

- `git checkout -b mask1`创建mask1分支
- `git add xx` `git commit -m xxx`开发完毕并提交到当前mask1分支上

上级通知，此功能砍掉，不需要了
- `git checkout dev`切换到开发分支
- `git branch -D mask1`删除mask1分支的内容
::: tip
`-d`小写的参数d，再删除时会被提示，改分支没有合并，无法删除<br/>
`-D`大写的参数D，代表强制删除
:::

## Git提交信息检查
```
# 查看当前工作区改动点
$ git diff                               

# 提交hash1和hash2的差异
$ git diff commit_hash1 commit_hash2 

# 分支a和b的差异
$ git diff branch_a branch_b  

# 显示暂存区和上一条提交之间的差异
$ git diff --staged

# 显示工作区与指定提交版本之间的差异
$ git diff commit_hash 

# 当前改动文件
$ git status     

# 查看提交历史
$ git log                

# 提交历史缩减一行查看，主要是提交Hash值
$ git log --pretty=oneline      
```

## Git高阶操作

### git rebase
::: tip
给你的 commit序列重新设置基础点(也就是父 commit)。展开来说就是，把你指定的 commit 以及它所在的 commit 串，以指定的目标 commit 为基础，依次重新提交一次。<br>
需要说明的是，rebase 是站在需要被 rebase 的 commit 上进行操作，这点和 merge 是不同的。
:::

```
# 变基
$ git rebase master 
```
> rebase 过程可能会出现冲突，解决冲突后

```
$ git add .
# 接下来git会继续应用剩余的补丁
$ git rebase --continue  
# 任何时候都可以使用如下命令终止rebase,分支会恢复到rebase开始前的状态
$ git rebase --abort
```


### cherry-pick
::: tip
把本分支或其他分支的某一次提交合并到当前分支
:::
```
# 查看并获取某次提交的hash
$ git log

# 切换到master分支
$ git checkout master

# 将hash_a的commit合并到master分支
$ git cherry-pick hash_a
```

### 删除 Git 缓存文件
场景： 有些情况开发者把原有不需要提交的代码提交到了远端仓库，再使用.gitignore忽略文件不生效。哪怕我们删除后再提交也没有办法忽略。这种情况下我们应该怎么解决？

方法： 我们可以使用git rm --cache 删除原来git跟踪的文件缓存，再在.gitignore里面添加忽略文件
```
## 当我们需要删除暂存区或分支上的文件, 同时工作区也不需要这个文件了, 可以使用
$ git rm file_path 

## 当我们需要删除暂存区或分支上的文件, 但本地又需要使用, 只是不希望这个文件被版本控制, 可以使用
# PS: file_path 为文件路径
$ git rm --cached file_path
```


### 如何强制提交
场景： 对于多人协作开发，有些时候我们会遇到版本管理混乱的情况，例如：远端版本错误了，但本地版本是正确的。 如何才能让强制更新远端版本，保持和本地工作区环境一样？

方法： 强制push本地正确的版本，但是慎用。因为它是不可逆转的。
```
# 强制更新，慎用
$ git push origin master --force  
```

### revert 和 reset区别
场景： 有些时候开发者需要退回到某次正确的提交记录，有些时候开发者的commit错误了，这时候可以使用 git revert 和 git reset。

+ git revert： 撤销某次操作，会产生一次新的commit记录，这个新的commit会把需要revert的那个commit的内容对冲掉。
+ git reset ： 撤销某次提交，但是此次之后的修改都会被退回到暂存区。


### 创建Tag
```
# 创建tag
# 创建标注标签
$ git tag -a daily/0.0.1 -m "add develop file" 

# 简单创建tag
$ git tag daily/0.0.1       

# 删除标签
$ git tag -d v1.0.0  

# 分享tag到远端
$ git push origin [tagname]
$ git push origin --tags 

# 如何已某个tag创建分支
$ git checkout -b <newbranch> <tagname>
```


### 其他

#### 如果你想看某个具体的 commit 的改动内容，可以用 show 命令
```
# 看当前 commit
$ git show

$ git show 5e68b0d8	

# 看指定 commit 中的指定文件
$ git show 5e68b0d8 list.txt
```

#### checkout 的本质
::: tip
checkout 并不止可以切换 branch。checkout 本质上的功能其实是: 签出( checkout )指定的 commit。<br>
git checkout branch 的本质，其实是把 HEAD指向指定的branch，然后签出这个 branch 所对应的 commit 的工作目录。
:::

```
# 树状
$ git log —graph

# 只能往回看
$ git log --prety=oneline

# 查看所有操作记录
$ git reflog

# 丢弃工作区的修改
$ git checkout -- file   

# 将file的内容从暂存区移除回工作区
$ git reset HEAD file  		 

# 修改分支名称
$ git branch -m branchName alise 

# 重命名并将修改添加到暂存区
$ git mv test.txt test2.txt  

# 删除一个文件并将修改添加到暂存区
$ git rm test.txt 

$ git commit --amend -m '修正上一次的提交信息'

# 仅查看最近3条的提交信息
$ git log -3 

$ git log —-pretty=oneline

# 没有被 track 的文件(即从来没有被 add 过的文件不会被 stash 起来，因为 Git 会忽略它们。如果想把这些文件也一起 stash，可以加上 `-u` 参数，它是 `--include-untracked` 的简写。
$ git stash -u
```
