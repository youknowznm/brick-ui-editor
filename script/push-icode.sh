#! /bin/bash

# 使用方法: npm run push[ branch_name]
# branch_name 存在: push branch_name to icode
#             不存在: push current branch_name to icode

if [ -n "$2" ];then
curBranch=$1
echo "pushing branch is ${curBranch}"
else
curBranch=$(git branch | awk '/\*/ { print $2; }')
# 另一种获取当前 branch_name 的方法
# git symbolic-ref --short HEAD
echo "current branch is ${curBranch}"
fi

git push origin ${curBranch}:refs/for/${curBranch}
