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

  window.MiBiblia365 = MiBiblia365;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', MiBiblia365.Theme.init);
  } else {
    MiBiblia365.Theme.init();
  }

})();