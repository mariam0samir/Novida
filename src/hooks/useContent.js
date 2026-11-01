import { useEffect, useState } from 'react';
import {
  getSectors,
  getSectorBySlug,
  getProjects,
  getProjectById,
  getNews,
  getNewsById,
  getLeaders,
  getReports,
  getSectorShowcase,
  getAboutSections,
  getChairmanMessage,
  getSiteSettings,
} from '../services/contentApi';

/** Hook عام للموقع: { data, loading, error } */
export function useContent(fetcher, deps = [], initial = []) {
  const [state, setState] = useState({ data: initial, loading: true, error: null });

  useEffect(() => {
    let alive = true;
    fetcher()
      .then((data) => alive && setState({ data, loading: false, error: null }))
      .catch((error) => alive && setState({ data: initial, loading: false, error }));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}

export const useSectors = () => useContent(getSectors);
export const useSector = (slug) => useContent(() => getSectorBySlug(slug), [slug], null);
export const useProjects = (sectorId) => useContent(() => getProjects({ sectorId }), [sectorId]);
export const useNews = (limit) => useContent(() => getNews({ limit }), [limit]);
export const useNewsItem = (id) => useContent(() => getNewsById(id), [id], null);
export const useLeaders = () => useContent(getLeaders);
export const useReports = (reportType) => useContent(() => getReports({ reportType }), [reportType]);
export const useSectorShowcase = (sectorId) => useContent(() => getSectorShowcase({ sectorId }), [sectorId]);
export const useAboutSections = () => useContent(getAboutSections);
export const useChairmanMessage = () => useContent(getChairmanMessage, [], null);
export const useSiteSettings = () => useContent(getSiteSettings, [], null);
export const useProject = (id) => useContent(() => getProjectById(id), [id], null);
