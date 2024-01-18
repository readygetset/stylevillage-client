import { useParams } from 'react-router-dom';
import { useState } from 'react';

import {
  GetClosetResponse,
  GetClosetListResponse,
  getClosetAPICall,
  getClosetListAPICall,
} from '../../hooks/api/closet/closet';

export function ClosetPage() {
  const { id } = useParams();
  const closetId = Number(id);
  const userId = Number(sessionStorage.getItem('userId'));
  const token = sessionStorage.getItem('accessToken') ?? '';
  const [closet, setCloset] = useState<GetClosetResponse | null>(null);
  const [closetlist, setClosetList] = useState<GetClosetListResponse | null>(null);
  const getCloset = async () => {
    try {
      const result = await getClosetAPICall({ closetId, token });
      setCloset(result);
    } catch (error) {
      console.error(error);
    }
  };
  const getClosetList = async () => {
    try {
      const result = await getClosetListAPICall({ token });
      setClosetList(result);
    } catch (error) {
      console.error(error);
    }
  };
  
}
