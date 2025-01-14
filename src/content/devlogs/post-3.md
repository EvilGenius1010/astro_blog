---
title: Creating custom plugins in `Obsidian`
excerpt: This article explores creating custom plugins for Obsidian. The goal is to define a special syntax that allows users to insert snippets into their notes and easily paste the same thing in another page in a same/different vault. It delves into the development process, including utilizing the editorCallback function, attaching event listeners to editor and regular expressions to achieve the desired functionality. The provided code snippet showcases initial attempts at manipulating the editor content.
isFeatured: true
publishDate: '1 January 2025'
tags:
  - Guide
seo:
  image:
    src: '/post-1.jpg'
    alt: A person standing at the window
---

# Creating custom plugins in `Obsidian`

## Plugins

- I want some sort of a `obsidian` plugin where I can add some sort of a special syntax/identifier and add a path/filename to which the snippet below is added until I escape it using some sort of syntax again.
- Finally I want one more plugin which identifies this syntax and removes all of it from my `.md` files before pushing to github.
- Want a special button which runs a script which pushes to a remote github repo.

# Making Plugin-1

We gotta understand how do the `obsidian` plugins work first.

The **Plugin** Class defines lifecycle of a plugin and exposes operations available to it.
The `onload` fn configures resources needed by the plugin.
The `unload` fn releases resources used by the plugin.

`Cmd+Option+i` is shortcut to open Developer Tools.

- We create a new plugin using [`documentation`](https://docs.obsidian.md/Plugins/User+interface/Commands) picked from the `Obsidian` website.
- We use `editorCallback` instead of callback as we need access to the editor. But if we use `callback` instead, we get something like
  ![[Screenshot 2025-01-01 at 11.09.54 PM.png]]
  which is accessible in the `Command Palette`.

I have written this much code now

```
this.addCommand({
id:"identify-n-add-to-pages",
name:"Identify path and add to Pages",
hotkeys:[{modifiers:['Mod','Shift'],key:'`'}],
editorCallback:(editor:Editor,view:MarkdownView)=>{
editor.setValue("kachow")
}
})
```

- This works ie. it adds **kachow** to the current page but removes everything else which is undesirable.
- To solve it, I find the last line and then add the word kachow! to it. It however removes any content on that line as well.
- So, we need to get content on the last line as well, `concatenate` it and replace.
- With a little messing around with the definitions given in the `obsidian.d.ts` file for the `Editor` type, I am able to get it working.

```
this.addCommand({
id:"identify-n-add-to-pages",
name:"Identify path and add to Pages",
hotkeys:[{modifiers:['Mod','Shift'],key:'`'}],//is Cmd in MacOS.
editorCallback:(editor:Editor,view:MarkdownView)=>{
// editor.setValue("kachow")
// let lastLine = editor.lineCount()
let cursorPosition = editor.getCursor() //get the line the cursor is at.
// let lastLineContent = editor.getLine(lastLine-1)
let currLineContent = editor.getLine(cursorPosition.line) //get content of that line.
console.log(currLineContent,cursorPosition)
// editor.setLine(lastLine-1,currLineContent+"kachow!")
editor.setLine(cursorPosition.line,currLineContent+"kachow!") //set the line to be the same.
}
})
```

- Now, we will need to see what the user is writing and identify whether it fits our pattern.
- For that, we need to attach event listeners to editor events.

- I tried using the `Workspace` class by creating an instance of it. After several tries of debugging the syntax, I GPT'ed the thing only to understand that I tried to instantiate something which is already created by default in the environment and that the environment wasn't gonna be able to integrate another instantiation of the same thing.

### Regex

- Next, we create a `Regex` pattern to identify what path to write the data to and what part should be written.
- Logically it should start with an identifier and so I am gonna start the identifier with `<@{path}>` and will copy everything from there until an `<@end>` is encountered.
- So it will be something like `<@/Users/hk/Desktop/notes>`.
- The initial `regex` I came up with was `/<@(.|^>)>/i` . The problem was that it was matching only one character ie. something like `<@d>` worked but wouldn't work if length was greater than one.
- `GPT` came up with `/<@([^>\\n\\r]*)>/i` so logically, `/<@([.|^>|^\r]*)>/i` should work as well.
  `

## Material

1. https://github.com/EvilGenius1010/add-shortcut-obs-plugin
