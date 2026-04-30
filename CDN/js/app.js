/**
 * Mi Biblia 365 - App JavaScript
 * MVP para Blogger
 */

(function() {
  'use strict';

  var MiBiblia365 = window.MiBiblia365 || {};

  MiBiblia365.config = {
    storageKey: 'mibiblia365-',
    version: '1.0.0',
    defaultPlan: 'biblia-en-un-ano',
    defaultVersion: 'RV60'
  };

  MiBiblia365.Storage = {
    get: function(key) {
      try {
        var data = localStorage.getItem(MiBiblia365.config.storageKey + key);
        return data ? JSON.parse(data) : null;
      } catch (e) { return null; }
    },
    set: function(key, value) {
      try {
        localStorage.setItem(MiBiblia365.config.storageKey + key, JSON.stringify(value));
        return true;
      } catch (e) { return false; }
    }
  };

  MiBiblia365.Plans = {
    active: function() {
      return MiBiblia365.Storage.get('activePlan') || MiBiblia365.config.defaultPlan;
    },
    setActive: function(planId) {
      return MiBiblia365.Storage.set('activePlan', planId);
    },
    getProgress: function() {
      var progress = MiBiblia365.Storage.get('progress');
      return progress || { day: 1, total: 365, completed: [] };
    },
    markDayRead: function(dayNum) {
      var progress = MiBiblia365.Plans.getProgress();
      if (progress.completed.indexOf(dayNum) === -1) {
        progress.completed.push(dayNum);
        progress.completed.sort(function(a, b) { return a - b; });
        MiBiblia365.Storage.set('progress', progress);
      }
      return progress;
    }
  };

  MiBiblia365.Theme = {
    init: function() {
      var body = document.body;
      var toggle = document.getElementById('theme-toggle');
      if (!toggle) return;

      var saved = MiBiblia365.Storage.get('theme');
      if (saved === 'dark') body.classList.add('dark');

      toggle.addEventListener('click', function() {
        body.classList.toggle('dark');
        MiBiblia365.Storage.set('theme', body.classList.contains('dark') ? 'dark' : 'light');
      });
    }
  };

  MiBiblia365.Favorites = {
    add: function(verseRef, content) {
      var favs = MiBiblia365.Storage.get('favorites') || [];
      var exists = favs.some(function(f) { return f.ref === verseRef; });
      if (!exists) {
        favs.push({ ref: verseRef, content: content, date: new Date().toISOString() });
        MiBiblia365.Storage.set('favorites', favs);
        return true;
      }
      return false;
    },
    getAll: function() {
      return MiBiblia365.Storage.get('favorites') || [];
    }
  };

  MiBiblia365.Notes = {
    add: function(verseRef, note) {
      var notes = MiBiblia365.Storage.get('notes') || [];
      notes.push({ ref: verseRef, note: note, date: new Date().toISOString() });
      MiBiblia365.Storage.set('notes', notes);
      return notes.length - 1;
    },
    getAll: function() {
      return MiBiblia365.Storage.get('notes') || [];
    }
  };

  MiBiblia365.Streak = {
    get: function() {
      var streak = MiBiblia365.Storage.get('streak') || { current: 0, longest: 0, lastDate: null };
      return streak;
    },
    update: function() {
      var streak = MiBiblia365.Streak.get();
      var today = new Date().toDateString();
      var yesterday = new Date(Date.now() - 86400000).toDateString();

      if (streak.lastDate === today) return streak;
      if (streak.lastDate === yesterday) {
        streak.current += 1;
      } else {
        streak.current = 1;
      }
      streak.lastDate = today;
      if (streak.current > streak.longest) streak.longest = streak.current;
      MiBiblia365.Storage.set('streak', streak);
      return streak;
    }
  };

  MiBiblia365.Export = {
    toJSON: function() {
      return JSON.stringify({
        progress: MiBiblia365.Plans.getProgress(),
        favorites: MiBiblia365.Favorites.getAll(),
        notes: MiBiblia365.Notes.getAll(),
        streak: MiBiblia365.Streak.get(),
        theme: MiBiblia365.Storage.get('theme'),
        exportDate: new Date().toISOString()
      }, null, 2);
    }
  };

  MiBiblia365.DateService = {
    getTodayISO: function() {
      var now = new Date();
      var y = now.getFullYear();
      var m = String(now.getMonth() + 1).padStart(2, '0');
      var d = String(now.getDate()).padStart(2, '0');
      return y + '-' + m + '-' + d;
    },
    getDayOfYear: function(dateIso) {
      var date = dateIso ? new Date(dateIso + 'T00:00:00') : new Date();
      var start = new Date(date.getFullYear(), 0, 0);
      var diff = date - start;
      return Math.floor(diff / 86400000);
    }
  };

  MiBiblia365.BibleService = (function() {
    var API = {
      primary: 'https://bible.helloao.org/api',
      secondary: 'https://docs-bible-api.netlify.app/api'
    };
    var memoryCache = new Map();
    var chapterStorageKey = MiBiblia365.config.storageKey + 'chapter-cache-v1';

    function normalizeVersionId(id) {
      return String(id || '').trim().toUpperCase();
    }

    function chapterCacheKey(versionId, bookId, chapter) {
      return normalizeVersionId(versionId) + '|' + String(bookId).toUpperCase() + '|' + Number(chapter);
    }

    function readChapterStorage() {
      try { return JSON.parse(localStorage.getItem(chapterStorageKey) || '{}'); } catch (_) { return {}; }
    }

    function writeChapterStorage(cache) {
      try { localStorage.setItem(chapterStorageKey, JSON.stringify(cache)); } catch (_) {}
    }

    function getCachedChapter(versionId, bookId, chapter) {
      var key = chapterCacheKey(versionId, bookId, chapter);
      if (memoryCache.has(key)) return memoryCache.get(key);
      var disk = readChapterStorage();
      if (disk[key]) {
        memoryCache.set(key, disk[key]);
        return disk[key];
      }
      return null;
    }

    function setCachedChapter(versionId, bookId, chapter, data) {
      var key = chapterCacheKey(versionId, bookId, chapter);
      memoryCache.set(key, data);
      var disk = readChapterStorage();
      disk[key] = data;
      writeChapterStorage(disk);
    }

    function fetchJSON(url) {
      return fetch(url).then(function(res) {
        if (!res.ok) {
          var err = new Error('HTTP ' + res.status);
          err.status = res.status;
          throw err;
        }
        return res.json();
      });
    }

    function getBooks(translationId) {
      var t = String(translationId || MiBiblia365.config.defaultVersion);
      var primary = API.primary + '/' + encodeURIComponent(t) + '/books.json';
      var secondary = API.secondary + '/books?translation=' + encodeURIComponent(t.toLowerCase());
      return fetchJSON(primary).catch(function() { return fetchJSON(secondary); });
    }

    function getChapter(translationId, bookId, chapter) {
      var cached = getCachedChapter(translationId, bookId, chapter);
      if (cached) return Promise.resolve(cached);

      var t = String(translationId || MiBiblia365.config.defaultVersion);
      var b = String(bookId || '').toUpperCase();
      var c = Number(chapter);

      var primary = API.primary + '/' + encodeURIComponent(t) + '/' + encodeURIComponent(b) + '/' + encodeURIComponent(c) + '.json';
      var secondary = API.secondary + '/read/' + encodeURIComponent(t.toLowerCase()) + '/' + encodeURIComponent(b.toLowerCase()) + '/' + encodeURIComponent(c);

      return fetchJSON(primary).catch(function() {
        return fetchJSON(secondary);
      }).then(function(data) {
        setCachedChapter(t, b, c, data);
        return data;
      });
    }

    function getMultipleReadings(translationId, readings) {
      return Promise.all((readings || []).map(function(r) {
        return getChapter(translationId, r.bookId, r.chapter);
      }));
    }

    function getUnifiedSpanishVersions() {
      return Promise.allSettled([
        fetchJSON(API.primary + '/available_translations.json'),
        fetchJSON(API.secondary + '/versions')
      ]).then(function(results) {
        var map = {};
        var hello = results[0].status === 'fulfilled' && Array.isArray(results[0].value) ? results[0].value : [];
        hello.forEach(function(v) {
          var lang = String(v.language || v.lang || '').toLowerCase();
          if (lang !== 'spa') return;
          var id = normalizeVersionId(v.id || v.shortName || v.name);
          map[id] = { id: id, name: v.name || v.shortName || id, language: 'spa', sources: ['helloao'] };
        });
        var netlify = results[1].status === 'fulfilled' && Array.isArray(results[1].value) ? results[1].value : [];
        netlify.forEach(function(v) {
          var raw = normalizeVersionId(v.id || v.version || v.shortName || '');
          if (!raw) return;
          if (!map[raw]) map[raw] = { id: raw, name: v.name || raw, language: 'spa', sources: [] };
          if (map[raw].sources.indexOf('netlify') === -1) map[raw].sources.push('netlify');
        });
        return Object.keys(map).sort().map(function(k) { return map[k]; });
      });
    }

    return {
      normalizeVersionId: normalizeVersionId,
      getUnifiedSpanishVersions: getUnifiedSpanishVersions,
      getBooks: getBooks,
      getChapter: getChapter,
      getMultipleReadings: getMultipleReadings
    };
  })();

  MiBiblia365.PlanService = {
    loadCatalog: function() {
      return fetch('https://cdn.jsdelivr.net/gh/erzonmr/MiBiblia365-XML@main/json/plans.json').then(function(r) {
        if (!r.ok) throw new Error('No se pudo cargar plans.json');
        return r.json();
      });
    },
    loadPlanByFile: function(fileName) {
      return fetch('https://cdn.jsdelivr.net/gh/erzonmr/MiBiblia365-XML@main/json/' + fileName).then(function(r) {
        if (!r.ok) throw new Error('No se pudo cargar el plan');
        return r.json();
      });
    },
    obtenerLecturaDelDia: function(planData, fechaIso) {
      var day = MiBiblia365.DateService.getDayOfYear(fechaIso || MiBiblia365.DateService.getTodayISO());
      var arr = Array.isArray(planData) ? planData : [];
      return arr.find(function(item) { return Number(item.dia) === day; }) || null;
    }
  };

  window.MiBiblia365 = MiBiblia365;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', MiBiblia365.Theme.init);
  } else {
    MiBiblia365.Theme.init();
  }

})();
