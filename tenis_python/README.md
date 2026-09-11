Summary
Starting point for a new kata: Python, pytest, one source folder, one test file.
The environment is managed by [uv](https://docs.astral.sh/uv/): it downloads the pinned Python, creates `.venv` and installs the dev dependencies.

Usage
```
cp -r generic_python <kata-name>
cd <kata-name>
uv sync                 # creates .venv with Python 3.11 + pytest
uv run pytest           # run the tests once
uv run ptw .            # rerun the tests on every file change
```
To use the venv directly (IDE, plain `pytest`): `source .venv/bin/activate`.

Rename `solution/` to whatever the kata is about, update `name` in pyproject.toml, and rewrite this README with the kata statement.

Interface
```
solve(input: str) -> str
```
