'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from 'react';
import { themeReady } from '../../theme-ready';

// Initializes the bootstrap-datepicker on the Rooms reservation "Date" range
// (Check In / Check Out) once the vendored jQuery + bootstrap-datepicker bundle
// has loaded. Runs on mount (and re-runs on client-side navigation back to the
// page, since the component remounts). Visual/booking behaviour is not wired to
// any backend — this only turns the two inputs into calendar pickers.
export default function DatepickerInit() {
  useEffect(() => {
    let cancelled = false;

    themeReady.then(() => {
      if (cancelled) return;
      const $ = (window as any).jQuery;
      if (!$ || !$.fn || !$.fn.datepicker) return;
      const $range = $('.roberto-scope .input-daterange');
      if (!$range.length) return;
      $range.datepicker('destroy');
      $range.datepicker({
        format: 'dd M yyyy',
        autoclose: true,
        todayHighlight: true,
        clearBtn: true,
      });
    });

    return () => {
      cancelled = true;
      const $ = (window as any).jQuery;
      try {
        $?.('.roberto-scope .input-daterange').datepicker('destroy');
      } catch {
        /* not initialized */
      }
    };
  }, []);

  return null;
}
