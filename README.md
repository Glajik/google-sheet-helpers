# gs-helpers
My lib with simple functions that I use in my own work with Google Apps Scripts

## Usage

### 1. Add to your project `src` folder as Git submodule

```BASH
cd dist
git submodule add https://github.com/Glajik/gs-helpers.git
```

### 2. Setup your .claspignore file

If you don't have it, create it in the same folder where is `.clasp.json` file.

Example of `.claspignore` file

```TEXT
# Ignore all submodule's folders, except 'dist'
gs-helpers/**
!**/dist/**
```

### Update dependency

From your root of project run

```BASH
git submodule update --remote
```
