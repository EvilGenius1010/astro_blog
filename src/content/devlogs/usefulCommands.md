---
title: Useful command lists 
excerpt: This article explores some pretty useful commands to know about in Computer Science, be it a way to keep running a docker container infinitely, correcting merge issues etc. 
isFeatured: true
publishDate: '1 May 2025'
tags:
  - Guide
seo:
  image:
    src: '/post-1.jpg'
    alt: A person standing at the window
---


These are a list of useful commands I use more than often. They are pretty handy to have.

## Rewriting commit history for incorrect username

```
git filter-branch --env-filter '
if [ "$GIT_COMMITTER_EMAIL" = "harshavardhan.mitblr2022@learner.manipal.edu" ]; then 
    export GIT_COMMITTER_EMAIL="kolhatkarh@gmail.com";
    export GIT_AUTHOR_EMAIL="kolhatkarh@gmail.com";
fi' --tag-name-filter cat -- --branches --tags
```

Then 
```
git push --force
```


## Keep Docker container running until quit

```
tail -f /dev/null
```


- `tail` is a command-line utility that prints the last few lines of a file.
- With the `-f` (follow) option, it continuously monitors the file for new lines, printing them as they appear.
- Normally used with log files, it keeps the command running, displaying new content as it's written to the file.
**`/dev/null`** (The Null Device):
- A special file in Unix/Linux that discards all data written to it.    
- Reading from it always returns an immediate end-of-file (EOF), meaning there’s no actual data in it.

Alternative is
```
sleep infinity
```

**If the main process exits, the container stops. `sleep infinity` ensures the container keeps running.



## Useful little git commands

### Temporarily going back to an older commit 

1. get commit hash using `git log`.
2. Go back using `git checkout <commit hash>`
3. To come back to present changes, `git switch -`


### Stop tracking a file/folder in future commits

- `git rm --cached <filename>` and `git rm --cached -r <foldername>`. The `-r` flag recursively stops tracking all files inside the folder.

### Removing files from staging area

- `git reset .` removes all files from staging area.
