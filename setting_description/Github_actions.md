# Github Actions

- This document contains information related to the github actions of the project, including the reasons for selecting libraries, configuration methods, and more.

## 1. enforce-dev-branch.yml

- This action is used to enforce that only dev branch can open PR to main branch.
- The target branch is not restricted to main because if a user mistakenly opens a PR to the wrong branch and then closes it to open a correct one, the status of the action remains failed, despite the PR being valid.

## 2. auto-label.yml

- This action automatically adds labels to the PR based on the modified files.
- Label rules can be modified in the .github/labeler.yml file.
