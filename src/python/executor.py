"""Exécute un essai indépendant et renvoie uniquement des valeurs JSON."""
import copy
import json
import math
import os
import sys
import tempfile
import traceback

request = json.loads(__atelier_request)


def clean(value):
    if value is None or isinstance(value, (str, bool, int)):
        return value
    if isinstance(value, float):
        if not math.isfinite(value):
            raise ValueError("Le résultat doit être un nombre fini.")
        return value
    if isinstance(value, (list, tuple)):
        return [clean(item) for item in value]
    if isinstance(value, dict):
        return {str(key): clean(item) for key, item in value.items()}
    raise TypeError("Renvoie un nombre, un booléen, une chaîne, une liste, un tuple ou un dictionnaire.")


def same(actual, expected, tolerance=0):
    if isinstance(actual, bool) or isinstance(expected, bool):
        return type(actual) is type(expected) and actual == expected
    if isinstance(actual, (int, float)) and isinstance(expected, (int, float)):
        return abs(actual - expected) <= tolerance
    if type(actual) is not type(expected):
        return False
    if isinstance(actual, list):
        return len(actual) == len(expected) and all(same(a, b, tolerance) for a, b in zip(actual, expected))
    if isinstance(actual, dict):
        return actual.keys() == expected.keys() and all(same(actual[k], expected[k], tolerance) for k in actual)
    return actual == expected


def python_run():
    results = []
    original_modules = set(sys.modules)
    with tempfile.TemporaryDirectory(prefix="atelier-") as folder:
        old_cwd = os.getcwd()
        sys.path.insert(0, folder)
        os.chdir(folder)
        try:
            all_files = {**request.get("dataFiles", {}), **request.get("files", {})}
            for name, content in all_files.items():
                if not name.endswith((".py", ".txt", ".csv", ".json")) or name.startswith(("/", "\\")) or ".." in name.replace("\\", "/").split("/"):
                    raise ValueError("Les fichiers du projet doivent être de type .py, .txt, .csv ou .json.")
                target = os.path.realpath(os.path.join(folder, name))
                if os.path.commonpath([folder, target]) != folder:
                    raise ValueError("Nom de module invalide.")
                os.makedirs(os.path.dirname(target), exist_ok=True)
                with open(target, "w", encoding="utf-8") as handle:
                    handle.write(content)
            namespace = {"__name__": "__eleve__"}
            exec(compile(request["code"], "eleve.py", "exec"), namespace)
            function = namespace.get(request["functionName"])
            if not callable(function):
                raise ValueError("Définis une fonction nommée " + request["functionName"] + ".")
            for test in request.get("tests", []):
                try:
                    actual = clean(function(*copy.deepcopy(test.get("args", []))))
                    passed = not test.get("expectedError") and same(actual, test.get("expected"), test.get("tolerance", 0))
                    results.append({**test, "actual": actual, "passed": passed})
                except Exception as error:
                    error_type = type(error).__name__
                    passed = error_type == test.get("expectedError")
                    result = {**test, "actual": error_type if passed else None, "passed": passed}
                    if not passed:
                        result["error"] = "".join(traceback.format_exception(error))[-4000:]
                    results.append(result)
        finally:
            os.chdir(old_cwd)
            sys.path.remove(folder)
            for name, module in list(sys.modules.items()):
                path = getattr(module, "__file__", "") or ""
                if name not in original_modules and path.startswith(folder + os.sep):
                    del sys.modules[name]
    return {"results": results}


def sql_run():
    import sqlite3
    with sqlite3.connect(":memory:") as database:
        database.execute("PRAGMA foreign_keys = ON")
        database.executescript(request.get("setup", ""))
        if request.get("verifyQuery"):
            database.executescript(request["code"])
            cursor = database.execute(request["verifyQuery"])
        else:
            cursor = database.execute(request["code"])
        actual = clean(cursor.fetchall())
        expected = request.get("expected", [])
        columns = [column[0] for column in cursor.description or []]
        if request.get("ordered", False):
            passed = same(actual, expected)
        else:
            key = lambda row: json.dumps(row, sort_keys=True, ensure_ascii=False)
            passed = same(sorted(actual, key=key), sorted(expected, key=key))
        return {"results": [{"args": [], "actual": actual, "expected": expected, "passed": passed}], "columns": columns}


try:
    response = sql_run() if request.get("mode") == "sql" else python_run()
except Exception as error:
    response = {"error": "".join(traceback.format_exception(error))[-4000:]}
json.dumps(response, ensure_ascii=False, allow_nan=False)
