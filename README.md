# google-sheet-helpers
My lib with simple functions that I use in my own work with Google Apps Scripts

## Usage

### 1. Add to your project `src` folder as Git submodule

```BASH
cd src
git submodule add https://github.com/Glajik/google-sheet-helpers.git
```

### 2. Setup your .claspignore file

If you don't have it, create it in the same folder where is `.clasp.json` file.

Example of `.claspignore` file

```TEXT
# Ignore submodule's files and bash scripts
**/LICENSE
**/*.md
**/*.sh

# Ignore any submodule's .json files
**/*.json

# But leave appsscript.json file of current project
!appsscript.json

# Ignore all submodule's folders, except 'dist'
**/node_modules/**
**/.git/**
**/__tests__/**
**/src/**
!**/dist/**
```

### Update dependency

From your root of project run

```BASH
git submodule update --remote
```