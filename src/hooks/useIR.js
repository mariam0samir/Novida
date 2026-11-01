import { useEffect, useState } from "react";
import { getIrPages, getIrPageContent, getIrSettings, getStockData } from "../services/irApi";

export function useIrPages() {
  const [state, setState] = useState({ data: [], loading: true });
  useEffect(() => {
    let alive = true;
    getIrPages()
      .then((data) => alive && setState({ data, loading: false }))
      .catch(() => alive && setState({ data: [], loading: false }));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}

export function useIrPageContent(pageId) {
  const [state, setState] = useState({ blocks: [], documents: [], loading: true });
  useEffect(() => {
    if (!pageId) return;
    let alive = true;
    getIrPageContent(pageId)
      .then((d) => alive && setState({ ...d, loading: false }))
      .catch(() => alive && setState({ blocks: [], documents: [], loading: false }));
    return () => {
      alive = false;
    };
  }, [pageId]);
  return state;
}

export function useIrSettings() {
  const [settings, setSettings] = useState(null);
  useEffect(() => {
    let alive = true;
    getIrSettings()
      .then((d) => alive && setSettings(d || {}))
      .catch(() => alive && setSettings({}));
    return () => {
      alive = false;
    };
  }, []);
  return settings;
}

// بيانات السهم + تحديث تلقائي كل كام دقيقة (لو API)
export function useStockData(settings) {
  const [stock, setStock] = useState(null);
  useEffect(() => {
    if (!settings) return;
    let alive = true;
    const load = () => getStockData(settings).then((d) => alive && setStock(d));
    load();
    const minutes = Number(settings.refresh_minutes) || 15;
    const timer = settings.stock_mode === "api" ? setInterval(load, minutes * 60 * 1000) : null;
    return () => {
      alive = false;
      if (timer) clearInterval(timer);
    };
  }, [settings]);
  return stock;
}
