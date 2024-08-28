import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

interface CreateMenu {
  name: string;
}

interface CreateMenuRes {
  id: number;
  name: string;
  children: Array<any>;
}
interface CreateNestedItem {
  name: string;
  parent: string | null;
  menu: string
}

export const getMenus = () => axios.get(`${API_URL}/menus/`);
export const createMenu = (data: CreateMenu) => axios.post<CreateMenuRes>(`${API_URL}/menus/`, data);
export const updateMenu = (id: string, data: any) => axios.put(`${API_URL}/menus/${id}/`, data);
export const createNestedChild = (data: CreateNestedItem) => axios.post(`${API_URL}/menu-items/`, data);
