# AGENTS.md

## Repo reality (important)
- This repo is content-first (Blogger XML templates + static JSON/JS/CSS). There is no `package.json`, test runner, lint config, or CI workflow to execute locally.
- Treat `Brief_MiBiblia365-XML.md` and `Roadmap.md` as product/plan context, not guaranteed implementation truth.

## Where the runnable app logic is
- `CDN/js/app.js` is the current standalone app script (IIFE) that exposes `window.MiBiblia365` and handles theme, progress, favorites, notes, streak, and export.
- `CDN/css/base.css` is the main shared style layer used by MVP-style templates.
- `json/*.json` are core data assets (reading plans + daily verses) and are large; prefer targeted edits.

## Template boundaries
- Root `template - ZIA.xml` is a full Blogger template with inline CSS/JS and page routing for `/p/*.html`.
- `Templates XML/` contains multiple alternative template drafts from different iterations/models; do not assume all of them are active.
- If asked to change “the template”, confirm or infer the exact file first; avoid bulk-editing every XML variant.

## Verified routing + storage conventions
- Blogger route mapping in templates uses exact paths like `/p/leer-hoy.html`, `/p/planes.html`, `/p/biblia.html`, `/p/mi-espacio.html`.
- Local persistence is `localStorage`-based; keys/prefixes include `mibiblia365-` (`CDN/js/app.js`) and `mibiblia365_data` (`template - ZIA.xml`). Keep backward compatibility when changing storage structure.

## API/CDN gotchas agents can miss
- API sources are inconsistent across files (e.g., brief documents `bible.helloao.org`, while `template - ZIA.xml` currently declares other API endpoints). Align only the files you were asked to change; do not silently rewrite all variants.
- Several template files still contain placeholders like `tu-usuario` / `USUARIO` in jsDelivr URLs. Replace only in the target template being prepared for publish.

## Editing rules specific to this repo
- Preserve Blogger XML structure (`<html ... xmlns:b ...>`, `<b:skin><![CDATA[ ... ]]></b:skin>`) exactly; malformed XML/CDATAs will break import.
- Prefer minimal diffs in huge XML/JSON files; broad reformatting makes review and Blogger re-import harder.
