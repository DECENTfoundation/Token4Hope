#!/usr/bin/env bash
# http://superuser.com/questions/232373/how-to-tell-git-which-private-key-to-use/920849#920849
# ssh key must be placed in same directory with this file
BASEDIR=$(dirname "$0")
ssh -i $BASEDIR/ssh_bitbucket_key \
  -o UserKnownHostsFile=/dev/null \
  -o StrictHostKeyChecking=no \
  $*