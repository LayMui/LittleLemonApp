export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};


import { useRef, useEffect } from 'react';

export const SECTION_LIST_MOCK_DATA = [
    {
      title: 'Appetizers',
      data: [
        {
          id: '1',
          title: 'Pasta',
          price: '10',
        },
        {
          id: '3',
          title: 'Pizza',
          price: '8',
        },
      ],
    },
    {
      title: 'Salads',
      data: [
        {
          id: '2',
          title: 'Caesar',
          price: '2',
        },
        {
          id: '4',
          title: 'Greek',
          price: '3',
        },
      ],
    },
  ];

  export function getSectionListData(data) {
    if (!data || !Array.isArray(data) || data.length === 0) {
      return [];
    }
  
    if (data.length > 0 && data[0].title && data[0].data) {
      return data;
    }
  
    const groupedData = {};
    
    data.forEach((item) => {
      const category = item.category || 'Other';
      const title = item.title || 'Unknown Item';
      const price = item.price || '0';
      const id = item.uuid || item.id || Math.random().toString();
      
      if (!groupedData[category]) {
        groupedData[category] = [];
      }
      
      groupedData[category].push({
        id: id.toString(),
        title: title,
        price: price.toString()
      });
    });
    
    const sectionListData = Object.keys(groupedData).map(category => ({
      title: category,
      data: groupedData[category]
    }));
    
    sectionListData.sort((a, b) => a.title.localeCompare(b.title));
    
    return sectionListData;
  }

export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}

