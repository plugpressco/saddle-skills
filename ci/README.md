`validate.yml` is the CI workflow. It belongs in `.github/workflows/`; it waits
here because pushing a workflow file needs the GitHub CLI's `workflow` scope:

```bash
gh auth refresh -h github.com -s workflow
git mv ci/validate.yml .github/workflows/validate.yml && git commit -m "ci: validate skills" && git push
```
