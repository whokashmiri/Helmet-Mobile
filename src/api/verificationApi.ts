
// src/api/verificationApi.ts
import { api } from './client';
export type ScanResponse = { success:boolean; sessionId:string; nextStep:string; status:string; verifiedAt?:string; helmet?:any; bike?:any };
function formData(uri:string, sessionId?:string){
  const fd = new FormData();
  fd.append('image', { uri, name:'scan.jpg', type:'image/jpeg' } as any);
  if(sessionId) fd.append('sessionId', sessionId);
  return fd;
}
export async function verifyHelmet(uri:string, sessionId?:string){
  const { data } = await api.post<ScanResponse>('/verify/helmet', formData(uri, sessionId), { headers:{ 'Content-Type':'multipart/form-data' } });
  return data;
}
export async function verifyBike(uri:string, sessionId:string){
  const { data } = await api.post<ScanResponse>('/verify/bike', formData(uri, sessionId), { headers:{ 'Content-Type':'multipart/form-data' } });
  return data;
}
export async function getHistory(){ const { data } = await api.get('/verify/history'); return data; }
