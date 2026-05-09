# Git Commands Cheat Sheet

This guide explains both basic and advanced Git commands with clear examples and notes to help you manage your code and collaborate more efficiently.

---

## 🚀 Basic Git Commands

### 1. `git init`
**Initialize a new Git repository in your project.**
```sh
git init
```
*Note: Run in your project directory to start version tracking.*

### 2. `git clone`
**Clone an existing repository to your local machine.**
```sh
git clone https://github.com/username/repository.git
```
*Note: Replace `username/repository.git` with the repository's URL.*

### 3. `git status`
**See which files are changed, staged, or untracked.**
```sh
git status
```

### 4. `git add`
**Stage changes to be committed.**
```sh
git add filename.txt          # Stage a specific file
git add .                     # Stage all changes
```

### 5. `git commit`
**Save (commit) staged changes with a descriptive message.**
```sh
git commit -m "Describe your changes"
```

### 6. `git push`
**Upload local commits to a remote repository.**
```sh
git push origin main          # Pushes to the 'main' branch
```

### 7. `git pull`
**Fetch and merge changes from the remote repository to your local branch.**
```sh
git pull origin main
```

---

## 🌳 Branching

- **List, create, or delete branches:**
  ```sh
  git branch                  # List all branches
  git branch new-branch       # Create branch 'new-branch'
  ```
- **Switch branches:**
  ```sh
  git checkout branch-name    # Switch to a branch
  git checkout -b new-branch  # Create and switch
  # Or, with modern Git:
  git switch branch-name
  git switch -c new-branch
  ```
- *Note: Branches let you develop features or fix bugs without affecting main code.*

---

## 🔄 Merging

- **Merge changes from one branch into another:**
  ```sh
  git checkout main
  git merge new-branch
  ```
- *Resolve any merge conflicts if prompted!*

---

## 💾 Stashing

- **Temporarily save (stash) uncommitted changes:**
  ```sh
  git stash               # Save work in progress
  git stash pop           # Apply last stash
  ```

---

## 🕒 Commit History

- **View commit history:**
  ```sh
  git log                 # Full log
  git log --oneline       # One line per commit
  ```

---

## ♻️ Undoing Changes

- **Unstage a file:**
  ```sh
  git reset HEAD filename.txt
  ```
- **Revert the last commit (dangerous!):**
  ```sh
  git reset --hard HEAD~1
  ```
- **Restore a file to last committed state:**
  ```sh
  git checkout -- filename.txt
  ```

---

## 🔖 Tagging

- **Tag a commit (for releases):**
  ```sh
  git tag v1.0.0
  git push origin v1.0.0
  ```

---

## 🌐 Remote Management

- **Show remote repositories:**
  ```sh
  git remote -v
  ```
- **Add remote origin:**
  ```sh
  git remote add origin <url>
  ```

---

## ❌ Ignoring Files

- **Create a `.gitignore` file** to exclude files or directories from tracking.
  ```
  node_modules/
  *.log
  .env
  ```
  *Note: Place patterns of files/folders to ignore inside this file.*

---

## 📝 Useful Tips

- Use `git status` frequently.
- Write clear commit messages!
- `git pull` before pushing to avoid conflicts.
- Get help: `git help <command>` or `git <command> --help`
- Use Git GUIs like GitHub Desktop, SourceTree, or VS Code Git integration for visual tools.

---

## 📚 Summary Table

| Command            | Description                      | Example                                |
|--------------------|----------------------------------|----------------------------------------|
| `git init`         | Start new repo                   | `git init`                             |
| `git clone`        | Copy repo from remote            | `git clone URL`                        |
| `git status`       | See current file changes         | `git status`                           |
| `git add`          | Stage changes                    | `git add .` or `git add file.txt`      |
| `git commit`       | Record staged changes            | `git commit -m "Message"`              |
| `git push`         | Upload commits to remote         | `git push origin main`                 |
| `git pull`         | Sync/merge remote changes        | `git pull origin main`                 |
| `git branch`       | List/create/delete branches      | `git branch new-branch`                |
| `git checkout`     | Switch branch or restore files   | `git checkout another-branch`          |
| `git merge`        | Merge branches                   | `git merge branch-name`                |
| `git stash`        | Save local changes temporarily   | `git stash`                            |
| `git log`          | View commit history              | `git log --oneline`                    |
| `git reset`        | Unstage/undo changes             | `git reset HEAD file.txt`              |
| `git tag`          | Tag a release/commit             | `git tag v2.0`                         |
| `git remote`       | Manage remote repos              | `git remote add origin <url>`          |

---

Happy coding and collaborating with Git! 🚀
