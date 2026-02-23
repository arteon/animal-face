# Contributing to Animal Face Test

Thank you for your interest in contributing to Animal Face Test! This project uses AI-powered facial landmark analysis to match faces to 12 animal types, and every contribution — whether a bug fix, a new feature, or improved documentation — makes it better for everyone.

Please take a moment to read this guide before submitting issues or pull requests.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Features](#suggesting-features)
  - [Submitting Pull Requests](#submitting-pull-requests)
- [Development Setup](#development-setup)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [Code Style Guidelines](#code-style-guidelines)
- [Commit Message Convention](#commit-message-convention)
- [PR Process](#pr-process)

---

## Code of Conduct

This project is governed by the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to abide by its terms. Please report unacceptable behavior to quizlab.dev@gmail.com.

---

## How to Contribute

### Reporting Bugs

1. Check the [existing issues](https://github.com/black4305/animal-face/issues) to avoid duplicates.
2. Open a new issue using the **Bug Report** template.
3. Provide as much detail as possible — OS, browser, steps to reproduce, and screenshots of the UI (not of real faces).

### Suggesting Features

1. Check the [existing issues](https://github.com/black4305/animal-face/issues) and discussions first.
2. Open a new issue using the **Feature Request** template.
3. Explain the problem you are solving and why the proposed solution is the best approach.

### Submitting Pull Requests

1. Fork the repository and create a branch from `main`.
2. Make your changes, following the [Code Style Guidelines](#code-style-guidelines).
3. Ensure all tests and lint checks pass.
4. Open a PR using the pull request template and link the related issue.

---

## Development Setup

### Prerequisites

- Node.js 20+
- Python 3.11+
- npm or yarn

### Frontend

The frontend is built with React 19, TypeScript, and Vite.

```bash
cd frontend
npm install
npm run dev
```

Available scripts:

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler check |
| `npm test` | Run test suite |

### Backend

The backend is a Python 3.11 application deployed on AWS Lambda. For local development:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

> The backend uses MediaPipe for facial landmark detection. All analysis runs server-side and no images are stored.

---

## Code Style Guidelines

### TypeScript / React (Frontend)

- **TypeScript strict mode** is enabled. All code must be type-safe — `any` is not permitted without a documented justification comment.
- Follow the existing ESLint configuration (`.eslintrc` / `eslint.config.*`).
- Use functional components and React hooks. Class components are not accepted.
- Keep components small and focused. Extract logic into custom hooks when appropriate.
- Use named exports over default exports for components.

### Python (Backend)

- Follow [PEP 8](https://peps.python.org/pep-0008/).
- Type annotations are required for all function signatures.
- Keep Lambda handler functions thin — delegate business logic to separate modules.

---

## Commit Message Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

Format:

```
<type>(<scope>): <short summary>
```

### Types

| Type | When to use |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, missing semicolons, etc. (no logic change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test` | Adding or correcting tests |
| `chore` | Build process, dependency updates, tooling |
| `perf` | Performance improvement |
| `ci` | CI/CD configuration changes |

### Examples

```
feat(frontend): add result share button with og image
fix(backend): handle missing facial landmarks for side-profile images
docs: update development setup instructions
chore: upgrade mediapipe to 0.10.x
```

Breaking changes must include `BREAKING CHANGE:` in the commit footer.

---

## PR Process

1. Open your PR against the `main` branch.
2. Fill in the PR template completely.
3. A maintainer will review your PR within a few business days.
4. Address any requested changes by pushing additional commits — do not force-push after review has started.
5. Once approved, a maintainer will squash-merge the PR.

---

Thank you for helping make Animal Face Test better!
